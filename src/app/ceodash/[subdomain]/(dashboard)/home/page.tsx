"use client";

import { User } from "@/types/typings";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function HomePage() {
	const session = useSession();

	const user = session.data?.user as User;

	return (
		<div>
			Welcome, {user?.email}, you are{" "}
			{user?.role === "admin" ? "an admin" : "a user"}
			<div>
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		</div>
	);
}
