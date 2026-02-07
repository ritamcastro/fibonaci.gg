import { useState } from "react";
import type { Direction } from "../constants";
import { Directions } from "../constants";
import { applyMove } from "../gameplay/moves";
import { getEmptyTiles, getTilePosition } from "../gameplay/tile-utils";

const useBoard = ({
	seed = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
}: { seed?: number[][] | undefined } = {}) => {
	const initialSequenceValue = 1;

	const [board, setBoard] = useState<number[][]>(seed);

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

		// // Create a board that is game over!
		// setBoard([
		// 	[1, 3, 3, 3],
		// 	[3, 3, 3, 3],
		// 	[3, 3, 3, 3],
		// 	[8, 8, 8, 8],
		// ]);
	};

	const move = (direction: Direction) => {
		const emptyTiles = getEmptyTiles(board);
		if (emptyTiles.length === 0) {
			const immovableDirections = Directions.filter(
				(dir) =>
					JSON.stringify(applyMove(board, dir)) === JSON.stringify(board),
			);

			const movableDirections = Directions.filter(
				(dir) =>
					JSON.stringify(applyMove(board, dir)) !== JSON.stringify(board),
			);

			if (movableDirections.includes(direction)) {
				setBoard((currentBoard) => applyMove(currentBoard, direction));
			}

			if (immovableDirections.length === Directions.length) {
				throw new Error("Game Over.");
			}
		} else {
			setBoard((currentBoard) => applyMove(currentBoard, direction));
		}
	};
	return { board, newBoard, move };
};

export default useBoard;
