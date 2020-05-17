module.exports = {
  outputDir: './dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:' + require('../server/src/config').default.port,
      },
    },
  },
  publicPath: '/',
};
