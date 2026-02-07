import { Outlet } from "react-router";
import type { ReactNode } from "react";

type LayoutProps = {
	children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<header>
				<h1>Fibonacci meets 2048</h1>
			</header>
			<main id="main">
				{children ?? <Outlet />}
			</main>
			<footer>©️ ritamcastro 2026</footer>
		</>
	);
};

export default Layout;
