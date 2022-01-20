module.exports = {
  extends: 'rollupx/babel.config.js',
  exclude: 'node_modules/**',
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ['@babel/plugin-proposal-export-default-from']
  ]
};
