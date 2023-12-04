'use client';

import Button from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import { getDictionary } from '@/lib/getDictionary';
import { getLang } from '@/lib/getLang';
import { displayToastAfterFetch } from '@/lib/toasts';
import { getFullUrl } from '@/lib/url';
import { User } from '@/types/typings';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {
  selectedItem: User;
  closeModal: () => void;
};

export default function EditUserForm({ selectedItem, closeModal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      firstname: selectedItem?.firstname,
      lastname: selectedItem?.lastname,
      password: '',
      repeat_password: '',
    },
  });

  const lang = getLang();
  const dict = getDictionary(lang).users.editUserForm;

  const router = useRouter();

  async function onSubmit(formdata: any) {
    const url = window.location.origin;
    const res = await fetch(
      `${url}/api/ceodash/edit_profile/${selectedItem.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      }
    );

    const data = await res.json();

    displayToastAfterFetch(res, data, () => {
      closeModal();
      router.refresh();
    });
  }

  return (
    <form
      className='flex flex-col space-y-4 md:px-8 px-4 pb-4'
      onSubmit={handleSubmit(async (data) => {
        onSubmit(data);
      })}
    >
      <TextInput
        label={dict.firstnameLabel}
        name='firstname'
        // placeholder="Enter firstname..."
        register={register}
        type='text'
        error={errors?.firstname?.message?.toString()}
        key='firstname'
        minLength={2}
        required={true}
      />
      <TextInput
        label={dict.lastnameLabel}
        name='lastname'
        // placeholder="Enter lastname..."
        register={register}
        type='text'
        error={errors?.lastname?.message?.toString()}
        key='lastname'
        minLength={2}
        required={true}
      />
      <TextInput
        label={dict.passwordLabel}
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
        label={dict.passwordRepeatLabel}
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
          {dict.submitButtonText}
        </Button>
      </div>
    </form>
  );
}
