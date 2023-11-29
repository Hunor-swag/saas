import { getFullUrl, getValidSubdomain } from "@/lib/url";
import { SystemType } from "@/types/typings";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

type Props = {
	params: { subdomain: string };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const subdomain = params.subdomain;
	// fetch data
	const res = await fetch(
		`https://ceodash.hu/api/ceodash/systems/${subdomain}`
	);
	if (res.status !== 200) {
		return {
			title: "404",
		};
	}
	const system = (await res.json()) as SystemType;
	return {
		title: system.name,
	};
}

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const hostname = headers().get("host");
	const url = getFullUrl(hostname);
	const subdomain = getValidSubdomain(hostname);
	console.log(`${url}/api/ceodash/systems/${hostname}`);

	const getSystem = async () => {
		const res = await fetch(`${url}/api/ceodash/systems/${subdomain}`);
		if (res.status !== 200) {
			return null;
		}
		const system = (await res.json()) as SystemType;
		return system;
	};

	const system = await getSystem();

	if (!system) {
		return <div>System not found!</div>;
	}

	return <>{children}</>;
}
