import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { ReduxProvider } from "@/redux/provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html lang='en'>
			<body>
				<NextAuthProvider session={session}>
					<ReduxProvider>{children}</ReduxProvider>
				</NextAuthProvider>
				<ToastContainer />
			</body>
		</html>
	);
}
