const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = path.resolve(__dirname, '../../public');
const faviconPath = path.resolve(publicPath, 'favicon.ico');
const indexHtmlFileName = 'index.html';
const indexHtmlPath = path.resolve(publicPath, indexHtmlFileName);

const initialDevServerInfo = {
    host: '127.0.0.1',
    port: 3000,
    watch: true,
    compress: true,
};

module.exports = (env = 'development', devServer = initialDevServerInfo) => {
    return {
        mode: env,
        entry: './index.js',
        output: {
            path: publicPath,
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env','@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['sytle-loader']
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: publicPath,
                                outputPath: publicPath
                            }
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    use: ['svg-inline-loader']
                }
            ]
        },
        infrastructureLogging: {
            level: 'none',
        },
        devServer: {
            host: devServer.host,
            static: {
                directory: publicPath,
                watch: devServer.watch
            },
            compress: devServer.compress,
            port: devServer.port,
            client: {
                logging: 'none',
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                favicon: faviconPath,
                template: indexHtmlPath,
                filename: indexHtmlFileName,
                minify: env === 'production'
            })
        ]
    };
};