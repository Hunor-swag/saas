import { query } from "@/lib/db";
import { User } from "@/types/typings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { system: string } }
) {
	try {
		const queryString = `SELECT * FROM users`;
		const res = (await query(queryString, [])) as Array<User>;

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
