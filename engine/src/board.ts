import type { Direction } from "./model";
import { leftPadWithZeros, rightPadWithZeros } from "./moves";

class Board {
	private gameArea: number[][];
	private ncols: number;
	private nrows: number;

	constructor(gameArea: number[][]) {
		this.gameArea = gameArea;
		this.ncols = gameArea[0].length;
		this.nrows = gameArea.length;
	}

	getState(): number[][] {
		return this.gameArea;
	}

	move(dir: Direction): void {
		if (dir === "RIGHT" || dir === "LEFT") {
			for (let row = 0; row < this.nrows; row++) {
				const pushedRow =
					dir === "RIGHT"
						? leftPadWithZeros(this.gameArea[row])
						: rightPadWithZeros(this.gameArea[row]);
				this.gameArea[row] = pushedRow;
			}
		}

		if (dir === "UP" || dir === "DOWN") {
			for (let col = 0; col < this.ncols; col++) {
				const moveIt: number[] = [];
				for (let row = 0; row < this.nrows; row++) {
					moveIt.push(this.gameArea[row][col]);
				}

				const pushedCol =
					dir === "UP" ? rightPadWithZeros(moveIt) : leftPadWithZeros(moveIt);

				for (let row = 0; row < this.nrows; row++) {
					this.gameArea[row][col] = pushedCol[row];
				}
			}
		}
	}
}

export { Board };
