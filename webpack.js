const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const config = {
  cache: false,
  mode: '',
  entry: './source/react-revolution.ts',
  output: {
    path: path.resolve(__dirname, './'),
    filename: './public/react-revolution.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
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
    'react': 'commonjs react',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.watch = true;
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 100
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
          parallel: true,
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