module.exports = {
  'parser': '@typescript-eslint/parser', 
  'extends': [
    'plugin:@typescript-eslint/recommended',
  ],
  'rules': {
    'semi': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'quotes': ['error', 'single'],
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 2, 'unix' ],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0,
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};
