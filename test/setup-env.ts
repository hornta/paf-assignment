import { server } from "./server";
import "@testing-library/jest-dom";
import "whatwg-fetch";
import "./match-media.ts";

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
