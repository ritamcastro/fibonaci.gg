// describe("Moving the tiles", () => {
// 	it.each`
// 		direction  | initialBoard                                                | expectedBoard
// 		${"RIGHT"} | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0]]}
// 		${"LEFT"}  | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]}
// 		${"UP"}    | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]}
// 		${"DOWN"}  | ${[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]} | ${[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0]]}
// 	`(
// 		"moves the board $direction",
// 		({ initialBoard, direction, expectedBoard }) => {
// 			const moved = applyMove(initialBoard, direction);

import type { Direction } from "../constants";
import { getRandomPosition } from "../utils/math";
import { applyMove } from "./moves";

vi.mock("../utils/math", () => ({
	getRandomPosition: vi.fn(),
}));

describe("Rule set!", () => {
	describe("Rule #1: Numbers move as far as possible in the pushing direction", () => {
		const boardHorizontal = [
			[0, 2, 0, 5],
			[0, 21, 0, 55],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		const boardVertical = [
			[2, 1, 0, 0],
			[0, 3, 0, 0],
			[5, 8, 0, 0],
			[0, 21, 0, 0],
		];
		it.each([
			{
				board: boardHorizontal,
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 2, 5],
					[0, 0, 21, 55],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: boardHorizontal,
				direction: "LEFT",
				expectedBoard: [
					[2, 5, 0, 0],
					[21, 55, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: boardVertical,
				direction: "UP",
				expectedBoard: [
					[2, 1, 0, 0],
					[5, 3, 0, 0],
					[0, 8, 0, 0],
					[0, 21, 0, 0],
				],
			},
			{
				board: boardVertical,
				direction: "DOWN",
				expectedBoard: [
					[0, 1, 0, 0],
					[0, 3, 0, 0],
					[2, 8, 0, 0],
					[5, 21, 0, 0],
				],
			},
		])(
			"pushes the tiles $direction when can't merge them",
			({ board, direction, expectedBoard }) => {
				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #2: When two consecutive numbers in the Fibonacci sequence are moveed one on another, they fuse into the next number.", () => {
		const boardHorizontal = [
			[0, 2, 0, 3],
			[0, 21, 0, 55],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		const boardVertical = [
			[2, 1, 0, 0],
			[0, 3, 0, 0],
			[3, 8, 0, 0],
			[0, 21, 0, 0],
		];

		it.each([
			{
				board: boardHorizontal,
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 0, 5],
					[0, 0, 21, 55],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: boardHorizontal,
				direction: "LEFT",
				expectedBoard: [
					[5, 0, 0, 0],
					[21, 55, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: boardVertical,
				direction: "UP",
				expectedBoard: [
					[5, 1, 0, 0],
					[0, 3, 0, 0],
					[0, 8, 0, 0],
					[0, 21, 0, 0],
				],
			},
			{
				board: boardVertical,
				direction: "DOWN",
				expectedBoard: [
					[0, 1, 0, 0],
					[0, 3, 0, 0],
					[0, 8, 0, 0],
					[5, 21, 0, 0],
				],
			},
		])(
			"pushes the tiles $direction and merge them",
			({ board, direction, expectedBoard }) => {
				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #3.1: Fusing orders are resolved in the backward direction of the push.", () => {
		it.each([
			{
				board: [
					[0, 1, 2, 3],
					[0, 3, 2, 1],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 1, 5],
					[0, 0, 3, 3],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: [
					[0, 3, 2, 1],
					[0, 5, 3, 5],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
				direction: "LEFT",
				expectedBoard: [
					[3, 3, 0, 0],
					[5, 8, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: [
					[0, 0, 0, 0],
					[3, 5, 0, 0],
					[2, 3, 0, 0],
					[1, 5, 0, 0],
				],
				direction: "UP",
				expectedBoard: [
					[3, 5, 0, 0],
					[3, 8, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: [
					[0, 0, 0, 0],
					[3, 5, 0, 0],
					[2, 3, 0, 0],
					[1, 5, 0, 0],
				],
				direction: "DOWN",
				expectedBoard: [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[3, 5, 0, 0],
					[3, 8, 0, 0],
				],
			},
		])(
			"moves the board $direction and merges the tiles",
			({ board, direction, expectedBoard }) => {
				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #3.2 A fused number can not be fused once again in the same turn.", () => {
		it("moves the board", () => {
			const board = [
				[1, 2, 3, 5],
				[0, 3, 2, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			];
			const direction = "RIGHT";
			const expectedBoard = [
				[0, 0, 3, 8],
				[0, 0, 3, 3],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			];

			const moved = applyMove(board, direction as Direction);

			expect(moved).toEqual(expectedBoard);
		});
	});

	describe("Rule #4: Numbers can move to a square that a fusing has just emptied.", () => {
		it.each([
			{
				board: [
					[1, 1, 1, 1],
					[1, 0, 3, 5],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 2, 2],
					[0, 0, 1, 8],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: [
					[1, 1, 1, 1],
					[1, 0, 3, 5],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
				direction: "LEFT",
				expectedBoard: [
					[2, 2, 0, 0],
					[1, 8, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: [
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[2, 0, 0, 0],
					[3, 0, 0, 0],
				],
				direction: "UP",
				expectedBoard: [
					[2, 0, 0, 0],
					[5, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
			},
			{
				board: [
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[2, 0, 0, 0],
					[3, 0, 0, 0],
				],
				direction: "DOWN",
				expectedBoard: [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[2, 0, 0, 0],
					[5, 0, 0, 0],
				],
			},
		])(
			"moves the board $direction and merges the tiles",
			({ board, direction, expectedBoard }) => {
				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #5: New tiles are added", () => {
		it("Adds tile with the start of the sequence when at least two tiles are merged", () => {
			vi.mocked(getRandomPosition)
				.mockReturnValueOnce(2)
				.mockReturnValueOnce(1);

			const boardHorizontal = [
				[0, 2, 0, 5],
				[0, 21, 0, 55],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			];
			const direction = "RIGHT";
			const expectedBoard = [
				[0, 0, 2, 5],
				[0, 0, 21, 55],
				[0, 1, 0, 0],
				[0, 0, 0, 0],
			];

			const moved = applyMove(boardHorizontal, direction as Direction);

			expect(moved).toEqual(expectedBoard);
		});

		it("Adds tile only to available spaces", () => {
			vi.mocked(getRandomPosition)
				.mockReturnValueOnce(2)
				.mockReturnValueOnce(1);

			const boardHorizontal = [
				[21, 21, 21, 21],
				[55, 0, 55, 55],
				[144, 144, 144, 144],
				[377, 377, 377, 377],
			];

			const direction = "RIGHT";
			const expectedBoard = [
				[21, 21, 21, 21],
				[1, 55, 55, 55],
				[144, 144, 144, 144],
				[377, 377, 377, 377],
			];

			const moved = applyMove(boardHorizontal, direction as Direction);

			expect(moved).toEqual(expectedBoard);
		});
	});
});
