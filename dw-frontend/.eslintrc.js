module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'no-unused-expressions': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/jsx-one-expression-per-line': 'off',
    'no-param-reassing': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-constructed-context-values': 'off', // consider the use of useMemo()
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
