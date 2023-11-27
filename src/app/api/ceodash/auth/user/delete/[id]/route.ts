import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
	try {
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ message: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
