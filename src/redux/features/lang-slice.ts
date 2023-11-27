import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import en from "@/dictionaries/en.json";
import hu from "@/dictionaries/hu.json";
import { useEffect } from "react";
import { getDictionary } from "@/lib/getDictionary";

type InitialState = {
  lang: string;
  dict: any;
};

const getDict = (lang: string) => {
  switch (lang) {
    case "en":
      return en;
    case "hu":
      return hu;
    default:
      return en;
  }
};

let lang;

const getLang = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/lang`
  );
  const data = await res.json();
  lang = data[0].lang;
};

const initialState = {
  lang: "us",
  dict: getDict("us"),
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      window.localStorage.setItem("lang", action.payload);

      state.lang = action.payload;
      state.dict = getDictionary(action.payload);
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
