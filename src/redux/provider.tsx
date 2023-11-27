"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import SubdomainProvider from "@/components/SubdomainProvider";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<SubdomainProvider />
			{children}
		</Provider>
	);
}
