import { useLogoSize } from "./game-logo-helpers";
import "./game-logo.css";

interface GameLogoProps {
	src: string;
	alt: string;
}

export const GameLogo = ({ src, alt }: GameLogoProps) => {
	const size = useLogoSize();

	return (
		<div className="game-logo" style={{ width: size, height: size }}>
			<img src={src} alt={alt} loading="lazy" width="160" height="160" />
		</div>
	);
};
