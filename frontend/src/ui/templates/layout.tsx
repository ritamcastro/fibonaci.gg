import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import { Outlet } from "react-router";
import logo from "../../assets/logo.svg";

type LayoutProps = {
	children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<header>
				{/* <h1>Fibonacci meets 2024</h1> */}
				<img src={logo} aria-label="Fibonacci meets 2048" />
			</header>
			<main id="main">
				<>
					{children ?? <Outlet />}
					<Analytics />
				</>
			</main>
			<footer>©️ ritamcastro 2026</footer>
		</>
	);
};

export default Layout;
