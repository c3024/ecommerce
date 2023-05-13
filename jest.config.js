module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		//"^firebase$": "<rootDir>/__mocks__/firebaseMock.js",
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/$1",
	},
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
};
