import { FocusEvent, useEffect, useState } from "react";

export type SearchHistory = string[];

const historyStorageKey = "searchHistory";
export const searchTermUrl = "query";

const setInitialHistory = (): SearchHistory => {
	const history = localStorage.getItem(historyStorageKey);
	if (history === null) {
		return [];
	}

	const items = history.split(",");
	return items;
};

export const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
	event.currentTarget.select();
};

export const setInitialSearchTerm = (): string => {
	const searchParams = new URLSearchParams(location.search);
	if (searchParams.has(searchTermUrl)) {
		return searchParams.get(searchTermUrl) as string;
	}
	return "";
};

export const useSearchHistory = (): [
	SearchHistory,
	(searchTerm: string) => void
] => {
	const [searchHistory, setSearchHistory] = useState(setInitialHistory);

	const addToHistory = (searchTerm: string) => {
		setSearchHistory((currentHistory) =>
			[searchTerm, ...currentHistory].slice(0, 10)
		);
	};

	useEffect(() => {
		localStorage.setItem(historyStorageKey, searchHistory.join());
	}, [searchHistory]);

	return [searchHistory, addToHistory];
};
