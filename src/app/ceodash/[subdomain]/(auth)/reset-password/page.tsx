"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export default function PasswordRecovery() {
  const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const token = useSearchParams().get("token");

  useEffect(() => {
    const checkToken = async () => {
      console.log("checktoken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password/check_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        setMessage(data.message);
        setTokenIsValid(false);
      } else {
        setTokenIsValid(true);
      }
    };
    checkToken();
  }, []);

  return (
    <div className="w-full">
      {tokenIsValid === null ? (
        <p>Loading...</p>
      ) : tokenIsValid ? (
        <div className="flex flex-col space-y-4 justify-center items-center h-full w-full">
          <h1 className="text-xl font-semibold">Reset Password</h1>
          <h2>Enter your new password!</h2>
          <ResetPasswordForm token={token!} />
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
