import useBoard from "../../hooks/use-board";
import useKeyboard from "../../hooks/use-keyboard";
import Button from "../atoms/button";
import Board from "../templates/board";
import "./homepage.css";

const Homepage = () => {
	const { board, newBoard, move } = useBoard();

	useKeyboard(move);

	return (
		<section className="homepage">
			<Button variant="primary" onClick={() => newBoard()}>
				New Game
			</Button>

			<Board gameArea={board} />
		</section>
	);
};
export default Homepage;
