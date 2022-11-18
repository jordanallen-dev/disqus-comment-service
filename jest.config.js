module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  globalSetup: "./global-setup.ts",
};
