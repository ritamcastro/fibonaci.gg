import { act, renderHook } from "@testing-library/react";
import useBoard from "./use-board";
import {
	getPositionForEmptyTile,
	getTilePosition,
} from "../gameplay/tile-utils";
import { Directions } from "../constants";

vi.mock("../gameplay/tile-utils", async (importOriginal) => {
	const mod: object = await importOriginal();
	return {
		...mod,
		getTilePosition: vi.fn(),
		getPositionForEmptyTile: vi.fn(),
		getInitialTile: vi.fn().mockReturnValue(1),
	};
});

describe("board game dynamics", () => {
	it("creates an new board", () => {
		vi.mocked(getTilePosition)
			.mockReturnValueOnce({ row: 1, col: 2 })
			.mockReturnValueOnce({ row: 3, col: 0 });

		const { result } = renderHook(() => useBoard());

		expect(result.current.board).toEqual([
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]);

		act(() => result.current.newBoard());

		expect(result.current.board).toEqual([
			[0, 0, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0],
			[1, 0, 0, 0],
		]);
	});

	it("uses a default board when there was error creating a new board", () => {
		vi.mocked(getTilePosition)
			.mockReturnValueOnce({ row: 1, col: 2 })
			.mockReturnValueOnce({ row: 1, col: 2 });

		const { result } = renderHook(() => useBoard());

		act(() => result.current.newBoard());

		expect(result.current.board).toEqual([
			[0, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0],
		]);
	});

	it("moves the board to the RIGHT", () => {
		vi.mocked(getTilePosition)
			.mockReturnValueOnce({ row: 1, col: 2 })
			.mockReturnValueOnce({ row: 1, col: 2 });
		vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 1, col: 1 });

		const { result } = renderHook(() => useBoard());

		act(() => result.current.newBoard());
		act(() => result.current.move("RIGHT"));

		expect(result.current.board).toEqual([
			[0, 0, 0, 0],
			[0, 1, 0, 1],
			[0, 0, 0, 1],
			[0, 0, 0, 0],
		]);
	});

	it("calls game over when we can't merge any tiles", () => {
		const seed = [
			[1, 3, 3, 3],
			[3, 3, 3, 3],
			[3, 3, 3, 3],
			[8, 8, 8, 8],
		];
		const { result } = renderHook(() => useBoard({ seed }));

		for (const dir of Directions) {
			expect(() => {
				act(() => result.current.move(dir));
			}).toThrow("Game Over.");
		}
	});

	it("doesnt call game over when the board is filled by we can still merge some tiles", () => {
		//It doesn't matter what we return, we wont move anything with this
		vi.mocked(getPositionForEmptyTile).mockReturnValue({ row: 3, col: 0 });

		const completeBoard = [
			[1, 3, 3, 3],
			[1, 3, 3, 3],
			[3, 3, 3, 3],
			[8, 8, 8, 8],
		];

		const { result } = renderHook(() => useBoard({ seed: completeBoard }));

		// Directions that don't move
		act(() => result.current.move("LEFT"));
		expect(result.current.board).toEqual(completeBoard);

		act(() => result.current.move("RIGHT"));
		expect(result.current.board).toEqual(completeBoard);
	});

	it.each`
		direction | expectedBoard                                               | emptyTile
		${"UP"}   | ${[[2, 3, 3, 3], [3, 3, 3, 3], [8, 3, 3, 3], [1, 8, 8, 8]]} | ${{ row: 3, col: 0 }}
		${"DOWN"} | ${[[1, 3, 3, 3], [2, 3, 3, 3], [3, 3, 3, 3], [8, 8, 8, 8]]} | ${{ row: 0, col: 0 }}
	`(
		"moves a complete board $direction when it is possible to merge the tiles",
		({ direction, expectedBoard, emptyTile }) => {
			vi.mocked(getPositionForEmptyTile).mockReturnValue(emptyTile);

			const completeBoard = [
				[1, 3, 3, 3],
				[1, 3, 3, 3],
				[3, 3, 3, 3],
				[8, 8, 8, 8],
			];

			const { result } = renderHook(() => useBoard({ seed: completeBoard }));

			act(() => result.current.move(direction));
			expect(result.current.board).toEqual(expectedBoard);
		},
	);
});
