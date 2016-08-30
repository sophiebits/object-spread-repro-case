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
};
