import type { GameListItem } from "../types";
import { GameLogo } from "../game-logo/game-logo";
import "./game-list-item-view.css";

interface GameListItemViewProps {
	item: GameListItem;
}

export const GameListItemView = ({ item }: GameListItemViewProps) => (
	<article className="game-list-item" data-testid="game">
		<GameLogo src={item.image} alt={`${item.title} by ${item.provider}`} />
		<header>{item.title}</header>
	</article>
);
