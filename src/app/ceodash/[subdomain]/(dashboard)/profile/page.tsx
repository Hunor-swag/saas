import EditProfileForm from "@/components/dashboard/edit-profile/EditProfileForm";
import { getUserById } from "@/lib/getUser";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function ProfilePage() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		redirect("/");
	}

	const user = await getUserById(session.user.id, headers().get("host")!);

	return (
		<div>
			<EditProfileForm user={user} />
		</div>
	);
}
