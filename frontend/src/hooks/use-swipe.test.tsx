import useSwipe from "./use-swipe";
import { renderHook } from "@testing-library/react";

describe("useSwipe", () => {
	let mockOnMove: ReturnType<typeof vi.fn>;
	let gameBoard: Element;

	beforeEach(() => {
		mockOnMove = vi.fn();
		vi.clearAllMocks();

		gameBoard = document.createElement("game-board");
		document.body.appendChild(gameBoard);
	});

	afterEach(() => {
		vi.restoreAllMocks();
		document.body.removeChild(gameBoard);
	});

	const dispatchTouch = ({
		gameBoard,
		x,
		y,
		type,
	}: {
		gameBoard: Element;
		x: number;
		y: number;
		type: "touchstart" | "touchend";
	}) => {
		const event = new Event(type, { bubbles: true, cancelable: true });

		const touchLike = [{ clientX: x, clientY: y }];

		Object.defineProperty(event, "touches", {
			value: type === "touchstart" ? touchLike : [],
		});
		Object.defineProperty(event, "changedTouches", {
			value: type === "touchend" ? touchLike : [],
		});

		gameBoard.dispatchEvent(event);
	};

	// ============================================
	// Swipe-to-Direction Mapping
	// ============================================
	it.each`
		direction  | x0      | y0       | x1      | y1
		${"UP"}    | ${"0"}  | ${"10"}  | ${"0"}  | ${"80"}
		${"DOWN"}  | ${"0"}  | ${"100"} | ${"0"}  | ${"10"}
		${"RIGHT"} | ${"10"} | ${"0"}   | ${"80"} | ${"0"}
		${"LEFT"}  | ${"80"} | ${"0"}   | ${"0"}  | ${"0"}
	`(
		"calls onMove with $direction when linear directions are swipped",
		({ direction, x0, y0, x1, y1 }) => {
			renderHook(() => useSwipe({ onMove: mockOnMove }));

			dispatchTouch({ gameBoard, type: "touchstart", x: x0, y: y0 });
			dispatchTouch({ gameBoard, type: "touchend", x: x1, y: y1 });

			expect(mockOnMove).toHaveBeenCalledOnce();
			expect(mockOnMove).toHaveBeenCalledWith(direction);
		},
	);

	it.each`
		direction  | x0     | y0      | x1     | y1
		${"UP"}    | ${"0"} | ${"10"} | ${"0"} | ${"15"}
		${"DOWN"}  | ${"0"} | ${"1"}  | ${"0"} | ${"10"}
		${"RIGHT"} | ${"1"} | ${"0"}  | ${"8"} | ${"0"}
		${"LEFT"}  | ${"8"} | ${"0"}  | ${"0"} | ${"0"}
	`(
		"doesn't call onMove with if the swipe is too small",
		({ direction, x0, y0, x1, y1 }) => {
			renderHook(() => useSwipe({ onMove: mockOnMove }));

			dispatchTouch({ gameBoard, type: "touchstart", x: x0, y: y0 });
			dispatchTouch({ gameBoard, type: "touchend", x: x1, y: y1 });

			expect(mockOnMove).not.toHaveBeenCalled();
		},
	);

	it.each`
		direction  | x0      | y0      | x1      | y1
		${"UP"}    | ${"10"} | ${"10"} | ${"30"} | ${"70"}
		${"DOWN"}  | ${"30"} | ${"70"} | ${"10"} | ${"10"}
		${"RIGHT"} | ${"30"} | ${"20"} | ${"90"} | ${"30"}
		${"LEFT"}  | ${"90"} | ${"20"} | ${"30"} | ${"30"}
	`(
		"calls onMove with $direction when the direction is diagonal",
		({ direction, x0, y0, x1, y1 }) => {
			renderHook(() => useSwipe({ onMove: mockOnMove }));

			dispatchTouch({ gameBoard, type: "touchstart", x: x0, y: y0 });
			dispatchTouch({ gameBoard, type: "touchend", x: x1, y: y1 });

			expect(mockOnMove).toHaveBeenCalledOnce();
			expect(mockOnMove).toHaveBeenCalledWith(direction);
		},
	);

	// ============================================
	// Deals with game over scenarios
	// ============================================
	it("calls onGameOver when onMove throws Game Over", () => {
		vi.mocked(mockOnMove).mockImplementation(() => {
			throw new Error("Game Over.");
		});
		const mockedOnGameOver = vi.fn();
		const gameBoard = document.createElement("game-board");
		document.body.appendChild(gameBoard);

		renderHook(() =>
			useSwipe({ onMove: mockOnMove, onGameOver: mockedOnGameOver }),
		);

		dispatchTouch({ gameBoard, type: "touchstart", x: 23, y: 440 });
		dispatchTouch({ gameBoard, type: "touchend", x: 23, y: 44 });

		expect(mockOnMove).toHaveBeenCalledOnce();
		expect(mockedOnGameOver).toHaveBeenCalledOnce();
	});
});
