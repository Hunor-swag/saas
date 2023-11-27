import { SystemType } from "@/types/typings";
import { Metadata, ResolvingMetadata } from "next";

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
		`${process.env.NEXT_PUBLIC_URL}/api/ceodash/systems/${subdomain}`
	);
	const system = (await res.json()) as SystemType;
	return {
		title: system.name,
	};
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
