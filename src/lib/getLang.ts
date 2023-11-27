import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function getLang() {
  const { data: session, update } = useSession();
  const user = session?.user as any;

  useEffect(() => {
    if (!user.lang) {
      const lang = window.localStorage.getItem("lang");
      update({ lang: lang });
    }
  }, []);
  return user.lang;
}
