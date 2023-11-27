"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

type Props = {
  session: any;
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      {children}
      <ToastContainer />
    </SessionProvider>
  );
};
