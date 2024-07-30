module.exports = {
    verbose: true,
    testEnvironment: 'node',
    coverageReporters: ['json-summary', 'lcov'],
    globalTeardown: './__tests__/unit/global/test-teardown-globals.js',
    testPathIgnorePatterns: ['/web/'],
    setupFiles: ['./jest.init.js'],
    testMatch: [
        '**/__tests__/**/*.spec.[jt]s?(x)',
        '!**/__tests__/unit/global/**/*.[jt]s?(x)'
    ],
    moduleFileExtensions: ['js', 'json'],
    transform: {},
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    coverageDirectory: './coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.js',  // Adjust this pattern to include the files you want to be covered
        '!**/node_modules/**',
        '!**/__tests__/**',
        '!**/jest.config.js',
        '!**/index.js',
        "!**/coverage/**",
        "!**/coverage_output.js/**",
        "!**/coverage_output.json/**"
    ],
    bail: true
};