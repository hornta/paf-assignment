import { countItemsInLists } from "./app-helpers";

describe("countItemsInLists", () => {
	it("counts one empty list", () => {
		expect.assertions(3);

		expect(
			countItemsInLists({
				lists: [
					{
						items: [],
					},
				],
			})
		).toBe(0);

		expect(
			countItemsInLists({
				lists: [
					{
						items: [{}, {}],
					},
				],
			})
		).toBe(2);

		expect(
			countItemsInLists({
				lists: [
					{
						items: [{}, {}],
					},
					{
						items: [{}, {}],
					},
				],
			})
		).toBe(4);
	});
});
