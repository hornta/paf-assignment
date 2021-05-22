import { render, screen } from "@testing-library/react";
import { App } from "./app";
import userEvent from "@testing-library/user-event";
import type { GameLists } from "../types.js";

describe("<App>", () => {
	it("inform user the games are currently loading", () => {
		render(<App />);
		screen.getByText("Loading lists...");
	});

	// test("inform users about the games failing to load");
	// test("renders filter result information", () => {
	// 	const mockedResponse: GameLists = {
	// 		title: "",
	// 		description: "",
	// 	};
	// 	render(<App />);
	// 	userEvent.type(screen.getByRole("searchbox"), "cat");
	// 	userEvent.click(screen.getByRole("button"));
	// });
});
