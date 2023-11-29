import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getUserById } from "@/lib/getUser";
import Header from "@/components/header/Header";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		redirect("/");
	}

	const hostname = headers().get("host");

	const user = await getUserById(session.user.id, hostname!);

	return (
		<div className='absolute pt-20 bg-gray-100 w-[100%] h-screen'>
			<Header user={user} />
			<div className='pt-10 px-4 md:px-[10%] lg:px-[15%]'>{children}</div>
		</div>
	);
}
