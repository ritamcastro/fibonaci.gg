import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import Homepage from "./ui/pages/homepage";
import Layout from "./ui/templates/layout";
import "./main.css";
import "./ui/foundations.css";
import GenericError from "./ui/pages/generic-error";

const Main = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			errorElement: (
				<Layout>
					<GenericError />
				</Layout>
			),
			children: [
				{
					index: true,
					element: <Homepage />,
				},
			],
		},
	]);

	return (
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
};

createRoot(document.getElementById("fibo48")!).render(<Main />);
