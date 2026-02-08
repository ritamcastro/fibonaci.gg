import { useState } from "react";
import useBoard from "../../hooks/use-board";
import useKeyboard from "../../hooks/use-keyboard";
import Button from "../atoms/button";
import Link from "../atoms/link";
import Board from "../templates/board";
import "./homepage.css";
import GameOver from "./game-over";
import useSwipe from "../../hooks/use-swipe";

const Homepage = () => {
	const { board, newBoard, move } = useBoard();
	const [isGameOver, setIsGameOver] = useState(false);

	const handleNewGame = () => {
		newBoard();
		setIsGameOver(false);
	};

	const handleGameOver = () => {
		setIsGameOver(false);
		newBoard();
	};

	useKeyboard({
		onMove: move,
		onGameOver: () => setIsGameOver(true),
	});

	useSwipe({ onMove: move, onGameOver: () => setIsGameOver(true) });

	// defaults to desktop
	let instructions = "Use your keyboard";

	const width = window.innerWidth;
	if (width > 0 && width <= 480) {
		instructions = "Swipe in the screen";
	}
	if (width > 481 && width <= 768) {
		instructions = "Swipe in the screen or use the keyboard";
	}

	return (
		<section className="homepage">
			<span className="instructions">
				{instructions} to move the tiles and merge them following the{" "}
				<Link url="https://en.wikipedia.org/wiki/Fibonacci_sequence">
					Fibonacci sequence
				</Link>
				.
			</span>
			{isGameOver && <GameOver onClose={() => handleGameOver()} />}
			<Button variant="primary" onClick={handleNewGame}>
				New Game
			</Button>

			<Board gameArea={board} />
		</section>
	);
};
export default Homepage;
