import { useEffect } from "react";
import { Breakpoint, up, useMediaQuery } from "../hooks/use-media-query";

export const useLogoSize = () => {
	const small = useMediaQuery(up(Breakpoint.SMALL));
	const size = small ? 160 : 120;

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--game-image-size",
			`${size}px`
		);
	}, [size]);

	return size;
};
