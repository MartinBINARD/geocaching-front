export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  transformIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: [
    '<rootDir>/src/services',
    '<rootDir>/src/userinterface/',
    '<rootDir>/src/__tests__/data',
  ],
  moduleNameMapper: {
    setupFilesAfterEnv: ['./jest.setup.ts'],
  },
};
