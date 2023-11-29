import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { getValidSubdomain } from "@/lib/url";
import { authOptions } from "../../../[...nextauth]/authOptions";

export async function PUT(req: NextRequest) {
	try {
		const { lang } = await req.json();
		const session = await getServerSession(authOptions);
		const subdomain = getValidSubdomain(req.headers.get("host"));

		if (!session || !session.user) {
			return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		const { user } = session;

		const queryString = `UPDATE users SET lang = ? WHERE id = ?`;
		const res = (await query("ceodash_" + subdomain, queryString, [
			lang,
			user.id,
		])) as any;

		if (res.affectedRows === 0) {
			return new NextResponse(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		return new NextResponse(JSON.stringify({ message: "Success" }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
