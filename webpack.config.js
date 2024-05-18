/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
//@ts-check
'use strict';
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const desktopExtensionConfig = {
    target: 'node',
    mode: 'development',
    entry: './src/extension-desktop.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension-desktop.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode',
        '@onegl/glsl-imports': 'commonjs @onegl/glsl-imports',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
        fallback: {
            '@onegl/glsl-imports': path.resolve(__dirname, 'node_modules/@onegl/glsl-imports'),
            '@onegl/glsl-parser': path.resolve(__dirname, 'node_modules/@onegl/glsl-parser'),
            '@onegl/glsl-parser/ast': path.resolve(__dirname, 'node_modules/@onegl/glsl-parser/ast'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
};

/** @type WebpackConfig */
const webExtensionConfig = {
    target: 'webworker',
    mode: 'none',
    entry: './src/extension-web.ts',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'extension-web.js',
        libraryTarget: 'commonjs',
        devtoolModuleFilenameTemplate: '../../[resource-path]',
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode',
        '@onegl/glsl-imports': 'commonjs @onegl/glsl-imports',
    },
    resolve: {
        mainFields: ['module', 'main'],
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
        fallback: {
            assert: require.resolve('assert'),
            '@onegl/glsl-imports': path.resolve(__dirname, 'node_modules/@onegl/glsl-imports'),
            '@onegl/glsl-parser': path.resolve(__dirname, 'node_modules/@onegl/glsl-parser'),
            '@onegl/glsl-parser/ast': path.resolve(__dirname, 'node_modules/@onegl/glsl-parser/ast'),
            path: false,
            fs: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    performance: {
        hints: false,
    },
};

module.exports = [desktopExtensionConfig, webExtensionConfig];
