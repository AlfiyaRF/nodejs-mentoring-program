module.exports = {
  testEnvironment: 'node',
  roots: ['./src/module4'],
  preset: 'ts-jest',
  silent: false,
  verbose: true,
  collectCoverageFrom: ['src/module4/**'],
  coverageReporters: ['text']
};
