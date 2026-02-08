import type { Direction } from "../constants";

type Tile = {
	row: number;
	col: number;
};

// Returns an element between 0 and 3, to index the board
const getRandomPosition = (): number => Math.ceil(Math.random() * 4) - 1;

const getInitialTile = () => {
	return Math.random() < 0.9 ? 1 : 2;
};

const getTilePosition = (): Tile => {
	const row = getRandomPosition();
	const col = getRandomPosition();

	return { row, col };
};

const getPositionForEmptyTile = (board: number[][]): Tile => {
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
	return { row: emptyPositions[index][0], col: emptyPositions[index][1] };
};

const getEmptyTiles = (board: number[][]): Tile[] => {
	const emptyPositions: Tile[] = [];

	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			if (board[row][col] === 0) {
				emptyPositions.push({ row, col });
			}
		}
	}
	return emptyPositions;
};

const getSwipeDirection = ({
	dx,
	dy,
	minDistance,
}: { dx: number; dy: number; minDistance: number }): Direction | null => {
	const dominance = 1;

	const absX = Math.abs(dx);
	const absY = Math.abs(dy);

	if (Math.hypot(dx, dy) < minDistance) return null;

	if (absX >= absY * dominance) {
		return dx > 0 ? "RIGHT" : "LEFT";
	}
	if (absY >= absX * dominance) {
		return dy > 0 ? "DOWN" : "UP";
	}

	// oh no, we can't seem to choose a direction
	return null;
};

export {
	getInitialTile,
	getPositionForEmptyTile,
	getTilePosition,
	getEmptyTiles,
	getSwipeDirection,
};
