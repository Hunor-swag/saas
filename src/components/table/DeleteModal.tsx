"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ButtonProps } from "./DataTable";

type Props = {
	modalRef: React.RefObject<HTMLDialogElement>;
	closeModal: () => void;
	onDelete: (id: string) => Promise<void>;
	id: number;
	deleteItemProps: {
		title: string;
		description: string;
		button1: ButtonProps;
		button2: ButtonProps;
	};
};

export default function DeleteModal({
	modalRef,
	closeModal,
	onDelete,
	id,
	deleteItemProps,
}: Props) {
	const router = useRouter();
	const session = useSession();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<dialog
			ref={modalRef}
			className='w-[512px] shadow-lg z-50 outline-none rounded-lg'
		>
			<form onSubmit={handleSubmit} className='md:px-8 px-4 '>
				<div className='w-full flex flex-col space-y-4'>
					<button type='button' onClick={closeModal}>
						<XMarkIcon className='w-6 h-6 absolute top-6 right-6' />
					</button>
					<h1 className='text-2xl font-semibold text-center mt-4'>
						{deleteItemProps.title}
					</h1>
					<hr />
					<p className='text-lg text-gray-600 text-center'>
						{deleteItemProps.description}
					</p>

					<div className='flex justify-center space-x-4'>
						<button
							type='button'
							className='px-4 py-2 bg-gray-700 font-semibold text-white w-[30%] rounded-md mb-4'
							onClick={closeModal}
						>
							{deleteItemProps.button1.text}
						</button>
						<button
							type='submit'
							className='flex justify-center items-center px-4 py-2 bg-red-700 font-semibold text-white w-[30%] rounded-md mb-4'
							onClick={() => {
								onDelete(id?.toString());
								closeModal();
							}}
						>
							<TrashIcon className='w-5 h-5 mr-2' />
							{deleteItemProps.button2.text}
						</button>
					</div>
				</div>
			</form>
		</dialog>
	);
}
