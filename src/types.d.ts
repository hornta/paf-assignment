export interface GameListItem {
	id: number;
	title: string;
	provider: string;
	image: string;
}

export interface GameList {
	id: string;
	title: string;
	items: GameListItem[];
}

export interface GameLists {
	title: string;
	description: string;
	lists: GameList[];
}
