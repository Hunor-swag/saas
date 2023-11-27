import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import en from "@/dictionaries/en.json";
import hu from "@/dictionaries/hu.json";
import { useEffect } from "react";
import { getDictionary } from "@/lib/getDictionary";

type InitialState = {
	subdomain: string;
};

const initialState = {
	subdomain: "",
};

export const subdomainSlice = createSlice({
	name: "subdomain",
	initialState,
	reducers: {
		setSubdomain: (state, action: PayloadAction<string>) => {
			state.subdomain = action.payload;
		},
	},
});

export const { setSubdomain } = subdomainSlice.actions;
export default subdomainSlice.reducer;
