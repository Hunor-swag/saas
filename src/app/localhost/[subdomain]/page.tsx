import { getValidSubdomain } from "@/lib/url";
import { headers } from "next/headers";

export default function SubdomainPage() {
	const hostname = headers().get("host");

	console.log(hostname);
	const subdomain = getValidSubdomain(hostname);

	return <div>{subdomain} page</div>;
}
