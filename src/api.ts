import type { GameLists } from "./types";

export const fetchLists = async (): Promise<GameLists> => {
	const response = await fetch("/api/games/lists.json");
	const data = (await response.json()) as Promise<GameLists>;
	return data;
};
