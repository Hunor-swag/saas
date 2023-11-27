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
  id: number;
  editItemProps?: {
    title: string;
    description?: string;
  } | null;
  EditItemForm?: React.FC<{ selectedItem: T; closeModal: () => void }> | null;
  selectedItem: T;
};

export default function EditModal<T>({
  modalRef,
  closeModal,
  selectedItem,
  editItemProps,
  EditItemForm,
}: Props<T>) {
  const router = useRouter();
  const session = useSession();

  if (!EditItemForm) {
    return null;
  }

  return (
    <dialog
      ref={modalRef}
      className="w-[512px] shadow-lg z-50 outline-none rounded-lg"
    >
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold text-center mt-4">
          {editItemProps?.title}
        </h1>
        <hr />
        {editItemProps?.description && (
          <p className="text-center text-lg">{editItemProps?.description}</p>
        )}
        <button type="button" onClick={closeModal}>
          <XMarkIcon className="w-6 h-6 absolute top-6 right-6" />
        </button>
        <EditItemForm selectedItem={selectedItem} closeModal={closeModal} />
      </div>
    </dialog>
  );
}
