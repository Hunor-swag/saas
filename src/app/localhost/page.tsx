import { getDomain } from "@/lib/url";
import { headers } from "next/headers";

export default function DomainPage() {
	const hostname = headers().get("host");
	const domain = getDomain(hostname);

	return <div>{domain} page</div>;
}
