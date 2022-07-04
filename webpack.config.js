const path = require('path');
const _ = require('lodash')

module.exports={
    mode: 'development',
    entry: './src/index.ts',
    output:{
        path: path.resolve(__dirname, 'dist' ),
        filename: 'main.bundle.js',
    },
    module:{
        rules:[
            {test: /\.txt?/ , use: 'raw-loader'},

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },

            //   {
            //     test: /\.css$/i,
            //     use: ["style-loader", "css-loader"],
            //   },

              {
                test: /\.css$/i,
                use:[{loader: 'style-loader'} ,{
                    loader: 'css-loader',
                    options: {
                        url: true,
                      },
                }]
              }


        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
}