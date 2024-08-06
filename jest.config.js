module.exports = {
    verbose: true,
    testEnvironment: 'node',
    coverageReporters: ['json-summary', 'lcov'],
    testPathIgnorePatterns: ['/frontend/'],
    setupFiles: ['./jest.init.js'],
    testMatch: [
        '**/test/**/*.spec.[jt]s?(x)',
        '!**/test/global/**/*.[jt]s?(x)'
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
        '!**/test/**',
        '!**/jest.config.js',
        '!**/index.js',
        "!**/coverage/**",
        "!**/coverage_output.js/**",
        "!**/coverage_output.json/**",
        "!**/start-dev.js"
    ],
    bail: true
};