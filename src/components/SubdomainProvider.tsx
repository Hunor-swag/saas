"use client";

import { setSubdomain } from "@/redux/features/subdomain-slice";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SubdomainProvider() {
	const dispatch = useDispatch();

	useEffect(() => {
		const hostname = window.location.hostname + window.location.pathname;
		let subdomain: string;

		if (hostname.includes("localhost")) {
			subdomain = hostname.split("/")[1];
		} else {
			subdomain = hostname.split(".")[0];
		}
		dispatch(setSubdomain(subdomain));
	}, []);

	return null;
}
