import { Link } from "react-router";

const GenericError = () => {
	return (
		<div>
			<p>Well this is embarassing....</p>
			<p>Wanna try again?</p>
			<Link to="/">Back to the start!</Link>
		</div>
	);
};

export default GenericError;
