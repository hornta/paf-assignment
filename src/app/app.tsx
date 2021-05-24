import { useEffect, useReducer } from "react";
import { fetchLists } from "../api";
import { SearchForm } from "../search-form/search-form";
import { GameListsView } from "../game-lists-view/game-lists-view";
import { countItemsInLists, createMsg } from "./app-helpers";
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
	status: LoadingStatus.INITIAL,
};

export const App = () => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		let isCanceled = false;
		const fetch = async () => {
			dispatch(makeAction(ActionType.PENDING));
			try {
				const data = await fetchLists();
				if (!isCanceled) {
					dispatch(makeAction(ActionType.FULFILLED, data));
				}
			} catch (e) {
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
		dispatch(
			makeAction(ActionType.FILTER, {
				filteredData: [],
				filterTerm,
			})
		);
	};

	return (
		<>
			<SearchForm className="search-form" onSearch={handleSearch} />

			{state.filterTerm && state.status === LoadingStatus.FULFILLED && (
				<span data-testid="filter-result">
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
				</span>
			)}

			<section
				aria-live="polite"
				aria-busy={state.status === LoadingStatus.PENDING}
			>
				{state.status === LoadingStatus.PENDING ? (
					<span>Loading lists...</span>
				) : state.status === LoadingStatus.REJECTED ? (
					<span>Failed to load lists</span>
				) : state.status === LoadingStatus.FULFILLED ? (
					<GameListsView
						lists={state.filterTerm ? state.filteredData : state.originalData}
					/>
				) : null}
			</section>
		</>
	);
};
