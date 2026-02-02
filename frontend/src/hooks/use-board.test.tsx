import { act, renderHook } from "@testing-library/react";
import { getRandomPosition } from "../utils/math";
import useBoard from "./use-board";

// vi.mock(
// 	"../../../../contexts/fba-upload-data-metrics-context",
// 	async (importOriginal) => {
// 		const mod: object = await importOriginal();
// 		return { ...mod, useUploadDataMetrics: vi.fn() };
// 	},
// );

vi.mock("../utils/math", () => ({
	getRandomPosition: vi.fn(),
}));

describe("board game dynamics", () => {
	it("creates an new board", () => {
		vi.mocked(getRandomPosition)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(2)
			.mockReturnValueOnce(3)
			.mockReturnValueOnce(0);

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
		vi.mocked(getRandomPosition)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(2)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(2);

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
		vi.mocked(getRandomPosition)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(2)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(2);

		const { result } = renderHook(() => useBoard());

		act(() => result.current.newBoard());
		act(() => result.current.move("RIGHT"));

		expect(result.current.board).toEqual([
			[0, 0, 0, 0],
			[0, 0, 0, 1],
			[0, 0, 0, 1],
			[0, 0, 0, 0],
		]);
	});
});
