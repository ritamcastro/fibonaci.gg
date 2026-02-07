import { useEffect } from "react";
import type { Direction } from "../constants";

type UseKeyboardProps = {
	onMove: (direction: Direction) => void;
	onGameOver?: () => void;
};

const useKeyboard = ({ onMove, onGameOver }: UseKeyboardProps) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
			if (arrowKeys.includes(event.key)) {
				event.preventDefault();
			}

			const keyToDirection: Record<string, Direction> = {
				ArrowUp: "UP",
				ArrowDown: "DOWN",
				ArrowLeft: "LEFT",
				ArrowRight: "RIGHT",
				KeyW: "UP",
				KeyS: "DOWN",
				KeyA: "LEFT",
				KeyD: "RIGHT",
			};

			const direction = keyToDirection[event.code];
			if (direction) {
				try {
					onMove(direction);
				} catch (error) {
					if (
						error instanceof Error &&
						error.message === "Game Over." &&
						onGameOver
					) {
						onGameOver();
					} else {
						throw error;
					}
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onMove, onGameOver]);
};

export default useKeyboard;
