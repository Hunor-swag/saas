import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import AddUserForm from '@/components/dashboard/users/add-user-form';
import EditUserForm from '@/components/dashboard/users/edit-user-form';
import DataTable from '@/components/table/DataTable';
import { getDictionary } from '@/lib/getDictionary';
import { getLang } from '@/lib/getLang';
import { getFullUrl } from '@/lib/url';
import { User } from '@/types/typings';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const dict = getDictionary(session.user.lang).users;
  const url = getFullUrl(headers().get('host'));

  const getUsers = async () => {
    const res = await fetch(`${url}/api/ceodash/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    return await res.json();
  };

  const users = await getUsers();

  const deleteItemProps = {
    title: dict.table.deleteItemProps.title,
    description: dict.table.deleteItemProps.description,
    button1: {
      text: dict.table.deleteItemProps.button1.text,
      className:
        'bg-blue-200 hover:bg-blue-300 transition-colors duration-100 rounded-lg',
    },
    button2: {
      text: dict.table.deleteItemProps.button2.text,
      className:
        'bg-red-200 hover:bg-red-300 transition-colors duration-100 rounded-lg',
    },
    api_string: `${url}/api/auth/user/delete`,
    method: 'PUT',
  };

  const properties = ['id', 'email', 'firstname', 'lastname'] as Array<
    keyof User
  >;

  const tableHeaders = dict.table.tableHeaders;

  const editItemProps = {
    title: dict.table.editTitle,
  };

  const addItemProps = {
    title: dict.table.addTitle,
  };

  return (
    <div>
      <DataTable
        data={users}
        deleteItemProps={deleteItemProps}
        tableHeaders={tableHeaders}
        properties={properties}
        EditItemForm={EditUserForm}
        editItemProps={editItemProps}
        addItemEnabled={true}
        AddItemForm={AddUserForm}
        editItemEnabled={true}
        addItemProps={addItemProps}
        addButtonText={dict.table.addButtonText}
        editButtonText={dict.table.editButtonText}
        deleteButtonText={dict.table.deleteButtonText}
      />
    </div>
  );
}
