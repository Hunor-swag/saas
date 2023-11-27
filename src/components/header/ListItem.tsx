"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
	href: string;
	label: string;
	className?: string;
};

export default function ListItem({ href, label, className }: Props) {
	return (
		<a
			href={href}
			className={`px-4 py-2 rounded-md hover:text-[#57c3e3] transition-all duration-200 font-semibold ${className}`}
		>
			<li>{label}</li>
		</a>
	);
}
