// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  overrides: [
    {
      // Tests
      files: ['**/__tests__/**/*.jsx?', '**/?(*.)+(spec|test).jsx?'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
