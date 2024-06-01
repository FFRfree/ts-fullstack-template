
/** @type {import('webpack').Configuration} */
module.exports = {
  // entry: 'src/index.js',
  // output: {
  //   path: 'dist'
  // },
  module: {
    rules: [
      {
        test: /antd\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'less-loader', options: { lessOptions: { modifyVars: { '@app-prefix': 'your-app-title-' }, javascriptEnabled: true } } },
        ],
      },
    ],
  },
};