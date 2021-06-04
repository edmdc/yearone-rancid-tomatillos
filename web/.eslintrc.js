module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 1,
    'react/require-default-props': 0,
  },
}
