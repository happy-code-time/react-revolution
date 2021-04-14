const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const config = {
  cache: false,
  mode: '',
  entry: './production.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'react-revolution.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        resolve: {
          fullySpecified: false
        },
        exclude: /(node_modules|bower_components|public)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  },
  plugins: [
    new Dotenv(),
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.watch = true;
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 1000
    };
    config.mode = 'development';
    config.devtool = false;
    config.performance = {
      hints: 'error'
    };
    config.optimization = {
      splitChunks: {}
    };
  }

  if (argv.mode === 'production') {
    config.devtool = false;
    config.mode = 'production';
    config.performance = {
      hints: false
    };
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
          }
        }),
      ],
    }
  }

  return config;
};