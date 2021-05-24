module.exports = {
	verbose: true,
	setupFilesAfterEnv: ["<rootDir>/test/setup-env.ts"],
	moduleNameMapper: {
		"\\.css$": "<rootDir>/test/__mocks__/style-mock.js",
	},
};
