import { applyMove } from "./moves";

describe("Moving the tiles", () => {
	it.each`
		direction  | initialBoard                                                | expectedBoard
		${"RIGHT"} | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0]]}
		${"LEFT"}  | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]}
		${"UP"}    | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]}
		${"DOWN"}  | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0]]}
	`(
		"moves the board $direction",
		({ initialBoard, direction, expectedBoard }) => {
			const moved = applyMove(initialBoard, direction);

			expect(moved).toEqual(expectedBoard);
		},
	);
});
