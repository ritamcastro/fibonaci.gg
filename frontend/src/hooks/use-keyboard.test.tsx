import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useKeyboard from "./use-keyboard";

describe("useKeyboard", () => {
	let mockOnMove: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		mockOnMove = vi.fn();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	// ============================================
	// Key-to-Direction Mapping
	// ============================================
	it.each`
		direction  | key
		${"UP"}    | ${"ArrowUp"}
		${"DOWN"}  | ${"ArrowDown"}
		${"LEFT"}  | ${"ArrowLeft"}
		${"RIGHT"} | ${"ArrowRight"}
	`(
		"calls onMove with $direction when $key is pressed",
		({ direction, key }) => {
			renderHook(() => useKeyboard({ onMove: mockOnMove }));

			const event = new KeyboardEvent("keydown", { code: key });
			window.dispatchEvent(event);

			expect(mockOnMove).toHaveBeenCalledOnce();
			expect(mockOnMove).toHaveBeenCalledWith(direction);
		},
	);

	it.each`
		direction  | key
		${"UP"}    | ${"KeyW"}
		${"DOWN"}  | ${"KeyS"}
		${"LEFT"}  | ${"KeyA"}
		${"RIGHT"} | ${"KeyD"}
	`("supports WASD keys: $key maps to $direction", ({ direction, key }) => {
		renderHook(() => useKeyboard({ onMove: mockOnMove }));

		const event = new KeyboardEvent("keydown", { code: key });
		window.dispatchEvent(event);

		expect(mockOnMove).toHaveBeenCalledOnce();
		expect(mockOnMove).toHaveBeenCalledWith(direction);
	});

	// ============================================
	// Event Handling Behavior
	// ============================================

	it("does not call onMove for unmapped keys", () => {
		renderHook(() => useKeyboard({ onMove: mockOnMove }));

		const event = new KeyboardEvent("keydown", { code: "KeyQ" });
		window.dispatchEvent(event);

		expect(mockOnMove).not.toHaveBeenCalled();
	});

	it("prevents default behavior for arrow keys", () => {
		renderHook(() => useKeyboard({ onMove: mockOnMove }));

		const event = new KeyboardEvent("keydown", {
			key: "ArrowUp",
			cancelable: true,
		});
		const preventDefaultSpy = vi.spyOn(event, "preventDefault");
		window.dispatchEvent(event);

		expect(preventDefaultSpy).toHaveBeenCalled();
	});

	it("does not prevent default for non-arrow keys", () => {
		renderHook(() => useKeyboard({ onMove: mockOnMove }));

		const event = new KeyboardEvent("keydown", {
			key: "KeyW",
			cancelable: true,
		});
		const preventDefaultSpy = vi.spyOn(event, "preventDefault");
		window.dispatchEvent(event);

		expect(preventDefaultSpy).not.toHaveBeenCalled();
	});

	// ============================================
	// Cleanup
	// ============================================

	it("removes event listener on unmount", () => {
		const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
		const { unmount } = renderHook(() => useKeyboard({ onMove: mockOnMove }));

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"keydown",
			expect.any(Function),
		);
	});

	it("stops calling onMove after unmount", () => {
		const { unmount } = renderHook(() => useKeyboard({ onMove: mockOnMove }));

		unmount();

		const event = new KeyboardEvent("keydown", { code: "ArrowUp" });
		window.dispatchEvent(event);

		expect(mockOnMove).not.toHaveBeenCalled();
	});

	// ============================================
	// Callback Updates
	// ============================================

	it("uses the latest onMove callback when it changes", () => {
		const firstCallback = vi.fn();
		const { rerender } = renderHook(({ onMove }) => useKeyboard({ onMove }), {
			initialProps: { onMove: firstCallback },
		});

		const event = new KeyboardEvent("keydown", { code: "ArrowUp" });
		window.dispatchEvent(event);
		expect(firstCallback).toHaveBeenCalledOnce();

		const secondCallback = vi.fn();
		rerender({ onMove: secondCallback });

		window.dispatchEvent(event);
		expect(firstCallback).toHaveBeenCalledOnce(); // Still once
		expect(secondCallback).toHaveBeenCalledOnce(); // New callback called
	});

	// ============================================
	// Deals with game over scenarios
	// ============================================
	it("calls onGameOver when onMove throws Game Over", () => {
		vi.mocked(mockOnMove).mockImplementation(() => {
			throw new Error("Game Over.");
		});
		const mockedOnGameOver = vi.fn();

		renderHook(() =>
			useKeyboard({ onMove: mockOnMove, onGameOver: mockedOnGameOver }),
		);

		const event = new KeyboardEvent("keydown", { code: "KeyW" });
		window.dispatchEvent(event);

		expect(mockOnMove).toHaveBeenCalledOnce();
		expect(mockedOnGameOver).toHaveBeenCalledOnce();
	});
});
