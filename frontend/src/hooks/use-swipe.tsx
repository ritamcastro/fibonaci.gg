import { useEffect, useRef } from "react";
import type { Direction } from "../constants";

interface SwipeHandlers {
	onSwipe: (direction: Direction) => void;
	element?: HTMLElement | null;
	enabled?: boolean;
}

/**
 * Hook to handle touch/swipe gestures for mobile game controls
 * @param onSwipe - Callback function called when a swipe is detected
 * @param element - Optional element to attach swipe listeners to (defaults to window)
 * @param enabled - Whether swipe controls are enabled (default: true)
 */
const useSwipe = ({ onSwipe, element, enabled = true }: SwipeHandlers) => {
	const touchStartRef = useRef<{ x: number; y: number } | null>(null);
	const touchEndRef = useRef<{ x: number; y: number } | null>(null);

	// Minimum distance in pixels to consider it a swipe
	const minSwipeDistance = 50;

	useEffect(() => {
		if (!enabled) return;

		const targetElement = element || window;

		const handleTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0];
			touchStartRef.current = { x: touch.clientX, y: touch.clientY };
			touchEndRef.current = null;
		};

		const handleTouchMove = (event: TouchEvent) => {
			const touch = event.touches[0];
			touchEndRef.current = { x: touch.clientX, y: touch.clientY };
		};

		const handleTouchEnd = () => {
			if (!touchStartRef.current || !touchEndRef.current) return;

			const deltaX = touchEndRef.current.x - touchStartRef.current.x;
			const deltaY = touchEndRef.current.y - touchStartRef.current.y;

			const absDeltaX = Math.abs(deltaX);
			const absDeltaY = Math.abs(deltaY);

			// Determine if it's a horizontal or vertical swipe
			if (absDeltaX > absDeltaY) {
				// Horizontal swipe
				if (absDeltaX > minSwipeDistance) {
					onSwipe(deltaX > 0 ? "RIGHT" : "LEFT");
				}
			} else {
				// Vertical swipe
				if (absDeltaY > minSwipeDistance) {
					onSwipe(deltaY > 0 ? "DOWN" : "UP");
				}
			}

			// Reset touch points
			touchStartRef.current = null;
			touchEndRef.current = null;
		};

		targetElement.addEventListener("touchstart", handleTouchStart, {
			passive: true,
		});
		targetElement.addEventListener("touchmove", handleTouchMove, {
			passive: true,
		});
		targetElement.addEventListener("touchend", handleTouchEnd, {
			passive: true,
		});

		return () => {
			targetElement.removeEventListener("touchstart", handleTouchStart);
			targetElement.removeEventListener("touchmove", handleTouchMove);
			targetElement.removeEventListener("touchend", handleTouchEnd);
		};
	}, [onSwipe, element, enabled]);
};

export default useSwipe;
