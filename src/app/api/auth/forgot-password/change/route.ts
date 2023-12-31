import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { getFullUrl, getValidSubdomain } from "@/lib/url";

export async function PUT(req: NextRequest) {
	try {
		const { token, password, repeat_password } = await req.json();
		const subdomain = getValidSubdomain(req.headers.get("host"));

		// check if token is expired

		const url = getFullUrl(req.headers.get("host"));

		const validToken = await fetch(
			`${url}/api/auth/forgot-password/check_token`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token }),
			}
		);

		const validTokenResult = await validToken.json();

		if (validToken.status !== 200) {
			return new NextResponse(
				JSON.stringify({ message: validTokenResult.message }),
				{
					status: 401,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		// check if passwords match

		if (password !== repeat_password) {
			return new NextResponse(
				JSON.stringify({ message: "Passwords do not match" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		// get user_id from token

		const getUserQueryString =
			"SELECT user_id FROM password_recovery WHERE id = ?";

		const getUserResult = (await query(
			"ceodash_" + subdomain,
			getUserQueryString,
			[token]
		)) as Array<{
			user_id: number;
		}>;

		// hash password

		const hashedPassword = await bcrypt.hash(password, 10);

		// update password

		const updateQueryString = `UPDATE users SET password = ? WHERE id = ?`;

		const updateResult = await query(
			"ceodash_" + subdomain,
			updateQueryString,
			[hashedPassword, getUserResult[0].user_id]
		);

		// delete token

		const deleteQueryString = `DELETE FROM password_recovery WHERE id = ?`;

		const deleteResult = await query(
			"ceodash_" + subdomain,
			deleteQueryString,
			[token]
		);

		return new NextResponse(JSON.stringify({ message: "Password updated" }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ message: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
