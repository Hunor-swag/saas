import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function useLang() {
  const { data: session, update } = useSession();

  const user = session?.user as any;
  console.log(user.lang);
  const [lang, setLang] = useState("");

  useEffect(() => {
    if (user) {
      setLang(user.lang);
    }
  }, [session]);

  return [lang, setLang];
}
