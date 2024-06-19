import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Specifies that Jest should use JSDOM for testing environment
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Corrected path to your setupTests file
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript/TSX files
        '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript/JSX files
    },
    moduleNameMapper: {
        // Mocks file imports for Jest
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy', // Mocks CSS/LESS imports
    },
    transformIgnorePatterns: [
        '/node_modules/', // Ignore transformations for node_modules
    ],
    verbose: true,
};

export default config;
