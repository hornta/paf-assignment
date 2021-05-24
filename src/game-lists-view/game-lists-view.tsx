import type { GameLists } from "../types";
import "./game-lists-view.css";
import type { AriaAttributes } from "react";
import { GameListItemView } from "../game-list-item-view/game-list-item-view";

interface GameListsViewProps extends AriaAttributes {
	lists: GameLists;
}

export const GameListsView = ({ lists, ...props }: GameListsViewProps) => (
	<section className="game-lists-view" {...props}>
		<header>
			<h1>{lists.title}</h1>
		</header>
		<p>{lists.description}</p>
		<ul>
			{lists.lists.map((listItem) => (
				<li key={listItem.id}>
					<h2>{listItem.title}</h2>
					<ul className="game-item-list">
						{listItem.items.map((item) => (
							<li key={item.id}>
								<GameListItemView item={item} />
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	</section>
);
