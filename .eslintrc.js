module.exports = {
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  plugins: ['babel'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    quotes: ['error', 'single'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'babel/no-unused-expressions': 'error',
    'no-unused-expressions': 'off',
  },
  globals: {
    document: false,
  },
};
