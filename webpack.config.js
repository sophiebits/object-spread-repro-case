const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
    entry: {
        main: './index.js',
    },
    output: {
        path: 'dist',
        filename: 'bundle.js',
        libraryTarget: 'umd',
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
        ],
    },
    plugins: [
        // This is what I actually use to generate my site. If you want a
        // "purer" repro case, replace this with `new EvalWhenDonePlugin()`.
        new StaticSiteGeneratorPlugin('main', '/', {}),
    ],
};

function EvalWhenDonePlugin() {}
EvalWhenDonePlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compiler, done) {
        const filename = 'bundle.js';
        const source = compiler.assets[filename].source();
        const scope = null;
        const includeGlobals = true;

        console.log(">>> Evaluating bundle.");
        const demo = require("eval")(source, filename, scope, includeGlobals);

        console.log(">>> Running demo script.");
        demo['default']();

        done();
    });
}
