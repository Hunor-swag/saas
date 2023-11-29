import { getFullUrl } from "./url";

export async function getUserById(id: number, hostname: string) {
	const url = getFullUrl(hostname);
	const res = await fetch(`${url}/api/auth/user/${id}`);
	const user = await res.json();
	if (!user) {
		console.log("No user found with id", id);
	}
	// console.log(user);
	return user;
}
