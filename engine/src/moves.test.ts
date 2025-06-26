import { describe, expect, it } from "vitest";
import { Board } from "./board";

describe("Moving in the board", () => {
	it("Rule #1: Numbers move as far as possible in the pushing direction", () => {
		const game = new Board([[0, 2, 0, 5]]);

        game.push("RIGHT")

        const finalState = game.getState()

        expect(finalState).toEqual([[0, 0, 2, 5]])
	});
});
