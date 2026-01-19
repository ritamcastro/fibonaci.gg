import Board from "../templates/board";
import useBoard from "../../hooks/use-board";

const Homepage = () => {
	const { board, newBoard } = useBoard();

	return (
		<div style={{ border: "solid 1px pink" }}>
			<button type="button" onClick={() => newBoard()}>
				New game
			</button>
			<Board gameArea={board} />
		</div>
	);
};
export default Homepage;
