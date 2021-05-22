import { useLayoutEffect, useState } from "react";

export const useMediaQuery = (queryInput: string) => {
	const query = queryInput.replace(/^@media( ?)/m, "");
	const [match, setMatch] = useState(() => matchMedia(query).matches);
	useLayoutEffect(() => {
		const queryList = matchMedia(query);

		const updateMatch = () => {
			setMatch(queryList.matches);
		};

		updateMatch();
		queryList.addListener(updateMatch);
		return () => {
			queryList.removeListener(updateMatch);
		};
	}, [query]);
	return match;
};

const offsetHack = 0.02;

export enum Breakpoint {
	EXTRA_SMALL = 0,
	SMALL = 576 - offsetHack,
	MEDIUM = 768 - offsetHack,
	LARGE = 992 - offsetHack,
	EXTRA_LARGE = 1200 - offsetHack,
}

export const up = (breakpoint: Breakpoint) =>
	`@media (min-width:${breakpoint}px)`;

export const down = (breakpoint: Breakpoint) =>
	`@media (max-width:${breakpoint}px)`;

export const between = (
	smallerBreakpoint: Breakpoint,
	largerBreakpoint: Breakpoint
) =>
	`@media (min-width:${smallerBreakpoint}px) and (max-width:${largerBreakpoint}px)`;
