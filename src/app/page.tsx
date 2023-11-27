"use client";

import { getDomain } from "@/lib/url";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		const hostname = window.location.hostname;
		const domain = getDomain();
		console.log(domain);
	}, []);

	return <div></div>;
}
