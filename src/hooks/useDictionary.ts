import { ChangeEvent, useEffect, useState } from "react";
import en from "@/dictionaries/en.json";
import hu from "@/dictionaries/hu.json";
import { useSession } from "next-auth/react";
import useLang from "./useLang";

export default function useDictionary() {
  const [dict, setDict] = useState(en);

  const [lang] = useLang();
  console.log("usedictionary: ", lang);
  // console.log(session);

  useEffect(() => {
    switch (lang) {
      case "hu":
        setDict(hu);
        break;
      case "en":
        setDict(en);
        break;
      default:
        setDict(en);
        break;
    }
  }, []);
  return dict;
}
