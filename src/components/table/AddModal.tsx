"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ButtonProps } from "./DataTable";

type Props<T> = {
	modalRef: React.RefObject<HTMLDialogElement>;
	closeModal: () => void;
	addItemProps?: {
		title: string;
		description?: string;
	} | null;
	AddItemForm?: React.FC<{ closeModal: () => void }> | null;
};

export default function AddModal<T>({
	modalRef,
	closeModal,
	addItemProps,
	AddItemForm,
}: Props<T>) {
	const router = useRouter();
	const session = useSession();

	if (!AddItemForm) {
		return null;
	}

	return (
		<dialog
			ref={modalRef}
			className='w-[512px] shadow-lg z-50 outline-none rounded-lg'
		>
			<div className='flex flex-col space-y-4'>
				<h1 className='text-2xl font-semibold text-center mt-4'>
					{addItemProps?.title}
				</h1>
				<hr />
				{addItemProps?.description && (
					<p className='text-center text-lg'>{addItemProps?.description}</p>
				)}
				<button type='button' onClick={closeModal}>
					<XMarkIcon className='w-6 h-6 absolute top-6 right-6' />
				</button>

				<AddItemForm closeModal={closeModal} />
			</div>
		</dialog>
	);
}
