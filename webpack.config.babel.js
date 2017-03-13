export default {
    entry: {
        "./index": "./src/js/index.jsx"
    },
    output: {
        path: "./docs",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: `babel-loader`,
                query: {
                    presets: [`es2015`, `stage-0`, `react`]
                }
            }
        ]
    }
}