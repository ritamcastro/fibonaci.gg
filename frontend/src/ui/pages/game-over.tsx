import tilesPyramid from "../../assets/game-over.svg";
import Button from "../atoms/button";
import Modal from "../templates/modal";

const GameOver = ({ onClose }: { onClose: () => void }) => {
	return (
		<Modal
			title={"Oh no..."}
			isOpen={true}
			onClose={onClose}
			cta={
				<Button variant="primary" onClick={onClose}>
					New Game
				</Button>
			}
		>
			<img
				src={tilesPyramid}
				aria-label="Tiles piled up in a messy way."
				style={{ width: window.innerWidth < 480 ? "100%" : "85%" }}
			/>
			No more moves available... <br /> Better luck next time!
		</Modal>
	);
};

export default GameOver;
