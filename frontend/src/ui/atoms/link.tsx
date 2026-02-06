import "./link.css";
const Link = ({ url, children }: { url: string; children: string }) => {
	return <a href={url}>{children}</a>;
};

export default Link;
