import "./board.css";

const Board = ({ gameArea }: { gameArea: number[][] }) => {
	return (
		<section className="game-area" aria-label="Game board">
			{gameArea.map((row, rowIndex) => {
				return (
					<Line key={rowIndex} row={rowIndex}>
						{row}
					</Line>
				);
			})}
		</section>
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
	return (
		// biome-ignore lint/a11y/useFocusableInteractive: <explanation>
		<span
			className="tile"
			// biome-ignore lint/a11y/useSemanticElements: <explanation>
			role="gridcell"
		>
			{children === 0 ? "" : children}
		</span>
	);
};

export default Board;
