import { Outlet } from "react-router";

const Layout = () => {
	return (
		<>
			<header>
				<h1>Fibonacci meets 2048</h1>
			</header>
			<main id="main">
				<Outlet />
			</main>
			<footer>©️ ritamcastro 2026</footer>
		</>
	);
};

export default Layout;
