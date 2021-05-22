import type { GameListItem } from "../types";
import { GameLogo } from "../game-logo/game-logo";
import "./game-list-item.css";

interface GameListItemProps {
	item: GameListItem;
}

export const GameListItem = ({ item }: GameListItemProps) => (
	<article className="game-list-item">
		<GameLogo src={item.image} alt={`${item.title} by ${item.provider}`} />
		<header>{item.title}</header>
	</article>
);
