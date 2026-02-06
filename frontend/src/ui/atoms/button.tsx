import type { ReactNode } from "react";
import "./button.css";

type ButtonType = "primary" | "secondary";

const Button = ({
	children,
	variant,
	onClick,
}: { onClick: () => void; variant: ButtonType; children: ReactNode }) => {
	return (
		<button
			className={`button button--${variant}`}
			type="button"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
export type { ButtonType };
