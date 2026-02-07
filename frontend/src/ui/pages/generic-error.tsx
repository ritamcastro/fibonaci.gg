import { Link } from "react-router";
import spiral from "../../assets/outwards-spiral.svg";
import "./generic-error.css";

const GenericError = () => {
	return (
		<div className="generic-error">
			<img src={spiral} aria-label="A fibonacci spiral..." />
			<p>Well this is embarassing....</p>
			<p>Wanna try again?</p>
			<Link to="/">Back to the start!</Link>
		</div>
	);
};

export default GenericError;
