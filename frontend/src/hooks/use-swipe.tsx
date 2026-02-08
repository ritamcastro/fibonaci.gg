import { useEffect, useRef } from "react";
import type { Direction } from "../constants";
import { getSwipeDirection } from "../gameplay/tile-utils";

const useSwipe = ({
	onMove,
	onGameOver,
}: { onMove: (direction: Direction) => void; onGameOver: () => void }) => {
	const startRef = useRef<{ x: number; y: number } | null>(null);

	const minDistance = 50;

	useEffect(() => {
		const targetElement = document.getElementById("game-board") || window;

		const onTouchStart = (e: TouchEvent) => {
			const t = e.touches[0];
			if (!t) return;
			startRef.current = { x: t.clientX, y: t.clientY };
		};

		const onTouchEnd = (e: TouchEvent) => {
			const start = startRef.current;
			if (!start) return;

			const t = e.changedTouches[0];
			if (!t) return;

			const dx = t.clientX - start.x;
			// DOM touch/mouse events clientY increases as you go down the screen
			const dy = -(t.clientY - start.y);

			const direction = getSwipeDirection({ dx, dy, minDistance });
			if (direction !== null) {
				try {
					onMove(direction);
				} catch (error) {
					if (
						error instanceof Error &&
						error.message === "Game Over." &&
						onGameOver
					) {
						onGameOver();
					}
				}
			}

			startRef.current = null;
		};

		targetElement.addEventListener(
			"touchstart",
			onTouchStart as EventListener,
			{
				passive: true,
			},
		);
		targetElement.addEventListener("touchend", onTouchEnd as EventListener, {
			passive: true,
		});

		return () => {
			targetElement.removeEventListener(
				"touchstart",
				onTouchStart as EventListener,
			);
			targetElement.removeEventListener(
				"touchend",
				onTouchEnd as EventListener,
			);
		};
	}, [onMove, onGameOver]);
};

export default useSwipe;
