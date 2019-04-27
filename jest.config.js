module.exports = {
  errorOnDeprecated: true,
  globals: {},
  moduleFileExtensions: ['vue', 'js'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  testMatch: ['**/**/*spec.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue']
};
