import { describe, expect, it } from "vitest";
import { Board } from "./board";

describe("The Board for Fibonacci", () => {
	it("thows an error if the board that is not squared", () => {
		expect(() => new Board([[1, 2]])).toThrowError("The Board needs to be squared!")
	})
})