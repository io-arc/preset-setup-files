module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    worker: true,
    node: true
  },
  extends: ['plugin:prettier/recommended', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        tabWidth: 2,
        singleQuote: true,
        semi: false,
        arrowParens: 'always'
      }
    ],
    eofline: 'off'
  }
}
