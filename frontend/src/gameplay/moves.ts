import type { Direction } from "../constants";
import { areConsecutiveInFibSequence } from "../utils/fibonacci";

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

type MovedTiles = {
	movedTiles: number[];
	hasMerged: boolean;
};

/**
 * Moves tiles to the left by padding with zeros on the right
 * Example: [0, 1, 0, 2] -> [1, 2, 0, 0]
 */
const leftPadWithZeros = (line: number[]): MovedTiles => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);
	const whatToPad = nonZeros.length - merged.length;

	const movedTiles =
		merged.length === 0
			? [...zeros, ...nonZeros]
			: [...zeros, ...new Array(whatToPad).fill(0), ...merged];

	return { movedTiles, hasMerged: merged.length !== 0 };
};

/**
 * Moves tiles to the right by padding with zeros on the left
 * Example: [0, 1, 0, 2] -> [0, 0, 1, 2]
 */
const rightPadWithZeros = (line: number[]): MovedTiles => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	const merged = mergeTiles(nonZeros);
	const whatToPad = nonZeros.length - merged.length;

	const movedTiles =
		merged.length === 0
			? [...nonZeros, ...zeros]
			: [...merged, ...new Array(whatToPad).fill(0), ...zeros];

	return { movedTiles, hasMerged: merged.length !== 0 };
};

const applyMove = (board: number[][], direction: Direction) => {
	const nrows = board.length;
	const ncols = board[0].length;
	const newBoard = board.map((row) => [...row]); // Deep copy

	let merged = false;

	if (direction === "RIGHT" || direction === "LEFT") {
		// Process each row
		for (let row = 0; row < nrows; row++) {
			const { movedTiles, hasMerged } =
				direction === "RIGHT"
					? leftPadWithZeros(newBoard[row])
					: rightPadWithZeros(newBoard[row]);
			newBoard[row] = movedTiles;

			if (hasMerged) {
				merged = true;
			}
		}
	}
	if (direction === "UP" || direction === "DOWN") {
		// Process each column
		for (let col = 0; col < ncols; col++) {
			const column: number[] = [];
			for (let row = 0; row < nrows; row++) {
				column.push(newBoard[row][col]);
			}

			const { movedTiles, hasMerged } =
				direction === "UP"
					? rightPadWithZeros(column)
					: leftPadWithZeros(column);

			for (let row = 0; row < nrows; row++) {
				newBoard[row][col] = movedTiles[row];
			}

			if (hasMerged) {
				merged = true;
			}
		}
	}

	if (merged) {
		const emptyTile = getPositionForEmptyTile(newBoard);

		newBoard[emptyTile[0]][emptyTile[1]] = 1;
	}

	return newBoard;
};

const getPositionForEmptyTile = (board: number[][]) => {
	const emptyPositions: number[][] = [];

	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			if (board[row][col] === 0) {
				const pos = [row, col];
				emptyPositions.push(pos);
			}
		}
	}

	const index = Math.ceil(Math.random() * emptyPositions.length) - 1;
	return emptyPositions[index];
};

export { applyMove };
