import type { Direction } from "../constants";


/**
 * Moves tiles to the left by padding with zeros on the right
 * Example: [0, 1, 0, 2] -> [1, 2, 0, 0]
 */
const leftPadWithZeros = (line: number[]): number[] => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	return  [...zeros, ...nonZeros]
};

/**
 * Moves tiles to the right by padding with zeros on the left
 * Example: [0, 1, 0, 2] -> [0, 0, 1, 2]
 */
const rightPadWithZeros = (line: number[]): number[] => {
	const zeros = line.filter((n) => n === 0);
	const nonZeros = line.filter((n) => n !== 0);

	return  [...nonZeros, ...zeros]
};

const applyMove = (board: number[][], direction: Direction) => {

    const nrows = board.length;
	// const ncols = board[0].length;
	const newBoard = board.map((row) => [...row]); // Deep copy

	if (direction === "RIGHT" || direction === "LEFT") {
		// Process each row
		for (let row = 0; row < nrows; row++) {
			const movedRow =
				direction === "RIGHT"
					? leftPadWithZeros(newBoard[row])
					: rightPadWithZeros(newBoard[row]);
			newBoard[row] = movedRow;
		}
	}
    
    return newBoard
};

export { applyMove };
