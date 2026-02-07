import Modal from "../templates/modal";
import Button from "../atoms/button";
import tilesPyramid from "../../assets/game-over.svg";

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
				style={{ width: "50%" }}
			/>
			No more moves available... <br /> Better luck next time!
		</Modal>
	);
};

export default GameOver;
