import { query } from "@/lib/db";
import { getSystemName, getValidSubdomain } from "@/lib/url";
import { User } from "@/types/typings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;

		const subdomain = getValidSubdomain(req.headers.get("host"));
		const system_name = getSystemName(subdomain!);

		const queryString = `SELECT * FROM users WHERE id = ?`;
		const res = (await query("ceodash_" + system_name, queryString, [
			id,
		])) as Array<User>;

		if (res.length === 0) {
			return new NextResponse(JSON.stringify(null), {
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
