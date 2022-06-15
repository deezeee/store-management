const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfigBuilder = require('./webpack.config.js');

const cmdOption = process.argv.slice(2)[0];

if (cmdOption == 'start') {
    const webpackConfig = webpackConfigBuilder(env='development');

    const compiler = webpack(webpackConfig);
    const devServerOptions = {...webpackConfig.devServer, open: true};
    const server = new webpackDevServer(devServerOptions, compiler);
    
    server.startCallback(() => {
        console.log(`Server started on http://localhost:${devServerOptions.port}`);
    });
}

if (cmdOption === 'build') {
    const webpackConfig = webpackConfigBuilder(env='production');
    webpackConfig.devServer = {};

    webpack(webpackConfig).run((err, stats) => {
        console.log('Webpack build done');
    });
}
