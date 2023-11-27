import en from "@/dictionaries/en.json";
import hu from "@/dictionaries/hu.json";

export function getDictionary(lang: string) {
  let dict;
  switch (lang) {
    case "en":
      dict = en;
      break;
    case "hu":
      dict = hu;
      break;
    default:
      dict = en;
      break;
  }

  return dict;
}
