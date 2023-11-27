import LoginForm from "@/components/auth/login-form";
import { displayToastAfterFetch } from "@/lib/toasts";
import Head from "next/head";
import Link from "next/link";

export default async function SigninPage({
	params,
}: {
	params: { subdomain: string };
}) {
	async function getSystem() {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/ceodash/systems/${params.subdomain}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		);
		const system = await res.json();
		return system;
	}

	const system = await getSystem();

	return (
		<div className='flex flex-col space-y-4 justify-center items-center h-full w-full'>
			<h1 className='text-2xl mb-10 font-semibold'>{system.name}</h1>
			<h1 className='text-xl font-semibold'>Sign in</h1>
			<h2>Sign in to your account</h2>
			<LoginForm />
			<span className='whitespace-nowrap'>
				Don't have an account? <Link href='/sign-up'>Sign Up!</Link>
			</span>
		</div>
	);
}
