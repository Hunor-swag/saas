import SignupForm from "@/components/auth/signup-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default async function SignupPage() {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center h-full w-full">
      <h1 className="text-xl font-semibold">Sign up</h1>
      <h2>Create an account</h2>
      <SignupForm />
      <span>
        Already have an account? <Link href="/">Sign in</Link>
      </span>
    </div>
  );
}
