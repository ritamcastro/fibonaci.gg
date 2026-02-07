import type { Direction } from "../constants";
import { areConsecutiveInFibSequence } from "./fibonacci";
import {
	getEmptyTiles,
	getInitialTile,
	getPositionForEmptyTile,
} from "./tile-utils";

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

/**
 * Moves tiles to the left by padding with zeros on the right
 * Example: [0, 1, 0, 2] -> [1, 2, 0, 0]
 */
const leftPadWithZeros = (line: number[]): number[] => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);
	const whatToPad = nonZeros.length - merged.length;

	return merged.length === 0
		? [...zeros, ...nonZeros]
		: [...zeros, ...new Array(whatToPad).fill(0), ...merged];
};

/**
 * Moves tiles to the right by padding with zeros on the left
 * Example: [0, 1, 0, 2] -> [0, 0, 1, 2]
 */
const rightPadWithZeros = (line: number[]): number[] => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);
	const whatToPad = nonZeros.length - merged.length;

	return merged.length === 0
		? [...nonZeros, ...zeros]
		: [...merged, ...new Array(whatToPad).fill(0), ...zeros];
};

const applyMove = (board: number[][], direction: Direction) => {
	const nrows = board.length;
	const ncols = board[0].length;
	const newBoard = board.map((row) => [...row]); // Deep copy

	if (direction === "RIGHT" || direction === "LEFT") {
		// Process each row
		for (let row = 0; row < nrows; row++) {
			const movedTiles =
				direction === "RIGHT"
					? leftPadWithZeros(newBoard[row])
					: rightPadWithZeros(newBoard[row]);
			newBoard[row] = movedTiles;
		}
	}
	if (direction === "UP" || direction === "DOWN") {
		// Process each column
		for (let col = 0; col < ncols; col++) {
			const column: number[] = [];
			for (let row = 0; row < nrows; row++) {
				column.push(newBoard[row][col]);
			}

			const movedTiles =
				direction === "UP"
					? rightPadWithZeros(column)
					: leftPadWithZeros(column);

			for (let row = 0; row < nrows; row++) {
				newBoard[row][col] = movedTiles[row];
			}
		}
	}

	const emptyTiles = getEmptyTiles(newBoard);

	if (emptyTiles.length !== 0) {
		const tile = getPositionForEmptyTile(newBoard);
		newBoard[tile.row][tile.col] = getInitialTile();
	}

	return newBoard;
};

export { applyMove };
