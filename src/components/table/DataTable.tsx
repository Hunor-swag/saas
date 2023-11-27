"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/20/solid";
import ResumeModal from "./ResumeModal";

export type ButtonProps = {
  text: string;
  className: string;
};

type Props<T extends { id: string }> = {
  data: Array<T>;
  tableHeaders: Array<string>;
  properties: Array<keyof T>;
  searchBar?: boolean;
  editItemEnabled?: boolean;
  EditItemForm?: React.FC<{ selectedItem: T; closeModal: () => void }> | null;
  editItemProps?: {
    title: string;
    description?: string;
  } | null;
  AddItemForm?: React.FC<{ closeModal: () => void }> | null;
  addItemProps?: {
    title: string;
    description?: string;
  } | null;
  addItemEnabled?: boolean;
  editNotAllowedItems?: Array<T>;
  deleteNotAllowedItems?: Array<T>;
  deleteItemProps: {
    title: string;
    description: string;
    button1: ButtonProps;
    button2: ButtonProps;
    api_string: string;
    method: string;
  };
  resumeItemEnabled?: boolean;
  resumeItemProps?: {
    title: string;
    description?: string;
  };
  ResumeItemForm?: React.FC<{ selectedItem: T; closeModal: () => void }> | null;
  resumeNotAllowedItems?: Array<T>;
  addButtonText?: string;
  editButtonText?: string;
  deleteButtonText?: string;
  resumeButtonText?: string;
};

export default function DataTable<T extends { id: string }>({
  data,
  tableHeaders,
  properties,
  searchBar = false,
  deleteItemProps,
  editItemEnabled = false,
  EditItemForm,
  AddItemForm,
  addItemProps,
  editItemProps,
  editNotAllowedItems = [],
  deleteNotAllowedItems = [],
  addItemEnabled = false,
  resumeItemEnabled = false,
  ResumeItemForm,
  resumeItemProps,
  resumeNotAllowedItems = [],
  addButtonText = "Add",
  editButtonText = "Edit",
  deleteButtonText = "Delete",
  resumeButtonText = "Resume",
}: Props<T>) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<T | null | undefined>(null);

  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const editModalRef = useRef<HTMLDialogElement>(null);
  const addModalRef = useRef<HTMLDialogElement>(null);
  const resumeModalRef = useRef<HTMLDialogElement>(null);

  const router = useRouter();

  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    setSelectedId("");
    setSelectedItem(null);
  };

  const closeEditModal = () => {
    editModalRef.current?.close();
    setSelectedId("");
    setSelectedItem(null);
  };

  const closeAddModal = () => {
    addModalRef.current?.close();
    setSelectedId("");
    setSelectedItem(null);
  };

  const closeResumeModal = () => {
    resumeModalRef.current?.close();
    setSelectedId("");
    setSelectedItem(null);
  };

  const handleRowSelect = (id: string) => {
    if (id === selectedId) {
      setSelectedId("");
    } else setSelectedId(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === deleteModalRef.current) {
        closeDeleteModal();
      }
      if (event.target === editModalRef.current) {
        closeEditModal();
      }
      if (event.target === addModalRef.current) {
        closeAddModal();
      }
      if (event.target === resumeModalRef.current) {
        closeResumeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedItem(() => {
      if (selectedId === "") return null;
      else return data.find((item) => item.id === selectedId);
    });
  }, [selectedId]);

  const handleDelete = async () => {
    const res = await fetch(`${deleteItemProps.api_string}/${selectedId}`, {
      method: deleteItemProps.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: "dark",
        style: {
          backgroundColor: "gray",
        },
      });
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: "dark",
        style: {
          backgroundColor: "gray",
        },
      });
    }
    router.refresh();
  };

  return (
    <div>
      {/* container */}
      <div className="hidden md:block">
        <div className="w-full h-8 flex justify-between">
          <div className="flex justify-center items-center">
            {searchBar && "Searchbar"}
          </div>
          <div className="flex justify-center items-center">
            <div className="flex space-x-2">
              {addItemEnabled && (
                <div>
                  <button
                    className={`px-3 py-2 rounded-md text-green-500 bg-green-100 hover:bg-green-200 hover:text-green-600 flex justify-center items-center space-x-2 text-sm font-semibold
                  }`}
                    onClick={() => addModalRef.current?.showModal()}
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>{addButtonText}</span>
                  </button>
                </div>
              )}
              {editItemEnabled && (
                <div className="">
                  <button
                    className={`px-3 py-2 rounded-md flex justify-center items-center space-x-2 text-sm font-semibold ${
                      selectedId &&
                      !editNotAllowedItems?.some(
                        (item) => item.id === selectedId
                      )
                        ? "text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600"
                        : "bg-gray-200 text-gray-400"
                    }`}
                    disabled={
                      !selectedId ||
                      editNotAllowedItems?.some(
                        (item) => item.id === selectedId
                      )
                    }
                    onClick={() => editModalRef.current?.showModal()}
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>{editButtonText}</span>
                  </button>
                </div>
              )}
              {resumeItemEnabled && (
                <div className="">
                  <button
                    className={`px-3 py-2 rounded-md flex justify-center items-center space-x-2 text-sm font-semibold ${
                      selectedId &&
                      !resumeNotAllowedItems?.some(
                        (item) => item.id === selectedId
                      )
                        ? "text-green-500 bg-green-100 hover:bg-blue-200 hover:text-blue-600"
                        : "bg-gray-200 text-gray-400"
                    }`}
                    disabled={
                      !selectedId ||
                      resumeNotAllowedItems?.some(
                        (item) => item.id === selectedId
                      )
                    }
                    onClick={() => resumeModalRef.current?.showModal()}
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                    <span>{resumeButtonText}</span>
                  </button>
                </div>
              )}
              <div>
                <button
                  className={`px-3 py-2 rounded-md flex justify-center items-center space-x-2 text-sm font-semibold ${
                    selectedId &&
                    !deleteNotAllowedItems?.some(
                      (item) => item.id === selectedId
                    )
                      ? "text-red-500 bg-red-100 hover:bg-red-200 hover:text-red-600"
                      : "bg-gray-200 text-gray-400"
                  } `}
                  disabled={
                    !selectedId ||
                    deleteNotAllowedItems?.some(
                      (item) => item.id === selectedId
                    )
                  }
                  onClick={() => deleteModalRef.current?.showModal()}
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>{deleteButtonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full rounded-lg overflow-y-hidden shadow-md mt-5">
          <table className="table table-auto w-full border-collapse text-sm bg-white">
            <thead className="">
              <tr className=" border-b border-gray-200">
                {tableHeaders.map((header, index) => {
                  return (
                    <th key={index} className="th text-left">
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="">
              {!data ||
                (data.length === 0 && (
                  <tr className=" border-b border-gray-200">
                    <td
                      className=" py-2 px-3 text-gray-500"
                      colSpan={tableHeaders.length}
                    >
                      No data
                    </td>
                  </tr>
                ))}

              {data &&
                data.length > 0 &&
                data.map((item: T, index: number) => {
                  return (
                    // table row
                    <tr
                      key={index}
                      className={`border-b border-gray-200 ${
                        selectedId === item.id
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleRowSelect(item.id)}
                    >
                      {properties.map((prop: keyof T, index: number) => {
                        const string = item[prop] as string;

                        return (
                          <td key={index} className="td">
                            {string}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:hidden flex flex-col space-y-4">
        {addItemEnabled && (
          <div className="flex justify-end items-center">
            <button
              className={`px-3 py-2 rounded-md text-green-500 bg-green-100 hover:bg-green-200 hover:text-green-600 flex justify-center items-center space-x-2 text-sm font-semibold
                  }`}
              onClick={() => addModalRef.current?.showModal()}
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        )}
        {!data ||
          (data.length === 0 && (
            <div className="text-center text-gray-500">No data</div>
          ))}
        {data.map((item: T, index: number) => {
          return (
            <div
              className="w-auto border border-gray-300 shadow-md rounded-lg p-4 flex flex-col space-y-2"
              key={index}
            >
              {properties.map((prop: keyof T, index: number) => {
                if (item[prop]) {
                  const string = item[prop] as string;

                  return (
                    <div key={index} className="">
                      <h1 className="text-gray-400 font-semibold text-xs">
                        {tableHeaders[index]}:
                      </h1>
                      <span className="text-md text-gray-500">{string}</span>
                    </div>
                  );
                }
              })}
              <div className="self-end flex space-x-2">
                {editItemEnabled &&
                  !editNotAllowedItems.some(
                    (value: T) => item.id === value.id
                  ) && (
                    <button
                      className={`text-sm px-2 py-1 font-semibold rounded-md flex justify-around space-x-2 text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600
										}`}
                      onClick={() => {
                        setSelectedItem(item);
                        editModalRef.current?.showModal();
                      }}
                    >
                      <PencilIcon className="w-5 h-5" />
                      <span>Edit</span>
                    </button>
                  )}
                {resumeItemEnabled &&
                  !resumeNotAllowedItems.some(
                    (value: T) => item.id === value.id
                  ) && (
                    <button
                      className={`text-sm px-2 py-1 font-semibold rounded-md flex justify-around space-x-2 text-green-500 bg-green-100 hover:bg-green-200 hover:text-green-600
                  }`}
                      onClick={() => {
                        setSelectedItem(item);
                        setSelectedId(item.id);
                        resumeModalRef.current?.showModal();
                      }}
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                      <span>Resume</span>
                    </button>
                  )}
                {!deleteNotAllowedItems.some(
                  (value: T) => item.id === value.id
                ) && (
                  <button
                    className={`text-sm px-2 py-1 font-semibold rounded-md flex justify-around space-x-2 text-red-500 bg-red-100 hover:bg-red-200 hover:text-red-600
										}`}
                    onClick={() => {
                      setSelectedItem(item);
                      setSelectedId(item.id);
                      console.log(selectedItem);
                      deleteModalRef.current?.showModal();
                    }}
                  >
                    <TrashIcon className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <DeleteModal
        closeModal={closeDeleteModal}
        id={parseInt(selectedId)}
        modalRef={deleteModalRef}
        deleteItemProps={deleteItemProps}
        onDelete={handleDelete}
      />
      <EditModal
        EditItemForm={EditItemForm}
        closeModal={closeEditModal}
        id={parseInt(selectedId)}
        modalRef={editModalRef}
        editItemProps={editItemProps}
        selectedItem={selectedItem!}
      />
      <AddModal
        AddItemForm={AddItemForm}
        closeModal={closeAddModal}
        modalRef={addModalRef}
        addItemProps={addItemProps}
      />
      <ResumeModal
        ResumeItemForm={ResumeItemForm}
        closeModal={closeResumeModal}
        modalRef={resumeModalRef}
        resumeItemProps={resumeItemProps}
        id={parseInt(selectedId)}
        selectedItem={selectedItem!}
      />
    </div>
  );
}
