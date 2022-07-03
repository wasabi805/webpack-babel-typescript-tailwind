const path = require('path');
const _ = require('lodash')

module.exports={
    mode: 'development',
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist' ),
        filename: 'main.bundle.js',
    },
    module:{
        rules:[
            {test: /\.txt?/ , use: 'raw-loader'},
        ]
    }
}