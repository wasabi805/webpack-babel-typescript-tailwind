# Set Up TypeScriptLoader | ts-loader

First make sure that typescript is set up and installed: [see the README.md](https://github.com/wasabi805/typeScript-playground)

After setting up Typescript,
if you were to compile typescript (ie, npm run typescript) and also after building weback (ie, npm run webpack)
you might see this error:

- you'll see that if you convert any other other file than index.ts, from `someFile.js` to `someFile.ts`, you'll get an error like:
  ![set up](./src/images/webpack-error-1.png?raw=true "Optional Title")

This is because we will need to configure a loader in webpack to understand how to compile js, ts, and tsx file extentions so that webpack can compress and bundle all our js,ts, and tsx files that will get injected into our main index.html. Similarly, other files and resorces such as style tags, css files, sass files, image files, etc., will need an appropriate loader configuration within webpack.

Continuing below are the steps needed to configure webpack to use ts-loader. These steps provided reference webpack's documentaion for [adding TypeScript Loaders](https://webpack.js.org/guides/typescript/) but the same thought process applies to other resources used in our html.

# Install ts-loader

- 1.) Install TypeScript Loaders.

  npm install --save-dev typescript ts-loader

- 2.) Configure tsconfig.json.

      {
        "compilerOptions": {
        "outDir": "dist",
        "module": "es6",
        "target": "es5",
        "jsx": "react", //only include this for react project
        "allowJs": true,
        "moduleResolution": "node"
        }
        }

- 3.) Add ts-loader to the rules array within webpack.config.js and update extensions array for tsx, ts, and js extentions.
  //Inside webpack.config.js

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
          ]
      },
      resolve: {
          extensions: ['.tsx', '.ts', '.js'],
        },
      }

- 4. Compile TypeScript and build webpack by running the scripts in package.json.

## Setting Up Webpack, To Get Started ...

Core Concepts: go throught this page to have a minimal set up for webpack.config.js | [core concepts](https://webpack.js.org/concepts/#entry)

Basic Set up : this will walk you through the bundling process to have the html page you'll move from src into dist load in the browser |
[basic set up](https://webpack.js.org/guides/typescript/)

Note: in the the Basic Set up section, if lodash isn't working for you, use javascript join() instead.
You'll still need to npm install lodash --save-dev.
Continue through the docs and by the end, you should be able to have webpack recognize lodash from the node_modules by the end.

## Adding TypeScript

- added typescript first
