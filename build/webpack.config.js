const path = require('path')
const webpack = require('webpack')
const userConfig = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const outPath = userConfig.outPath
const srcPath = userConfig.srcPath
const publicPathJoinName = userConfig.publicPathJoinName
const publicPathName = userConfig.publicPathName
const jsOutJoinPathName = userConfig.jsOutJoinPathName
const assetsSubDirectory = path.posix.join(publicPathJoinName, userConfig.assetsDir)

const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    entry: {
        'zero-tree': [path.resolve(__dirname, '../src/index.js')],
    },
    output: {
        // 设置输出文件夹来自配置
        path: outPath,
        // 设置所有输出文件的挂载url
        publicPath: publicPathName,
        library: "ZeroTree",
        libraryTarget: 'umd2',
        // 设置输出文件路径及名字组成
        filename: path.posix.join(publicPathJoinName, jsOutJoinPathName, isProd ? '[name].min.js': '[name].js'),
    },
    // 设置开启sourcemap
    devtool: '#source-map',
    resolve: {
        alias: {
            // 设置别名
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(srcPath, './')
        },
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue']
    },
    // 初始化插件为空数组
    plugins: [
    ],
    // 加载器的设置
    module: {
        // 加载器设置
        rules: [
            {
                test: /\.(js|vue)/,
                use: 'eslint-loader',
                enforce: 'pre',
                include: [srcPath],
                exclude: /node_modules/
            },
            {
                test: /\.vue/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        extractCSS: isProd
                    }
                }
            }, {
                test: /\.js/,
                use: 'babel-loader',
                include: [srcPath],
                exclude: /node_modules/
            }, {
                test: /\.json/,
                use: 'json-loader'
            }
        ]
    }
}
// 设置开发和部署时的配置却别
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new ExtractTextPlugin({
                filename: 'zero-tree.min.css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}
if (process.env.ANALY === 'dev') {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    module.exports.plugins.push(
        new BundleAnalyzerPlugin()
    )
}
