import type { Direction } from "../constants";
import { applyMove } from "./moves";
import { getInitialTile, getPositionForEmptyTile } from "./tile-utils";

vi.mock("./tile-utils", () => ({
	getInitialTile: vi.fn(),
	getTilePosition: vi.fn(),
	getPositionForEmptyTile: vi.fn(),
}));

describe("Rule set!", () => {
	beforeEach(() => {
		vi.mocked(getInitialTile).mockReturnValue(1);
	});

	describe("Rule #1: Numbers move as far as possible in the pushing direction", () => {
		const boardHorizontal = [
			[0, 2, 0, 5],
			[0, 21, 0, 55],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		it.each([
			{
				board: boardHorizontal,
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 2, 5],
					[0, 0, 21, 55],
					[0, 0, 0, 0],
					[1, 0, 0, 0],
				],
			},
			{
				board: boardHorizontal,
				direction: "LEFT",
				expectedBoard: [
					[2, 5, 0, 0],
					[21, 55, 0, 0],
					[0, 0, 0, 0],
					[1, 0, 0, 0],
				],
			},
		])(
			"pushes the tiles $direction when can't merge them in the horizontal direction",
			({ board, direction, expectedBoard }) => {
				vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 0 });

				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);

		const boardVertical = [
			[2, 1, 0, 0],
			[0, 3, 0, 0],
			[5, 8, 0, 0],
			[0, 21, 0, 0],
		];
		it.each([
			{
				board: boardVertical,
				direction: "UP",
				expectedBoard: [
					[2, 1, 0, 0],
					[5, 3, 0, 0],
					[0, 8, 0, 0],
					[0, 21, 0, 1],
				],
			},
			{
				board: boardVertical,
				direction: "DOWN",
				expectedBoard: [
					[0, 1, 0, 0],
					[0, 3, 0, 0],
					[2, 8, 0, 0],
					[5, 21, 0, 1],
				],
			},
		])(
			"pushes the tiles $direction when can't merge them in the vertical direction",
			({ board, direction, expectedBoard }) => {
				vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 3 });

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

		it.each([
			{
				board: boardHorizontal,
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 0, 5],
					[0, 0, 21, 55],
					[0, 0, 0, 0],
					[1, 0, 0, 0],
				],
			},
			{
				board: boardHorizontal,
				direction: "LEFT",
				expectedBoard: [
					[5, 0, 0, 0],
					[21, 55, 0, 0],
					[0, 0, 0, 0],
					[1, 0, 0, 0],
				],
			},
		])(
			"pushes the tiles $direction and merge them horizontally",
			({ board, direction, expectedBoard }) => {
				vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 0 });

				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);

		const boardVertical = [
			[2, 1, 0, 0],
			[0, 3, 0, 0],
			[3, 8, 0, 0],
			[0, 21, 0, 0],
		];

		it.each([
			{
				board: boardVertical,
				direction: "UP",
				expectedBoard: [
					[5, 1, 0, 0],
					[0, 3, 0, 0],
					[0, 8, 0, 0],
					[0, 21, 0, 1],
				],
			},
			{
				board: boardVertical,
				direction: "DOWN",
				expectedBoard: [
					[0, 1, 0, 0],
					[0, 3, 0, 0],
					[0, 8, 0, 0],
					[5, 21, 0, 1],
				],
			},
		])(
			"pushes the tiles $direction and merge them vertically",
			({ board, direction, expectedBoard }) => {
				vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 3 });

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
					[0, 0, 0, 1],
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
					[0, 0, 0, 1],
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
					[0, 0, 0, 1],
				],
			},
			{
				board: [
					[0, 0, 0, 0],
					[3, 5, 0, 0],
					[2, 3, 1, 0],
					[1, 5, 0, 0],
				],
				direction: "DOWN",
				expectedBoard: [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[3, 5, 0, 0],
					[3, 8, 1, 1],
				],
			},
		])(
			"moves the board $direction and merges the tiles",
			({ board, direction, expectedBoard }) => {
				vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 3 });

				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #3.2 A fused number can not be fused once again in the same turn.", () => {
		it("moves the board", () => {
			vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 0 });

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
				[1, 0, 0, 0],
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
					[0, 0, 0, 1],
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
					[0, 0, 0, 1],
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
					[0, 0, 0, 1],
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
					[5, 0, 0, 1],
				],
			},
		])(
			"moves the board $direction and merges the tiles",
			({ board, direction, expectedBoard }) => {
				vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 3 });

				const moved = applyMove(board, direction as Direction);

				expect(moved).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #5: New tiles are added", () => {
		it("Adds tile with the start of the sequence when at least two tiles are merged", () => {
			vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 2, col: 1 });

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

		it("Adds tile only in available spaces", () => {
			vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 1, col: 0 });

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

		it("Adds a new tile and randomly choses 1 or 2 to be added", () => {
			vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 1, col: 0 });
			vi.mocked(getInitialTile).mockReturnValue(2);

			vi.mocked(getInitialTile).mockReturnValueOnce(2);

			const boardHorizontal = [
				[21, 21, 21, 21],
				[55, 0, 55, 55],
				[144, 144, 144, 144],
				[377, 377, 377, 377],
			];

			const direction = "RIGHT";
			const expectedBoard = [
				[21, 21, 21, 21],
				[2, 55, 55, 55],
				[144, 144, 144, 144],
				[377, 377, 377, 377],
			];

			const moved = applyMove(boardHorizontal, direction as Direction);

			expect(moved).toEqual(expectedBoard);
		});
	});
});
