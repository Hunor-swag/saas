import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { DropdownItem } from "@/types/typings";

type Props = {
  label: string;
  items: Array<DropdownItem>;
};

export default function MasterDataDropdown({ label, items }: Props) {
  return (
    <div className="text-gray-600">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 font-semibold focus:outline-none bg-white  transition-colors duration-100">
            {label}
            <ChevronDownIcon
              className="ml-2 mt-1 -mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map((item, index) => {
                return (
                  <Menu.Item key={index}>
                    {({ active }) =>
                      item.href ? (
                        <a href={item.href}>
                          <button
                            className={`${
                              active ? "bg-gray-200" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                            onClick={item.onClick}
                          >
                            {item.Icon && <item.Icon className="w-5 h-5" />}
                            <span>{item.label}</span>
                          </button>
                        </a>
                      ) : (
                        <button
                          className={`${
                            active ? "bg-gray-200" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                          onClick={item.onClick}
                        >
                          {item.Icon && <item.Icon className="w-5 h-5" />}
                          <span>{item.label}</span>
                        </button>
                      )
                    }
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
