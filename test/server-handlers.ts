import { rest } from "msw";
import lists from "../api/games/lists.json";

export const handlers = [
	rest.get("/api/games/lists.json", async (req, res, ctx) =>
		res(ctx.json(lists))
	),
];
