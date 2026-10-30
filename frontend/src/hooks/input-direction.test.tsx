import { act, renderHook } from "@testing-library/react";
import useBoard from "./use-board";
import useKeyboard from "./use-keyboard";
import useSwipe from "./use-swipe";

const seed = [
	[0, 0, 0, 0],
	[0, 13, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

const touch = (type: "touchstart" | "touchend", x: number, y: number) => {
	const event = new Event(type);
	Object.defineProperty(
		event,
		type === "touchstart" ? "touches" : "changedTouches",
		{
			value: [{ clientX: x, clientY: y }],
		},
	);
	window.dispatchEvent(event);
};

describe("keyboard and touch board direction", () => {
	beforeEach(() => vi.spyOn(Math, "random").mockReturnValue(0.5));
	afterEach(() => vi.restoreAllMocks());

	it.each([
		["Right", 180, 100, 1, 3],
		["Left", 20, 100, 1, 0],
		["Up", 100, 20, 0, 1],
		["Down", 100, 180, 3, 1],
	] as const)(
		"Arrow%s and a matching swipe move the tile to the same edge",
		(direction, x, y, row, col) => {
			const keyboard = renderHook(() => {
				const game = useBoard({ seed });
				useKeyboard({ onMove: game.move });
				return game;
			});
			act(() =>
				window.dispatchEvent(
					new KeyboardEvent("keydown", {
						key: `Arrow${direction}`,
						code: `Arrow${direction}`,
					}),
				),
			);
			const expectedBoard = keyboard.result.current.board;
			expect(expectedBoard[row][col]).toBe(13);
			keyboard.unmount();

			const swipe = renderHook(() => {
				const game = useBoard({ seed });
				useSwipe({ onMove: game.move, onGameOver: vi.fn() });
				return game;
			});
			act(() => {
				touch("touchstart", 100, 100);
				touch("touchend", x, y);
			});
			expect(swipe.result.current.board[row][col]).toBe(13);
			expect(swipe.result.current.board).toEqual(expectedBoard);
		},
	);
});
