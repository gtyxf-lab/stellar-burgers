module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.css$': 'jest-css-modules-transform',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  collectCoverage: true,
  coverageDirectory: 'coverage'
};
