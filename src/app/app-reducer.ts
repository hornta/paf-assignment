import type { GameLists } from "../types";
import type { ActionMap } from "./app-helpers";

export enum LoadingStatus {
	INITIAL,
	PENDING,
	REJECTED,
	FULFILLED,
}

export interface AppReducerState {
	originalData?: GameLists;
	status: LoadingStatus;
	filteredData?: GameLists;
	filterTerm?: string;
}

export enum ActionType {
	PENDING,
	FULFILLED,
	REJECTED,
	FILTER,
	CLEAR_FILTER,
}

export type Messages = {
	[ActionType.PENDING]: undefined;
	[ActionType.FILTER]: { filteredData: GameLists; filterTerm: string };
	[ActionType.FULFILLED]: GameLists;
	[ActionType.REJECTED]: undefined;
	[ActionType.CLEAR_FILTER]: undefined;
};

const filterData = (term: string, data: GameLists): GameLists => {
	const filteredData: GameLists = {
		...data,
		lists: [],
	};

	for (const list of data.lists) {
		const matchingItems = [];
		for (const item of list.items) {
			const matchesTitle = item.title
				.toLowerCase()
				.includes(term.toLowerCase());
			const matchesProvider = item.provider
				.toLowerCase()
				.includes(term.toLowerCase());
			if (matchesTitle || matchesProvider) {
				matchingItems.push({ ...item });
			}
		}

		if (matchingItems.length > 0) {
			filteredData.lists.push({ ...list, items: matchingItems });
		}
	}

	return filteredData;
};

type Actions = ActionMap<Messages>[keyof ActionMap<Messages>];

export const appReducer = (
	state: AppReducerState,
	action: Actions
): AppReducerState => {
	switch (action.type) {
		case ActionType.FILTER:
			return {
				...state,
				filterTerm: action.payload.filterTerm,
				filteredData:
					state.status === LoadingStatus.FULFILLED
						? filterData(
								action.payload.filterTerm,
								state.originalData as GameLists
						  )
						: undefined,
			};
			break;
		case ActionType.PENDING:
			return {
				...state,
				status: LoadingStatus.PENDING,
			};
			break;
		case ActionType.FULFILLED:
			return {
				...state,
				originalData: action.payload,
				status: LoadingStatus.FULFILLED,
				filteredData: state.filterTerm
					? filterData(state.filterTerm, action.payload)
					: undefined,
			};
			break;
		case ActionType.REJECTED:
			return {
				...state,
				status: LoadingStatus.REJECTED,
			};
			break;
		case ActionType.CLEAR_FILTER:
			return {
				...state,
				filterTerm: undefined,
				filteredData: undefined,
			};
		default:
			return state;
	}
};
