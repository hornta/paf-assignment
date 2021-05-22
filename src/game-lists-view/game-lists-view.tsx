import type { GameLists } from "../types";
import { GameLogo } from "../game-logo/game-logo";
import "./game-lists-view.css";
import type { AriaAttributes } from "react";

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
								<article>
									<GameLogo
										src={item.image}
										alt={`${item.title} by ${item.provider}`}
									/>
									<header>{item.title}</header>
								</article>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	</section>
);
