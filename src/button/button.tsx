import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";

export enum ButtonVariant {
	PRIMARY = "primary",
	SECONDARY = "secondary",
}

export enum ButtonSize {
	LARGE = 700,
	NORMAL = 500,
}

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	children: ReactNode;
}

export const Button = ({
	variant = ButtonVariant.PRIMARY,
	size = ButtonSize.NORMAL,
	children,
	...props
}: ButtonProps) => {
	const className = `button btn-variant-${variant} btn-size-${size}`;
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};
