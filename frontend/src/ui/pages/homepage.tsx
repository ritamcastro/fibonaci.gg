import { useState } from "react";
import useBoard from "../../hooks/use-board";
import useKeyboard from "../../hooks/use-keyboard";
import Button from "../atoms/button";
import Link from "../atoms/link";
import Board from "../templates/board";
import "./homepage.css";

const Homepage = () => {
	const { board, newBoard, move } = useBoard();
	const [isGameOver, setIsGameOver] = useState(false);

	const handleNewGame = () => {
		newBoard();
		setIsGameOver(false);
	};

	useKeyboard({
		onMove: move,
		onGameOver: () => setIsGameOver(true),
	});

	return (
		<section className="homepage">
			<span className="instructions">
				Use your keyboard to move the tiles and merge them following the{" "}
				<Link url="https://en.wikipedia.org/wiki/Fibonacci_sequence">
					Fibonacci sequence
				</Link>
				.
			</span>
			{isGameOver && (
				<div>
					<p>Game Over!</p>
				</div>
			)}
			<Button variant="primary" onClick={handleNewGame}>
				New Game
			</Button>

			<Board gameArea={board} />
		</section>
	);
};
export default Homepage;
