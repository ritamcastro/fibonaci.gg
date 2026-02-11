import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import { Outlet } from "react-router";
import logo from "../../assets/logo.svg";
import Link from "../atoms/link";
import copyright from "../../assets/copyright.svg";

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
			<footer>
				<img src={copyright} aria-label="Copyright logo" style={{ marginRight: 8, verticalAlign: "middle" }} />
				
				<Link 
					url="https://www.ritamcastro.dev/" 
				>
					ritamcastro 2026
				</Link>
			</footer>
		</>)
};

export default Layout;
