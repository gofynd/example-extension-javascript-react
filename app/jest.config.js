process.env.DEBUG_DEVELOPER = true;

module.exports = {
    verbose: true,
    testEnvironment: 'node',
    coverageReporters: ['json-summary', 'lcov'],
    globalTeardown: './__tests__/unit/global/test-teardown-globals.js',
    testMatch: [
        '**/__tests__/**/*.spec.[jt]s?(x)',
        '!**/__tests__/unit/global/**/*.[jt]s?(x)'
    ],
    moduleFileExtensions: ['js', 'json'],
    transform: {},
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    coverageDirectory: './../coverage/',
    collectCoverage: true,
    collectCoverageFrom: ['./server.js', '!**/node_modules/**'],
    bail: true 
};