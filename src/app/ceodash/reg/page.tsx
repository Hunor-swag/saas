"use client";

import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { displayToastAfterFetch } from "@/lib/toasts";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";

export default function RegPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function onSubmit(formdata: any) {
		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		const res = await fetch(`/api/register-system`, {
			method: "POST",
			body: JSON.stringify({
				system_name: formdata.system_name,
				email: formdata.email,
				password: formdata.password,
				repeat_password: formdata.repeat_password,
				firstname: formdata.firstname,
				lastname: formdata.lastname,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		displayToastAfterFetch(res, data, () => {
			console.log(data);
			router.push(`https://${data.slug}.ceodash.hu`);
		});
		setIsSubmitting(false);
	}

	// return <div></div>;

	return (
		<div className='w-full h-screen flex justify-center bg-gradient-to-bl from-yellow-200 to-blue-300'>
			<div className='w-full mt-[10%] mx-2 md:mx-[10%] lg:mx-[15%] flex flex-col space-y-8 bg-white rounded-xl shadow-lg border border-slate-200'>
				<h1 className='text-center text-2xl font-semibold text-gray-600 mt-10'>
					Register your system
				</h1>
				<form
					className='flex flex-col space-y-4 px-10 md:px-[10%] lg:px-[20%]'
					onSubmit={handleSubmit(async (data) => {
						onSubmit(data);
					})}
				>
					<TextInput
						label={`System Name ${
							watch("system_name") && `(${slugify(watch("system_name"))})`
						}`}
						placeholder='Enter name of your system...'
						type='text'
						register={register}
						name='system_name'
						required={true}
						minLength={4}
						error={errors.system_name?.message?.toString()}
					/>
					<div className='flex space-x-4'>
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
					</div>

					<TextInput
						label='Email'
						placeholder='Enter your email...'
						type='email'
						register={register}
						name='email'
						required={true}
						error={errors.email?.message?.toString()}
					/>
					<div className='flex space-x-4'>
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
					</div>
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
					<Button disabled={isSubmitting} className=''>
						{isSubmitting ? "Signing up..." : "Sign up"}
					</Button>
				</form>
			</div>
		</div>
	);
}
