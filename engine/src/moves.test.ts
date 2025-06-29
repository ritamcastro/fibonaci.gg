import { describe, expect, it } from "vitest";
import { Board } from "./board";

describe("Rule #1: Numbers move as far as possible in the pushing direction", () => {
	it("pushes the tiles RIGHT when can't merge them", () => {
		const game = new Board([
			[0, 2, 0, 5],
			[0, 21, 0, 55],
		]);

		game.push("RIGHT");

		const finalState = game.getState();
		expect(finalState).toEqual([
			[0, 0, 2, 5],
			[0, 0, 21, 55],
		]);
	});

	it("pushes the tiles LEFT when can't merge them", () => {
		const game = new Board([
			[0, 2, 0, 5],
			[0, 21, 0, 55],
		]);

		game.push("LEFT");

		const finalState = game.getState();
		expect(finalState).toEqual([
			[2, 5, 0, 0],
			[21, 55, 0, 0],
		]);
	});

	it("pushes the tiles UP when can't merge them", () => {
		const game = new Board([
			[2, 1],
			[0, 3],
			[5, 8],
			[0, 21],
		]);

		game.push("UP");

		const finalState = game.getState();
		expect(finalState).toEqual([
			[2, 1],
			[5, 3],
			[0, 8],
			[0, 21],
		]);
	});

	it("pushes the tiles DOWN when can't merge them", () => {
		const game = new Board([
			[2, 1],
			[0, 3],
			[5, 8],
			[0, 21],
		]);

		game.push("DOWN");

		const finalState = game.getState();
		expect(finalState).toEqual([
			[0, 1],
			[0, 3],
			[2, 8],
			[5, 21],
		]);
	});
});
