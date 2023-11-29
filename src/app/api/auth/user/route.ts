import { query } from "@/lib/db";
import { getValidSubdomain } from "@/lib/url";
import { User } from "@/types/typings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();
		const hostname = req.headers.get("host");
		const subdomain = getValidSubdomain(hostname);
		// console.log(email, subdomain);

		const queryString = `SELECT * FROM users WHERE email = ?`;
		const res = (await query("ceodash_" + subdomain, queryString, [
			email,
		])) as Array<User>;

		if (res.length === 0) {
			return new NextResponse(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		return new NextResponse(JSON.stringify(res[0]), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ message: error.message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
