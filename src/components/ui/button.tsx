"use client";
type Props = {
	children: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
};

export default function Button({
	children,
	type,
	onClick,
	disabled = false,
	className,
}: Props) {
	return (
		<button
			onClick={onClick}
			type={type}
			className={`${className} bg-gray-800 text-white font-semibold rounded-sm py-2 w-full text-center text-sm`}
		>
			{children}
		</button>
	);
}
