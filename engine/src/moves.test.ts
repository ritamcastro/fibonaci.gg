import { describe, expect, it } from "vitest";
import { Board } from "./board";
import type { Direction } from "./model";

describe("Rule #1: Numbers move as far as possible in the pushing direction", () => {
	const boardHorizontal = [
		[0, 2, 0, 5],
		[0, 21, 0, 55],
	];
	const boardVertical = [
		[2, 1],
		[0, 3],
		[5, 8],
		[0, 21],
	];
	it.each([
		{
			board: boardHorizontal,
			direction: "RIGHT",
			expectedBoard: [
				[0, 0, 2, 5],
				[0, 0, 21, 55],
			],
		},
		{
			board: boardHorizontal,
			direction: "LEFT",
			expectedBoard: [
				[2, 5, 0, 0],
				[21, 55, 0, 0],
			],
		},
		{
			board: boardVertical,
			direction: "UP",
			expectedBoard: [
				[2, 1],
				[5, 3],
				[0, 8],
				[0, 21],
			],
		},
		{
			board: boardVertical,
			direction: "DOWN",
			expectedBoard: [
				[0, 1],
				[0, 3],
				[2, 8],
				[5, 21],
			],
		},
	])(
		"pushes the tiles $direction when can't merge them",
		({ board, direction, expectedBoard }) => {

			const game = new Board(board);

			game.push(direction as Direction);

			const finalState = game.getState();
			expect(finalState).toEqual(expectedBoard);
		},
	);
});

describe("Rule #2: When two consecutive numbers in the Fibonacci sequence are pushed one on another, they fuse into the next number.", () => {
	const boardHorizontal = [
		[0, 2, 0, 3],
		[0, 21, 0, 55],
	];

	const boardVertical = [
		[2, 1],
		[0, 3],
		[3, 8],
		[0, 21],
	];
	
	it.each([
		{
			board: boardHorizontal,
			direction: "RIGHT",
			expectedBoard: [
				[0, 0, 0, 5],
				[0, 0, 21, 55],
			],
		},
		{
			board: boardHorizontal,
			direction: "LEFT",
			expectedBoard: [
				[5, 0, 0, 0],
				[21, 55, 0, 0],
			],
		},
		{
			board: boardVertical,
			direction: "UP",
			expectedBoard: [
				[5, 1],
				[0, 3],
				[0, 8],
				[0, 21],
			],
		},
		{
			board: boardVertical,
			direction: "DOWN",
			expectedBoard: [
				[0, 1],
				[0, 3],
				[0, 8],
				[5, 21],
			],
		},
	])(
		"pushes the tiles $direction and merge them",
		({ board, direction, expectedBoard }) => {
			const game = new Board(board);

			game.push(direction as Direction);

			const finalState = game.getState();
			expect(finalState).toEqual(expectedBoard);
		},
	);
});
