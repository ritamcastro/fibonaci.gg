import { describe, expect, it } from "vitest";
import { Board } from "./board";
import type { Direction } from "./model";

describe("Rule set!", () => {
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

				game.move(direction as Direction);

				const finalState = game.getState();
				expect(finalState).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #2: When two consecutive numbers in the Fibonacci sequence are moveed one on another, they fuse into the next number.", () => {
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

				game.move(direction as Direction);

				const finalState = game.getState();
				expect(finalState).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #3.1: Fusing orders are resolved in the backward direction of the push.", () => {
		it.each([
			{
				board: [
					[0, 1, 2, 3],
					[0, 3, 2, 1],
				],
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 1, 5],
					[0, 0, 3, 3],
				],
			},
			{
				board: [
					[0, 3, 2, 1],
					[0, 5, 3, 5],
				],
				direction: "LEFT",
				expectedBoard: [
					[3, 3, 0, 0],
					[5, 8, 0, 0],
				],
			},
			{
				board: [
					[0, 0],
					[3, 5],
					[2, 3],
					[1, 5],
				],
				direction: "UP",
				expectedBoard: [
					[3, 5],
					[3, 8],
					[0, 0],
					[0, 0],
				],
			},
			{
				board: [
					[0, 0],
					[3, 5],
					[2, 3],
					[1, 5],
				],
				direction: "DOWN",
				expectedBoard: [
					[0, 0],
					[0, 0],
					[3, 5],
					[3, 8],
				],
			},
		])(
			"moves the board $direction and merges the tiles",
			({ board, direction, expectedBoard }) => {
				const game = new Board(board);

				game.move(direction as Direction);

				const finalState = game.getState();
				expect(finalState).toEqual(expectedBoard);
			},
		);
	});

	describe("Rule #3.2 A fused number can not be fused once again in the same turn.", () => {
		it("needs to done", () => {
			expect(true).toBe(true);
		});
		// ???
	});

	describe("Rule #4: Numbers can move to a square that a fusing has just emptied.", () => {
		it.each([
			{
				board: [
					[1, 1, 1, 1],
					[1, 0, 3, 5],
				],
				direction: "RIGHT",
				expectedBoard: [
					[0, 0, 2, 2],
					[0, 0, 1, 8],
				],
			},
			{
				board: [
					[1, 1, 1, 1],
					[1, 0, 3, 5],
				],
				direction: "LEFT",
				expectedBoard: [
					[2, 2, 0, 0],
					[1, 8, 0, 0],
				],
			},
			{
				board: [
					[1], 
					[1], 
					[2], 
					[3]
				],
				direction: "UP",
				expectedBoard: [
					[2], 
					[5], 
					[0], 
					[0]
				],
			},
				{
				board: [
					[1], 
					[1], 
					[2], 
					[3]
				],
				direction: "DOWN",
				expectedBoard: [
					[0], 
					[0], 
					[2], 
					[5]
				],
			},
		])(
			"moves the board $direction and merges the tiles",
			({ board, direction, expectedBoard }) => {
				const game = new Board(board);

				game.move(direction as Direction);

				const finalState = game.getState();
				expect(finalState).toEqual(expectedBoard);
			},
		);
	});
});
