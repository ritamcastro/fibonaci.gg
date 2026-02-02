import useBoard from "../../hooks/use-board";
import useKeyboard from "../../hooks/use-keyboard";
import Board from "../templates/board";

const Homepage = () => {
	const { board, newBoard, move } = useBoard();

	useKeyboard(move);

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
