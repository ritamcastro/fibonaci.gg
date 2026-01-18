import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import Homepage from "./ui/pages/homepage";
import Layout from "./ui/templates/layout";

const Main = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
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

createRoot(document.getElementById("root")!).render(<Main />);
