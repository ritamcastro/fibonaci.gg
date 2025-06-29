import { areConsecutiveInFibSequence } from "./fibonacci";

const leftPadWithZeros = (line: number[]): number[] => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);

	return merged.length === 0
		? [...zeros, ...nonZeros]
		: [...zeros, ...new Array(merged.length).fill(0), ...merged];
};


const rightPadWithZeros = (line: number[]) => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);

	return merged.length === 0
		? [...nonZeros, ...zeros]
		: [...merged, ...new Array(merged.length).fill(0), ...zeros];
};

const mergeTiles = (subline: number[]): number[] => {
	const merged = [];
	for (let i = 1; i < subline.length; i++) {
		if (areConsecutiveInFibSequence(subline[i], subline[i - 1])) {
			merged.push(subline[i] + subline[i - 1]);
		}
	}
	return merged;
};

export { leftPadWithZeros, rightPadWithZeros };
