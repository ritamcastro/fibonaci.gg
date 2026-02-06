import { useState } from "react";
import type { Direction } from "../constants";
import { applyMove } from "../gameplay/moves";
import { getTilePosition } from "../gameplay/tile-utils";

const useBoard = () => {
	const initialSequenceValue = 1;

	const [board, setBoard] = useState<number[][]>([
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]);

	const newBoard = () => {
		const firstTile = getTilePosition();
		const secondTile = getTilePosition();

		const updatedBoard = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		if (firstTile.row === secondTile.row && firstTile.col === secondTile.col) {
			updatedBoard[1][1] = initialSequenceValue;
			updatedBoard[2][2] = initialSequenceValue;
		} else {
			updatedBoard[firstTile.row][firstTile.col] = initialSequenceValue;
			updatedBoard[secondTile.row][secondTile.col] = initialSequenceValue;
		}
		setBoard(updatedBoard);
	};

	const move = (direction: Direction) => {
		setBoard((currentBoard) => applyMove(currentBoard, direction));
	};
	return { board, newBoard, move };
};

export default useBoard;
