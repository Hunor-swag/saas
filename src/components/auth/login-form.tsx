"use client";

import Link from "next/link";
import TextInput from "../ui/text-input";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const subdomain = useAppSelector((state) => state.subdomainReducer.subdomain);

	//   console.log(errors);

	async function onSubmit(data: any) {
		const user = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		// console.log(user);

		if (user?.error) {
			toast.error("Invalid email or password", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
				theme: "dark",
				style: {
					backgroundColor: "gray",
				},
			});
		} else {
			toast.success("Login successful!", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
				theme: "dark",
				style: {
					backgroundColor: "gray",
				},
			});

			router.push(`/home`);
		}
	}

	return (
		<form
			className='flex flex-col space-y-4 w-full text-sm'
			onSubmit={handleSubmit(async (data) => {
				onSubmit(data);
			})}
		>
			<TextInput
				register={register}
				name='email'
				label='Email'
				placeholder='Enter your email...'
				type='email'
				required={true}
				error={errors?.email?.message?.toString()}
			/>
			<TextInput
				register={register}
				name='password'
				label='Password'
				placeholder='Enter your password...'
				type='password'
				required={true}
				minLength={8}
				error={errors?.password?.message?.toString()}
			/>
			<Link href='/forgot-password' className='self-end'>
				Forgot Password?
			</Link>
			<Button>Sign In</Button>
		</form>
	);
}
