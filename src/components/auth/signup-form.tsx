"use client";

import Link from "next/link";
import TextInput from "../ui/text-input";
import Button from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { displayToastAfterFetch } from "@/lib/toasts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getFullUrl } from "@/lib/url";

export default function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function onSubmit(formdata: any) {
		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		const url = getFullUrl(window.location.hostname);

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up/email-verification`,
			{
				method: "POST",
				body: JSON.stringify({
					email: formdata.email,
					password: formdata.password,
					repeat_password: formdata.repeat_password,
					firstname: formdata.firstname,
					lastname: formdata.lastname,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await res.json();

		displayToastAfterFetch(res, data, () => router.push("/"));
		setIsSubmitting(false);
	}

	return (
		<form
			className='flex flex-col space-y-4 w-full text-sm'
			onSubmit={handleSubmit(async (data) => {
				onSubmit(data);
			})}
		>
			<TextInput
				label='Firstname'
				placeholder='Enter your firstname...'
				type='text'
				register={register}
				name='firstname'
				required={true}
				error={errors.firstname?.message?.toString()}
			/>
			<TextInput
				label='Lastname'
				placeholder='Enter your lastname...'
				type='text'
				register={register}
				name='lastname'
				required={true}
				error={errors.lastname?.message?.toString()}
			/>

			<TextInput
				label='Email'
				placeholder='Enter your email...'
				type='email'
				register={register}
				name='email'
				required={true}
				error={errors.email?.message?.toString()}
			/>
			<TextInput
				label='Password'
				placeholder='Enter your password...'
				type='password'
				register={register}
				name='password'
				required={true}
				minLength={8}
				error={errors.password?.message?.toString()}
			/>
			<TextInput
				label='Repeat Password'
				placeholder='Enter your password again...'
				type='password'
				register={register}
				name='repeat_password'
				required={true}
				error={errors.repeat_password?.message?.toString()}
			/>
			<div className={`flex whitespace-nowrap text-xs space-x-2`}>
				<input
					type='checkbox'
					{...register("terms", {
						required: true,
					})}
				/>
				<label className={`${errors.terms && "text-red-500"}`}>
					You accept our Terms And Conditions and Privacy Policy
				</label>
			</div>
			<Button disabled={isSubmitting}>
				{isSubmitting ? "Signing up..." : "Sign up"}
			</Button>
		</form>
	);
}
