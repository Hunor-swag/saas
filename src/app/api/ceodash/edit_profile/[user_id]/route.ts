import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { query } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(
	req: NextRequest,
	{ params }: { params: { user_id: string } }
) {
	try {
		const { firstname, lastname, password, repeat_password } = await req.json();

		const { user_id } = params;

		const session = await getServerSession(authOptions);

		if (!session) {
			return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
				status: 401,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		if (!firstname || firstname === "" || !lastname || lastname === "") {
			return new NextResponse(
				JSON.stringify({ message: "Firstname and lastname are required" }),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		if (password !== "" && password !== repeat_password) {
			return new NextResponse(
				JSON.stringify({ message: "Passwords don't match" }),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		let editProfileQuery;

		if (password !== "" && password === repeat_password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			editProfileQuery = `UPDATE users 
                SET firstname = ?, lastname = ?, password = ?
                WHERE id = ?`;
			await query(editProfileQuery, [
				firstname,
				lastname,
				hashedPassword,
				user_id,
			]);
		} else {
			editProfileQuery = `UPDATE users 
                SET firstname = ?, lastname = ?
                WHERE id = ?`;
			await query(editProfileQuery, [firstname, lastname, user_id]);
		}

		return new NextResponse(JSON.stringify({ message: "Profile updated" }), {
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
