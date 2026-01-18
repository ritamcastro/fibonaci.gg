const Board = () => {
	// const ncols: number = 4;
	// const nrows: number = 4;

	const gameArea: number[][] = [
		[2, 1, 2048, 0],
		[5, 3, 0, 0],
		[0, 8, 0, 0],
		[0, 21, 0, 0],
	];

	return (
		<div>
			{gameArea.map((row, rowIndex) => {
				// return <p key={index}>{row}</p>;
				return <Line row={rowIndex}>{row}</Line>;
			})}
		</div>
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
		<span
			style={{
				display: "flex",
				border: "solid 2px purple",
				width: "48px",
				height: "48px",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{children}
		</span>
	);
};

export default Board;
