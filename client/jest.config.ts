import type { Config } from "jest"

const esModules = ["nanoid"].join("|")

const config: Config = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleDirectories: [
    "node_modules",
    "src", // Replace 'src' with the path you store your components in
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  preset: "ts-jest",
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^nanoid(/(.*)|$)": "nanoid$1",
  },
  transform: {
    "^.+\\.[jt]sx?$": ["ts-jest", {}],
  },

  globals: {
    "ts-jest": {
      babelConfig: ".babelrc",
    },
  },
}

export default config
