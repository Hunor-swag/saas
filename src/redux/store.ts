import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./features/lang-slice";
import subdomainReducer from "./features/subdomain-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		langReducer,
		subdomainReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
