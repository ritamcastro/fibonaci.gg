import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useState } from "react";
import Modal from "./modal";

describe("Modals with MDN's showModal() and React's createPortal()", () => {
	const TestModal = () => {
		const [isOpen, setIsOpen] = useState<boolean>(false);

		return (
			<>
				<button type="button" onClick={() => setIsOpen(true)}>
					Click Me!
				</button>
				{isOpen && (
					<Modal
						title="Testing the Modal"
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						cta={
							<button type="button" onClick={() => setIsOpen(false)}>
								Close me :(
							</button>
						}
					>
						<div>Modal content</div>
					</Modal>
				)}
			</>
		);
	};

	it("opens and closes the modal with clicks ;) ", async () => {
		const user = userEvent.setup();

		render(<TestModal />);

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(screen.queryByText("Modal content")).not.toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Click Me!" }));

		// The <dialog> isn't treated as visible in the accessibility tree,
		// so everything inside is considered hidden
		expect(screen.getByText("Modal content")).toBeInTheDocument();
		await user.click(
			screen.getByRole("button", { name: "Close me :(", hidden: true }),
		);

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
	});

	it("doesn't close the modal when the backdrop is clicked", async () => {
		const user = userEvent.setup();

		render(<TestModal />);

		await user.click(screen.getByRole("button", { name: "Click Me!" }));

		expect(screen.getByText("Modal content")).toBeInTheDocument();

		// Click the dialog element itself (backdrop), not the inner div
		await user.click(screen.getByRole("dialog", { hidden: true }));

		expect(screen.getByText("Modal content")).toBeInTheDocument();

		await user.click(
			screen.getByRole("button", { name: "Close me :(", hidden: true }),
		);
		expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
	});
});
