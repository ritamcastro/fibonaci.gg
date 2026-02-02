import { applyMove } from "./moves";

describe("Moving the tiles", () => {
	it("moves the tiles to the right", () => {
		const board = [
			[0, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0],
		];

		const moved = applyMove(board, "RIGHT");

		expect(moved).toEqual([
			[0, 0, 0, 0],
			[0, 0, 0, 1],
			[0, 0, 0, 1],
			[0, 0, 0, 0],
		]);
	});
});
