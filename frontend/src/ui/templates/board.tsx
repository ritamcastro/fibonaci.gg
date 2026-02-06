import "./board.css";

const Board = ({ gameArea }: { gameArea: number[][] }) => {
	return (
		// biome-ignore lint/a11y/useSemanticElements: I do not want a table, I want a container for my board
		<div className="game-area" role="grid" aria-label="Game board">
			{gameArea.map((row, rowIndex) => {
				return (
					<Line key={rowIndex} row={rowIndex}>
						{row}
					</Line>
				);
			})}
		</div>
	);
};

const Line = ({ row, children }: { row: number; children: number[] }) => {
	return (
		<div className="line">
			{children.map((col, index) => {
				return <Tile key={`${row}x${index}`}>{col}</Tile>;
			})}
		</div>
	);
};

const Tile = ({ children }: { children: number }) => {
	const getTileClassName = (value: number): string => {
		if (value === 0) return "tile";

		// Use extra dark violet for numbers greater than 144
		if (value > 144) return "tile tile-fib-233";

		// Fibonacci numbers up to 144: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
		const fibColors: Record<number, string> = {
			1: "tile tile-fib-1",
			2: "tile tile-fib-2",
			3: "tile tile-fib-3",
			5: "tile tile-fib-5",
			8: "tile tile-fib-8",
			13: "tile tile-fib-13",
			21: "tile tile-fib-21",
			34: "tile tile-fib-34",
			55: "tile tile-fib-55",
			89: "tile tile-fib-89",
			144: "tile tile-fib-144",
		};

		return fibColors[value] || "tile";
	};

	return (
		// biome-ignore lint/a11y/useSemanticElements: I need to have the gridcells indexed so that I can count them
		// biome-ignore lint/a11y/useFocusableInteractive: For now, I am ok with it not being interactive
		<span role="gridcell" className={getTileClassName(children)}>
			{children === 0 ? "" : children}
		</span>
	);
};

export default Board;
