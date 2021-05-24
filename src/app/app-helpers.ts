import type { GameLists } from "../types";

// https://medium.com/hackernoon/finally-the-typescript-redux-hooks-events-blog-you-were-looking-for-c4663d823b01
// probably better to use something complete like @reduxjs/toolkit

export const createMsg = <Obj extends { [index: string]: any }>() =>
	function <Key extends keyof Obj>(
		name: Key,
		...args: Obj[Key] extends undefined ? [] : [Obj[Key]]
	) {
		if (args.length > 0) {
			return { type: name, payload: args[0] };
		}
		return { type: name };
	};

export type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload: M[Key];
		  };
};

export const countItemsInLists = (lists: GameLists): number =>
	lists.lists
		.map((list) => list.items.length)
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
