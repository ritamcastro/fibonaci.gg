import { act, renderHook } from "@testing-library/react";
import useBoard from "./use-board";
import {
	getPositionForEmptyTile,
	getTilePosition,
} from "../gameplay/tile-utils";

vi.mock("../gameplay/tile-utils", () => ({
	getTilePosition: vi.fn(),
	getPositionForEmptyTile: vi.fn(),
	getInitialTile: vi.fn().mockReturnValue(1),
}));

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
});
