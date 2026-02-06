import { describe, expect, it } from "vitest";
import { areConsecutiveInFibSequence } from "./fibonacci";
// value: 0 1 1 2 3 5 8
// index: 0 1 2 3 4 5 6

describe("The Fibonacci Sequence...", () => {
	it.each([
		{
			n1: 5,
			n2: 8,
			areConsecutive: true,
		},
		{
			n1: 3,
			n2: 5,
			areConsecutive: true,
		},

		{
			n1: 21,
			n2: 34,
			areConsecutive: true,
		},
	])(
		"can evaluate if entries are consecutive in ascending order",
		({ n1, n2, areConsecutive }) => {
			const consecutive = areConsecutiveInFibSequence(n1, n2);

			expect(consecutive).toBe(areConsecutive);
		},
	);

	it.each([
		{
			n2: 5,
			n1: 8,
			areConsecutive: true,
		},
		{
			n2: 3,
			n1: 5,
			areConsecutive: true,
		},

		{
			n2: 21,
			n1: 34,
			areConsecutive: true,
		},
	])(
		"can evaluate if entries are consecutive in descending order",
		({ n1, n2, areConsecutive }) => {
			const consecutive = areConsecutiveInFibSequence(n1, n2);

			expect(consecutive).toBe(areConsecutive);
		},
	);

	it.each([
		{
			n2: 0,
			n1: 1,
			areConsecutive: true,
		},
		{
			n2: 1,
			n1: 0,
			areConsecutive: true,
		},
		{
			n2: 1,
			n1: 1,
			areConsecutive: true,
		},
		{
			n2: 1,
			n1: 2,
			areConsecutive: true,
		},
		{
			n2: 2,
			n1: 1,
			areConsecutive: true,
		},
	])(
		"can evaluate the egde cases at the start of the sequence: ($n1 -> $n2)",
		({ n1, n2, areConsecutive }) => {
			const consecutive = areConsecutiveInFibSequence(n1, n2);

			expect(consecutive).toBe(areConsecutive);
		},
	);
});
