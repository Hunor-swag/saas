import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { emailContent } from "./html";
import { query } from "lib";
import * as bcrypt from "bcrypt";
import { getSystemName, getValidSubdomain } from "lib";
const mailgun = require("mailgun-js");

export async function POST(req: NextRequest) {
  try {
    const { email, password, repeat_password, firstname, lastname } =
      await req.json();

    const subdomain = getValidSubdomain(req.headers.get("host"));
    const system_name = getSystemName(subdomain!);

    if (password.length < 8) {
      return new NextResponse(
        JSON.stringify({
          message: "Password be at least 8 characters long",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (password !== repeat_password) {
      return new NextResponse(
        JSON.stringify({ message: "Passwords do not match" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the email is already in use
    const existingUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUserResult = await query(
      "ceodash_" + system_name,
      existingUserQuery,
      [email]
    );

    if (Array.isArray(existingUserResult) && existingUserResult.length > 0) {
      console.log(existingUserResult);
      return new NextResponse(
        JSON.stringify({ message: "Email is already registered" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uuid = uuidv4();

    const queryString = `INSERT INTO email_verifications (id, user_payload) VALUES (?, ?)`;

    const res = await query("ceodash_" + system_name, queryString, [
      uuid,
      JSON.stringify({ email, password: hashedPassword, firstname, lastname }),
    ]);

    // send email with link to verify email

    const api_key = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const host = process.env.MAILGUN_HOST;
    // console.log(api_key, domain);
    const mg = mailgun({ apiKey: api_key, domain: domain, host: host });

    const link = `https://${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/email-verification/${uuid}`;

    const data = {
      from: "Authentication System <noreply@authentication-system.com>",
      to: email,
      subject: "Email verification",
      html: emailContent(link),
    };

    mg.messages().send(data, function (error: any, body: any) {
      if (!error) {
        console.log(body);
      } else {
        console.log(error);
      }
    });

    return new NextResponse(
      JSON.stringify({ message: "Verification email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
