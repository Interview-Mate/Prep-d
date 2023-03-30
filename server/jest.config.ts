import type {Config} from "jest";

const config: Config = {
  verbose: true,
  //   collectCoverage: true,
  //  coverageDirectory: "coverage",
  "preset": "ts-jest",
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "node_modules",
    "./src"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
  //   "json",
  //   "node"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },

  testMatch : [
    "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    // "/node_modules/",
    // "\\.pnp\\.[^\\/]+$",
    "node_modules/(?!variables/.*)"
  ],

  // Whether to use watchman for file crawling
  // watchman: true,
};

export default config;

