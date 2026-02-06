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
	return (
		// biome-ignore lint/a11y/useSemanticElements: I need to have the gridcells indexed so that I can count them
		// biome-ignore lint/a11y/useFocusableInteractive: For now, I am ok with it not being interactive
		<span role="gridcell" className="tile">
			{children === 0 ? "" : children}
		</span>
	);
};

export default Board;
