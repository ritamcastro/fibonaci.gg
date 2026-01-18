import { Outlet } from "react-router";

const Layout = () => {
	return (
		<>
			<header>Fibonacci meets 2048</header>
			<main id="main">
				<Outlet />
			</main>
			<footer>©️ ritamcastro 2026</footer>
		</>
	);
};

export default Layout;
