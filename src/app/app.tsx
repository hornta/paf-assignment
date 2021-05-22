import { useEffect, useReducer } from "react";
import { fetchLists } from "../api";
import { SearchForm } from "../search-form/search-form";
import { GameLists } from "../types";
import { GameListsView } from "../game-lists-view/game-lists-view";
import { createMsg } from "./app-helpers";
import {
	ActionType,
	appReducer,
	AppReducerState,
	LoadingStatus,
	Messages,
} from "./app-reducer";
import { Button, ButtonVariant } from "../button/button";
import "./app.css";

const makeAction = createMsg<Messages>();

const initialState: AppReducerState = {
	status: LoadingStatus.PENDING,
};

export const App = () => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		let isCanceled = false;
		const fetch = async () => {
			try {
				const data = await fetchLists();
				if (!isCanceled) {
					dispatch(makeAction(ActionType.FULFILLED, data));
				}
			} catch {
				if (!isCanceled) {
					dispatch(makeAction(ActionType.REJECTED));
				}
			}
		};

		void fetch();

		return () => {
			isCanceled = true;
		};
	}, []);

	const handleSearch = (filterTerm: string) => {
		dispatch(makeAction(ActionType.FILTER, { filterTerm, filteredData: [] }));
	};

	return (
		<>
			<SearchForm className="search-form" onSearch={handleSearch} />

			{state.filterTerm && state.status === LoadingStatus.FULFILLED && (
				<>
					{countItemsInLists(state.filteredData)} results for{" "}
					<strong>{state.filterTerm}</strong> found |{" "}
					<Button
						variant={ButtonVariant.SECONDARY}
						onClick={() => {
							dispatch(makeAction(ActionType.CLEAR_FILTER));
						}}
					>
						Clear filter
					</Button>
				</>
			)}

			{state.status === LoadingStatus.PENDING ? (
				"Loading lists..."
			) : state.status === LoadingStatus.REJECTED ? (
				"Failed to load lists"
			) : (
				<GameListsView
					aria-live="polite"
					aria-busy={state.status === LoadingStatus.PENDING}
					lists={state.filterTerm ? state.filteredData : state.originalData}
				/>
			)}
		</>
	);
};
