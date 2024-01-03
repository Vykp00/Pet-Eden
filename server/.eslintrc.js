module.exports = {
  env: {
    browser: true,
    es2016: true,
    node: true,
    jest: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Ignore for error:any handling. Will define Error Class later
    'prefer-const': [
      'warning', // Ignore "let" warning for Redis Session
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
  },
}
