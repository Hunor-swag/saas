import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import Link from "next/link";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center h-full w-full">
      <h1 className="text-xl font-semibold">Forgot Your Password?</h1>
      <h2>Enter your email and instructions will be sent to you!</h2>
      <ForgotPasswordForm />
      <span className="whitespace-nowrap">
        <Link href="/">Sign In!</Link>
      </span>
    </div>
  );
}
