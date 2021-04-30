
        const TerserPlugin = require('terser-webpack-plugin');
        const Dotenv = require('dotenv-webpack');
        const path = require('path');

        module.exports = {
        optimization: {
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
                mangle: true,
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
        },
        cache: false,
        mode: 'production',
        entry: './_Modules/Sidebar/index.js',
        output: {
            path: path.resolve(__dirname, '../Sidebar'),
            filename: 'index.js',
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    include: path.resolve(__dirname, '**/*'),
                    exclude: /(node_modules|bower_components|public|production.js|_Sass)/,
                    use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                    }
                },
                {
                    test: /.scss$/,
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