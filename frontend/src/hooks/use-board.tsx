import { useState } from "react";
import { getRandomPosition } from "../utils/math";

type Direction = "LEFT" | "RIGHT" | "UP" | "DOWN";

const useBoard = () => {
	const initialSequenceValue = 1;

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
			updatedBoard[1][1] = initialSequenceValue;
			updatedBoard[2][2] = initialSequenceValue;
		} else {
			updatedBoard[row1][col1] = initialSequenceValue;
			updatedBoard[row2][col2] = initialSequenceValue;
		}
		setBoard(updatedBoard);
	};

	return { board, newBoard };
};

export default useBoard;
