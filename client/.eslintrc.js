module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    node: true,
    es6: true,
    jest: true,
    browser: true,
  },
  // prettier should be last so that it overrides all other configs, basically saying, don't error on whatever you've got configured for prettier
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'warn', // in combination with plugins: ['prettier'] will show prettier conflicts (you might have to reload the window after you've made changes to .prettierrc)
    'no-shadow': 'off',
    'consistent-return': 'off',
    'arrow-body-style': ['off', 'as-needed'],
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'import/named': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }], // Allow functions to be declared after being called, but only if they're hoisted
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'], // Basically just remove restricting ForOfStatement from Airbnb defaults
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // React specific rules
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['public'],
}
