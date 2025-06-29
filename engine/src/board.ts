import type { Direction } from "./model";
import { moveNumbersLeft, moveNumbersRight } from "./moves";
import { generateFibonacci } from "./utils/generate-fibonacci";

class Board {
	private gameArea: number[][];
	private ncols: number;
	private nrows: number;
	private fibSequence: number[];

	constructor(gameArea: number[][]) {
		this.gameArea = gameArea;
		this.ncols = gameArea[0].length;
		this.nrows = gameArea.length;
		this.fibSequence = generateFibonacci(2 ^ 16);
	}

	getState(): number[][] {
		return this.gameArea;
	}

	push(dir: Direction): void {
		if (dir === "RIGHT" || dir === "LEFT") {
			for (let row = 0; row < this.nrows; row++) {
				if (dir === "RIGHT") {
					this.gameArea[row] = moveNumbersRight(this.gameArea[row]);
				} else {
					this.gameArea[row] = moveNumbersLeft(this.gameArea[row]);
				}
			}
		}

		if (dir === "UP" || dir === "DOWN") {
			for (let col = 0; col < this.ncols; col++) {
				const moveIt: number[] = [];
				for (let row = 0; row < this.nrows; row++) {
					moveIt.push(this.gameArea[row][col]);
				}

				const pushedCol =
					dir === "UP" ? moveNumbersLeft(moveIt) : moveNumbersRight(moveIt);
			
				for (let row = 0; row < this.nrows; row++) {
					this.gameArea[row][col] = pushedCol[row];
				}
			}
		}
	}
}

export { Board };
