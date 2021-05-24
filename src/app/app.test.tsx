import { render, screen } from "@testing-library/react";
import { App } from "./app";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../test/server";

describe("<App>", () => {
	it("inform user the games are currently loading", async () => {
		expect.assertions(1);
		render(<App />);
		expect(await screen.findByText("Loading lists...")).toBeVisible();
	});

	it("inform users about the games failing to load", async () => {
		expect.assertions(1);
		server.use(
			rest.get("/api/games/lists.json", async (req, res, ctx) =>
				res(ctx.status(500))
			)
		);
		render(<App />);
		expect(await screen.findByText("Failed to load lists")).toBeVisible();
	});

	it("should filter items and inform users how many result the term yielded", async () => {
		expect.assertions(2);
		const searchTerm = "ca";
		const expectedResults = 9;
		render(<App />);
		userEvent.type(screen.getByRole("searchbox"), searchTerm);
		userEvent.click(screen.getByRole("button"));
		expect(await screen.findAllByTestId("game")).toHaveLength(expectedResults);
		expect(await screen.findByTestId("filter-result")).toBeVisible();
	});

	it("should be able to clear the filter", async () => {
		expect.assertions(2);
		render(<App />);
		userEvent.type(screen.getByRole("searchbox"), "ca");
		userEvent.click(screen.getByRole("button", { name: "Search" }));
		expect(await screen.findByTestId("filter-result")).toBeVisible();
		userEvent.click(screen.getByRole("button", { name: "Clear filter" }));
		expect(screen.queryByTestId("filter-result")).not.toBeInTheDocument();
	});
});
