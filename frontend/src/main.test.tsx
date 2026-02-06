import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Homepage from "./ui/pages/homepage";

describe("The game", () => {
	it("renders the empty board, clicks the button generates new tiles and moves the board", async () => {
		const user = userEvent.setup();

		render(<Homepage />);

		expect(
			screen.getByRole("grid", { name: "Game board" }),
		).toBeInTheDocument();
		const tiles = screen.getAllByRole("gridcell");

		expect(tiles).toHaveLength(16);

		for (const tile of tiles) {
			expect(tile).toBeEmptyDOMElement();
		}

		const newGameButton = screen.getByRole("button", { name: "New Game" });
		await user.click(newGameButton);

		expect(screen.getAllByText("1")).toHaveLength(2);

		await user.keyboard("ArrowRight");
	});
});
