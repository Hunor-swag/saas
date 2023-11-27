export type SystemType = {
	id: number;
	name: string;
	slug: string;
	created: Date;
};

export type User = {
	id: string;
	email: string;
	password: string;
	role: string;
	firstname: string;
	lastname: string;
	lang: "en" | "hu";
};

export type DropdownItem = {
	label: string;
	href?: string;
	onClick?: () => void;
	Icon?: React.ForwardRefExoticComponent<
		Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
			title?: string | undefined;
			titleId?: string | undefined;
		} & React.RefAttributes<SVGSVGElement>
	>;
};
