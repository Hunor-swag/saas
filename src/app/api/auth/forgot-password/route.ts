import { query } from "../../../../lib/db";
import { User } from "../../../../types/typings";
import { NextRequest, NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");
const mailgun = require("mailgun-js");
import { emailContent } from "./html";
import { getFullUrl, getValidSubdomain } from "@/lib/url";

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();
		const subdomain = getValidSubdomain(req.headers.get("host"));

		// check if user exists

		const userQueryString = "SELECT * FROM users WHERE email = ?";

		const userResult = await query("ceodash_" + subdomain, userQueryString, [
			email,
		]);

		const user = userResult as Array<User>;

		if (user.length === 0) {
			return new NextResponse(JSON.stringify({ message: "No user found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		const user_id = user[0].id;

		// add row to password_recovery table with generated uuid

		const uuid = uuidv4();
		const passwordRecoveryQueryString =
			"INSERT INTO password_recovery (id, user_id, expiration_date) VALUES (?, ?, ?)";
		const expiration_date = new Date();
		expiration_date.setMinutes(expiration_date.getMinutes() + 10);
		const passwordRecoveryResult = await query(
			"ceodash_" + subdomain,
			passwordRecoveryQueryString,
			[uuid, user_id, expiration_date]
		);

		// console.log(passwordRecoveryResult);

		// send email with link to reset password

		const api_key = process.env.MAILGUN_API_KEY;
		const domain = process.env.MAILGUN_DOMAIN;
		const host = process.env.MAILGUN_HOST;
		// console.log(api_key, domain);
		const mg = mailgun({ apiKey: api_key, domain: domain, host: host });
		const url = getFullUrl(req.headers.get("host"));
		const link = `${url}/reset-password?token=${uuid}`;

		const data = {
			from: "Authentication System <noreply@authentication-system.com>",
			to: email,
			subject: "Password recovery",
			html: emailContent(link),
		};

		mg.messages().send(data, function (error: any, body: any) {
			if (!error) {
				console.log(body);
			} else {
				console.log(error);
			}
		});
		return new NextResponse(JSON.stringify({ message: "Email sent!" }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.log(err);
		return new NextResponse(JSON.stringify({ message: JSON.stringify(err) }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
