/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testMatch: [__dirname + '/tests/**'],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};