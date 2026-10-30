import { expect, test, type Locator } from "@playwright/test";

// Dispatch legacy touch events in both Chromium and WebKit, following
// https://playwright.dev/docs/touch-events. These are synthetic swipes.
async function swipe(board: Locator, dx: number, dy: number) {
	await board.scrollIntoViewIfNeeded();
	const { x, y } = await board.evaluate((element) => {
		const bounds = element.getBoundingClientRect();
		return {
			x: bounds.left + bounds.width / 2,
			y: bounds.top + bounds.height / 2,
		};
	});
	const start = { identifier: 0, clientX: x, clientY: y };
	await board.dispatchEvent("touchstart", {
		touches: [start],
		changedTouches: [start],
		targetTouches: [start],
	});
	for (let step = 1; step <= 4; step++) {
		const point = {
			identifier: 0,
			clientX: x + (dx * step) / 4,
			clientY: y + (dy * step) / 4,
		};
		await board.dispatchEvent("touchmove", {
			touches: [point],
			changedTouches: [point],
			targetTouches: [point],
		});
	}
	await board.dispatchEvent("touchend", {
		touches: [],
		targetTouches: [],
		changedTouches: [{ identifier: 0, clientX: x + dx, clientY: y + dy }],
	});
}

const directions = [
	{ name: "Right", dx: 80, dy: 0, destinations: [7, 11] },
	{ name: "Left", dx: -80, dy: 0, destinations: [4, 8] },
	{ name: "Up", dx: 0, dy: -80, destinations: [1, 2] },
	{ name: "Down", dx: 0, dy: 80, destinations: [13, 14] },
];

for (const direction of directions) {
	test(`${direction.name} input moves tiles toward the ${direction.name.toLowerCase()} edge`, async ({
		page,
		isMobile,
	}) => {
		// Deterministic New Game: two ones at row/column (1,1) and (2,2).
		// Also fixes the location/value of the tile spawned after moving.
		await page.addInitScript(() => {
			Math.random = () => 0.5;
		});
		await page.goto("/");
		await page.getByRole("button", { name: "New Game" }).click();
		const board = page.getByRole("grid", { name: "Game board" });
		const cells = board.getByRole("gridcell");
		await expect(cells).toHaveText([
			"",
			"",
			"",
			"",
			"",
			"1",
			"",
			"",
			"",
			"",
			"1",
			"",
			"",
			"",
			"",
			"",
		]);

		if (isMobile) {
			await swipe(board, direction.dx, direction.dy);
		} else {
			await page.keyboard.press(`Arrow${direction.name}`);
		}

		// Two edge destinations prevent a newly spawned tile from masking a
		// reversed move: the opposite move cannot fill both expected cells.
		for (const index of direction.destinations) {
			await expect(cells.nth(index)).toHaveText("1");
		}
		await expect(cells.filter({ hasText: /^1$/ })).toHaveCount(3);
	});
}
