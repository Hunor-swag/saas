export async function getUserById(id: number) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/${id}`
	);
	const user = await res.json();
	if (!user) {
		console.log("No user found with id", id);
	}
	// console.log(user);
	return user;
}
