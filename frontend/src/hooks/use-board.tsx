import { useState } from "react";
import { getRandomPosition } from "../utils/math";

const useBoard = () => {
	const [board, setBoard] = useState<number[][]>([
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]);

	const newBoard = () => {
		const row1 = getRandomPosition();
		const col1 = getRandomPosition();

		const row2 = getRandomPosition();
		const col2 = getRandomPosition();

		const updatedBoard = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		if (row1 === row2 && col1 === col2) {
			updatedBoard[1][1] = 2;
			updatedBoard[2][2] = 2;
		} else {
			updatedBoard[row1][col1] = 2;
			updatedBoard[row2][col2] = 2;
		}
		setBoard(updatedBoard);
	};

	return { board, newBoard };
};

export default useBoard;
