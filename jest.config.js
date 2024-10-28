module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testTimeout: 30000, // Optional: Set a timeout for Selenium tests (in ms)
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    testPathIgnorePatterns: [
      "/node_modules/"
    ]
  };
  