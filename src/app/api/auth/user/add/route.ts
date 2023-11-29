import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { validatePassword } from "@/lib/stringFunctions";
import { User } from "@/types/typings";
import { query } from "@/lib/db";
import { getValidSubdomain } from "@/lib/url";

export async function POST(req: NextRequest) {
	try {
		const { email, password, repeat_password, firstname, lastname } =
			await req.json();
		const subdomain = getValidSubdomain(req.headers.get("host"));

		// Check if the email is already in use
		const existingUserQuery = "SELECT * FROM users WHERE email = ?";
		const existingUserResult = await query(
			"ceodash_" + subdomain,
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

		// Check if passwords match

		if (password !== repeat_password) {
			return new NextResponse(
				JSON.stringify({ message: "Passwords do not match" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		// Create a new user in the database
		const insertUserQuery =
			"INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)";
		await query("ceodash_" + subdomain, insertUserQuery, [
			email,
			password,
			firstname,
			lastname,
		]);

		return new NextResponse(
			JSON.stringify({ message: "User added successfully!" }),
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
