import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "./search-form";
import { searchTermUrl } from "./search-form-helpers";

const isTextSelected = (input: HTMLInputElement) => {
	if (typeof input.selectionStart == "number") {
		return (
			input.selectionStart == 0 && input.selectionEnd == input.value.length
		);
	}
};

describe("<SearchForm>", () => {
	it("perform a search when pressing the enter key", () => {
		expect.assertions(1);
		const onSearch = jest.fn();
		render(<SearchForm onSearch={onSearch} />);
		const query = "what's the meaning of life?";
		userEvent.type(screen.getByRole("searchbox"), `${query}{enter}`);
		expect(onSearch).toHaveBeenCalledWith(query);
	});

	it("perform a search when clicking the search submit button", () => {
		expect.assertions(1);
		const onSearch = jest.fn();
		render(<SearchForm onSearch={onSearch} />);
		const query = "comedy is a place where the mind goes to tickle itself";
		userEvent.type(screen.getByRole("searchbox"), query);
		userEvent.click(screen.getByRole("button", { name: /search/i }));
		expect(onSearch).toHaveBeenCalledWith(query);
	});

	it("performs an initial search when url contains a search query", () => {
		expect.assertions(1);
		const onSearch = jest.fn();
		const query = "foo";

		// there's probably a more elegant way of mocking the location
		// because new URL doesn't conform to the Location interface
		delete window.location;
		window.location = new URL(`https://example.com?${searchTermUrl}=${query}`);
		render(<SearchForm onSearch={onSearch} />);
		expect(onSearch).toHaveBeenCalledWith(query);
	});

	it("should fill the searchbox with search query from url", () => {
		expect.assertions(1);
		const query = "computermonitor";
		delete window.location;
		window.location = new URL(`https://example.com?${searchTermUrl}=${query}`);
		render(<SearchForm onSearch={jest.fn()} />);
		expect(screen.getByRole("searchbox")).toHaveValue(query);
	});

	// jsdom doesn't mock history.replaceState
	// find a way to mock these or even better a way to run tests in a browser
	it.skip("adds the search term in the url upon searching", () => {
		expect.assertions(2);
		expect(window.location.search).not.toContain(searchTermUrl);
		render(<SearchForm onSearch={jest.fn()} />);
		userEvent.type(screen.getByRole("searchbox"), "nocco{enter}");
		expect(location.search).toContain(searchTermUrl);
	});

	it("select the contents of searchbox upon receiving focus", () => {
		expect.assertions(1);
		render(<SearchForm onSearch={jest.fn()} />);
		const searchbox = screen.getByRole("searchbox");
		fireEvent.focus(searchbox);

		// consider extracting to a matcher .toBeHighlighted() or something
		expect(isTextSelected(searchbox as HTMLInputElement)).toBe(true);
	});
});
