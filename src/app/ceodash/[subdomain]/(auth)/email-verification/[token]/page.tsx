"use client";

import { displayToastAfterFetch } from "@/lib/toasts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerificationPage({
	params,
}: {
	params: { token: string };
}) {
	const router = useRouter();
	const [accountCreated, setAccountCreated] = useState(false);
	const { token } = params;

	const signUp = () => {
		const res = fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up/${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		).then((res) => {
			res.json().then((data) => {
				displayToastAfterFetch(res, data, () => {
					setTimeout(() => {
						router.push("/");
					}, 2000);
				});
			});
		});
	};

	useEffect(() => {
		console.log(accountCreated);
		if (token && !accountCreated) {
			signUp();
			setAccountCreated(true);
		}
	}, []);

	return <div>You're request is being processed...</div>;
}
