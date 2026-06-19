const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@api$': path.resolve(__dirname, 'src/utils/burger-api.ts'),
    '^@utils-types$': path.resolve(__dirname, 'src/utils/types.ts'),
    '^@components(.*)$': path.resolve(__dirname, 'src/components$1'),
    '^@pages(.*)$': path.resolve(__dirname, 'src/pages$1'),
    '^@ui(.*)$': path.resolve(__dirname, 'src/components/ui$1'),
    '^@ui-pages(.*)$': path.resolve(__dirname, 'src/components/ui/pages$1'),
    '^@slices(.*)$': path.resolve(__dirname, 'src/services/slices$1'),
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.css$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/cypress/']
};
