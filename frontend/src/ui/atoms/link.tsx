import "./link.css";

const Link = ({ url, children }: { url: string; children: string }) => {
	return (
		<a href={url} target="_blank" rel="noreferrer noopener">
			{children}
		</a>
	);
};

export default Link;
