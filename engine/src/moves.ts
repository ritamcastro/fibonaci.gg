import { areConsecutiveInFibSequence } from "./fibonacci";

const leftPadWithZeros = (line: number[]): number[] => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);
	const whatToPad = nonZeros.length - merged.length;

	return merged.length === 0
		? [...zeros, ...nonZeros]
		: [...zeros, ...new Array(whatToPad).fill(0), ...merged];
};

const rightPadWithZeros = (line: number[]) => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);
	const whatToPad = nonZeros.length - merged.length;

	return merged.length === 0
		? [...nonZeros, ...zeros]
		: [...merged, ...new Array(whatToPad).fill(0), ...zeros];
};

const mergeTiles = (subline: number[]): number[] => {
	const lineSize = subline.length;
	const reversedLine = [...subline].reverse();

	const merged: number[] = new Array(lineSize).fill(0);
	const isFused: boolean[] = new Array(lineSize).fill(false);

	for (let i = 0; i < lineSize; i++) {
		if (!isFused[i] && !isFused[i + 1]) {
			if (areConsecutiveInFibSequence(reversedLine[i], reversedLine[i + 1])) {
				merged[i] = reversedLine[i] + reversedLine[i + 1];
				isFused[i] = true;
				isFused[i + 1] = true;
			} else {
				merged[i] = reversedLine[i];
			}
		}
	}

	return merged.filter((n) => n !== 0).reverse();
};

export { leftPadWithZeros, rightPadWithZeros };
