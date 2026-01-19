const Board = ({ gameArea }: { gameArea: number[][] }) => {
	return (
		<section aria-label="Game board">
			{gameArea.map((row, rowIndex) => {
				// return <p key={index}>{row}</p>;
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
		<div style={{ display: "flex" }}>
			{children.map((col, index) => {
				return <Square key={`${row}x${index}`}>{col}</Square>;
			})}
		</div>
	);
};

const Square = ({ children }: { children: number }) => {
	return (
		// biome-ignore lint/a11y/useFocusableInteractive: <explanation>
		<span
			// biome-ignore lint/a11y/useSemanticElements: <explanation>
			role="gridcell"
			style={{
				display: "flex",
				border: "solid 2px purple",
				width: "48px",
				height: "48px",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{children === 0 ? "" : children}
		</span>
	);
};

export default Board;
