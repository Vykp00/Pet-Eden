/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //This prevent Jest running TS test file
  testMatch: ["**/?(*.)+(spec|test).js"],
};