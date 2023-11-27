import { NextRequest, NextResponse } from "next/server";
import { query } from "lib";
import * as bcrypt from "bcrypt";
import { validatePassword } from "@/lib/stringFunctions";
import { User } from "@/types/typings";
import { getSystemName, getValidSubdomain } from "lib";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    const subdomain = getValidSubdomain(req.headers.get("host"));
    const system_name = getSystemName(subdomain!);

    // get user payload from token

    const tokenQueryString = `SELECT user_payload FROM email_verifications WHERE id = ?`;

    const tokenQueryResult = (await query(
      "ceodash_" + system_name,
      tokenQueryString,
      [token]
    )) as Array<User>;

    if (tokenQueryResult.length === 0) {
      return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userResult = tokenQueryResult[0] as any;

    const user = userResult.user_payload;

    // Check if the email is already in use
    const existingUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUserResult = await query(
      "ceodash_" + system_name,
      existingUserQuery,
      [user.email]
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

    // Create a new user in the database
    const insertUserQuery =
      "INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)";
    await query("ceodash_" + system_name, insertUserQuery, [
      user.email,
      user.password,
      user.firstname,
      user.lastname,
    ]);

    // Delete the token from the database

    const deleteTokenQuery = "DELETE FROM email_verifications WHERE id = ?";
    await query("ceodash_" + system_name, deleteTokenQuery, [token]);

    return new NextResponse(
      JSON.stringify({ message: "Successful registration!" }),
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
