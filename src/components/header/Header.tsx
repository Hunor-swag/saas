"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { User } from "@/types/typings";
import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";
import { useAppSelector } from "@/redux/store";
import useDictionary from "@/hooks/useDictionary";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProfileDropdown from "./profile-dropdown/ProfileDropdown";
import MasterDataDropdown from "./master-data-dropdown/MasterDataDropdown";
import LanguageSelectorDropdown from "./language-selector/LanguageSelectorDropdown";
import { getDictionary } from "@/lib/getDictionary";
import useLang from "@/hooks/useLang";
import { getLang } from "@/lib/getLang";

type Props = {
  user: User;
};

export default function Header({ user }: Props) {
  const lang = getLang();
  const dict = getDictionary(lang as string);

  const profileDropdownItems = [
    {
      label: dict.header.profileDropdown.profile.label,
      href: "/profile",
      Icon: UserIcon,
    },
    {
      label: dict.header.profileDropdown.signOut.label,
      onClick: () => signOut(),
      Icon: ArrowLeftOnRectangleIcon,
    },
  ];

  const masterDataDropdownItems = [
    {
      label: dict.header.masterDataDropdown.users.label,
      href: "/users",
      Icon: UserIcon,
    },
  ];

  return (
    <header className="fixed top-0 z-50 w-[100%] h-20 bg-white shadow-sm flex items-center justify-between px-6">
      <div id="left-side" className="flex space-x-4 items-center">
        <a href="/home">LOGO</a>
        <MasterDataDropdown
          label={dict.header.masterDataDropdown.title}
          items={masterDataDropdownItems}
        />
        {/* <ul className='flex mx-8'>
					{listItems.map((item, index) => {
						return item && (
							<ListItem
								key={index}
								label={item.label}
								href={item.href}
								className={`${
									pathname === item.href ? "text-[#57c3e3]" : "text-gray-600"
								}`}
							/>
						);
					})}
				</ul> */}
      </div>
      <div id="right-side" className="flex items-center">
        <LanguageSelectorDropdown />
        <ProfileDropdown
          label={user.firstname + " " + user.lastname}
          items={profileDropdownItems}
        />
      </div>
    </header>
  );
}
