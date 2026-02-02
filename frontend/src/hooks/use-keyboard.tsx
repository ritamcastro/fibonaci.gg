import { useEffect } from "react";
import type { Direction } from "../constants";

const useKeyboard = (onMove: (direction: Direction) => void) => {
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
				onMove(direction);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onMove]);
};

export default useKeyboard;
