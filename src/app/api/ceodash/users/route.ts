import { query } from "@/lib/db";
import { getValidSubdomain } from "@/lib/url";
import { User } from "@/types/typings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { system: string } }
) {
	try {
		const subdomain = getValidSubdomain(req.headers.get("host"));
		const queryString = `SELECT * FROM users`;
		const res = (await query(
			"ceodash_" + subdomain,
			queryString,
			[]
		)) as Array<User>;

		return new NextResponse(JSON.stringify(res), {
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
