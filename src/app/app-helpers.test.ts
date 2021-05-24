import { countItemsInLists } from "./app-helpers";

describe("countItemsInLists", () => {
	it("counts one empty list", () => {
		expect.assertions(3);

		expect(
			countItemsInLists({
				description: "",
				title: "",
				lists: [
					{
						id: "",
						title: "",
						items: [],
					},
				],
			})
		).toBe(0);

		expect(
			countItemsInLists({
				description: "",
				title: "",
				lists: [
					{
						id: "",
						title: "",
						items: [
							{ id: 1, image: "", provider: "", title: "" },
							{ id: 2, image: "", provider: "", title: "" },
						],
					},
				],
			})
		).toBe(2);

		expect(
			countItemsInLists({
				description: "",
				title: "",
				lists: [
					{
						id: "",
						title: "",
						items: [
							{ id: 1, image: "", provider: "", title: "" },
							{ id: 2, image: "", provider: "", title: "" },
						],
					},
					{
						id: "",
						title: "",
						items: [
							{ id: 3, image: "", provider: "", title: "" },
							{ id: 4, image: "", provider: "", title: "" },
						],
					},
				],
			})
		).toBe(4);
	});
});
