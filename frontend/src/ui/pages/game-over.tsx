import Modal from "../templates/modal";
import Button from "../atoms/button";

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
			No more moves available... <br /> Better luck next time!
		</Modal>
	);
};

export default GameOver;
