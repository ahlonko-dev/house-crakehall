{
    test: /\.scss$/,
    include: [
       path.resolve(__dirname, 'src', 'sass')
    ],
    use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
 }


//   "name": "post",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//         "build": "webpack --mode production",
//         "dev": "webpack --mode development"
//     },
//     "author": "",
//     "license": "ISC",
//     "devDependencies": {
//         "autoprefixer": "^8.2.0",
//         "babel-core": "^6.26.0",
//         "babel-loader": "^7.1.4",
//         "babel-preset-env": "^1.6.1",
//         "clean-webpack-plugin": "^0.1.19",
//         "css-loader": "^0.28.11",
//         "html-webpack-plugin": "^3.2.0",
//         "mini-css-extract-plugin": "^0.4.0",
//         "node-sass": "^4.8.3",
//         "postcss-loader": "^2.1.3",
//         "sass-loader": "^6.0.7",
//         "style-loader": "^0.20.3",
//         "webpack": "^4.4.1",
//         "webpack-cli": "^2.0.13",
//         "webpack-md5-hash": "0.0.6"
//     }
// }