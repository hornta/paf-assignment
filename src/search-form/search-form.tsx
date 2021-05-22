import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import {
	handleFocus,
	searchTermUrl,
	setInitialSearchTerm,
	useSearchHistory,
} from "./search-form-helpers";
import "./search-form.css";
import { Button, ButtonSize } from "../button/button";

interface SearchFormProps {
	onSearch: (searchTerm: string) => void;
	className: string;
}

export const SearchForm = ({ onSearch, className }: SearchFormProps) => {
	const [searchTerm, setSearchTerm] = useState(setInitialSearchTerm);

	useEffect(() => {
		if (searchTerm) {
			onSearch(searchTerm);
		}
		// perform initial search
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [searchHistory, addToHistory] = useSearchHistory();
	const doSearch = () => {
		onSearch(searchTerm);
		addToHistory(searchTerm);

		const searchParams = new URLSearchParams(location.search);
		if (searchParams.get(searchTermUrl) !== searchTerm) {
			searchParams.set(searchTermUrl, searchTerm);
			history.replaceState(null, "", `?${searchParams.toString()}`);
		}
	};

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		doSearch();
	};

	const handleChange = (event: FormEvent<HTMLInputElement>): void => {
		setSearchTerm(event.currentTarget.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === "Enter") {
			event.currentTarget.blur();
			doSearch();
		}
	};

	return (
		<form role="search" className={className} onSubmit={handleSearch}>
			<label htmlFor="search-input">Search items</label>
			<input
				id="search-input"
				type="search"
				autoComplete="off"
				role="searchbox"
				required
				list="search-history"
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onChange={handleChange}
				value={searchTerm}
			/>
			<datalist id="search-history">
				{searchHistory.map((searchTerm, index) => (
					<option key={index} value={searchTerm}></option>
				))}
			</datalist>
			<Button type="submit" size={ButtonSize.LARGE}>
				Search
			</Button>
		</form>
	);
};
