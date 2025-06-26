import type { Direction } from "./model";
import { moveNumbersToEnd } from "./moves";
import { generateFibonacci } from "./utils/generate-fibonacci";

class Board {
  private gameArea: number[][];
  private width: number;
  private height: number;
  private fibSequence: number[]

  constructor(gameArea: number[][]) {
    this.gameArea = gameArea;
    this.width = gameArea[0].length;
    this.height = gameArea.length;
    this.fibSequence = generateFibonacci(2 ^ 16);
  }


  getState(): number[][] {
    return this.gameArea
  }

  push(dir: Direction): void{
    console.log("Pushed: ", dir)
    
    this.gameArea[0] = moveNumbersToEnd(this.gameArea[0])



  }
}

export {Board}