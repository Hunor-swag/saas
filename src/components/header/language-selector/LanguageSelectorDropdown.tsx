"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";
import { US, HU } from "country-flag-icons/react/1x1";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useLang from "@/hooks/useLang";
import { useRouter } from "next/navigation";
import { getLang } from "@/lib/getLang";
import langSlice, { setLang } from "@/redux/features/lang-slice";
import { useDispatch } from "react-redux";
import { getDictionary } from "@/lib/getDictionary";

export default function LanguageSelectorDropdown() {
  const lang = getLang();
  const router = useRouter();

  const { data: session, update } = useSession();

  const getLanguageIcon = () => {
    const className = "w-6 h-6 rounded-full";
    switch (lang) {
      case "en":
        return <US className={className} />;

      case "hu":
        return <HU className={className} />;

      default:
        return <US className={className} />;
    }
  };

  const handleLanguageChange = async (lang: string) => {
    window.localStorage.setItem("lang", lang);

    await update({ lang: lang });

    router.refresh();
  };

  return (
    <div className="text-gray-600">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 font-semibold focus:outline-none bg-white  transition-colors duration-100">
            {getLanguageIcon()}
            <ChevronDownIcon
              className="ml-1 -mr-1 h-5 w-5 text-gray-400"
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
          <Menu.Items className="absolute left-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                    // onClick={item.onClick}
                    onClick={() => handleLanguageChange("en")}
                  >
                    <US className="w-6 h-6 rounded-full" />
                    <span>English</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                    // onClick={item.onClick}
                    onClick={() => handleLanguageChange("hu")}
                  >
                    <HU className="w-6 h-6 rounded-full" />
                    <span>Hungarian</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
