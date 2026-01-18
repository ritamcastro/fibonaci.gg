import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

const Main = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <div>ola</div>,
			children: [
				{
					index: true,
					element: <div>ola</div>,
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
