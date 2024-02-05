module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript'],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '~': './'
        },
        extensions: ['.js', '.jsx']
      }
    }
  },
  rules: {
    'space-before-function-paren': 'off'
  }
}
