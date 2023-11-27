"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { displayToastAfterFetch } from "@/lib/displayToast";
import { getDictionary } from "@/lib/getDictionary";
import { getLang } from "@/lib/getLang";
import { User } from "@/types/typings";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
	user: User;
};

export default function EditProfileForm({ user }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const lang = getLang();
	const dict = getDictionary(lang).profile;

	const router = useRouter();

	async function onSubmit(formdata: any) {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/edit_profile/${user.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formdata),
			}
		);

		const data = await res.json();

		displayToastAfterFetch(res, data, router.refresh());
	}

	return (
		<form
			className='flex flex-col space-y-4'
			onSubmit={handleSubmit(async (data) => {
				onSubmit(data);
			})}
		>
			<h1 className='font-semibold text-gray-600 text-2xl'>
				{dict.editProfileTitle}
			</h1>
			<TextInput
				label={dict.editProfileForm.firstnameLabel}
				name='firstname'
				defaultValue={user.firstname}
				// placeholder="Enter firstname..."
				register={register}
				type='text'
				error={errors?.firstname?.message?.toString()}
				key='firstname'
				minLength={2}
				required={true}
			/>
			<TextInput
				label={dict.editProfileForm.lastnameLabel}
				name='lastname'
				defaultValue={user.lastname}
				// placeholder="Enter lastname..."
				register={register}
				type='text'
				error={errors?.lastname?.message?.toString()}
				key='lastname'
				minLength={2}
				required={true}
			/>
			<TextInput
				label={dict.editProfileForm.passwordLabel}
				name='password'
				// placeholder="Enter new password..."
				register={register}
				type='password'
				error={errors?.password?.message?.toString()}
				key='password'
				minLength={8}
				required={false}
			/>
			<TextInput
				label={dict.editProfileForm.passwordRepeatLabel}
				name='repeat_password'
				// placeholder="Repeat new password..."
				register={register}
				type='password'
				error={errors?.repeat_password?.message?.toString()}
				key='repeat_password'
				minLength={2}
				required={false}
			/>
			<div className='flex justify-center'>
				<Button type='submit' className='w-full md:w-[70%] lg:w-[50%]'>
					{dict.editProfileForm.submitButtonText}
				</Button>
			</div>
		</form>
	);
}
