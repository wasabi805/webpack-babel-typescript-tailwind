# About this Repository...

This repo contains a working copy of webpack configured with support for typescript via babel. The Webpack configuartion also includes loaders and support for jest, ts-loader, htmlWebpackPlugin, file-loader, url-loader, style-loader, css-loader, sass-loader, and clean-webpack-plugin.

This project was intended to document the process of configuring webpack and is intended as a guide to get up and running with using webpack on it's own or as a base to intergrate a front end framework such as React or tailwind.
It can also be used as a template or broiler plate as well.

I documented the configuration and installation at various steps, primarily as each loader or plugin was succesfully configured. This documentation isn't intended to be a definitive guide to configuring webpack rather, these were notes I took along the way on what worked for me and on some of the pitfalls that might prevent myself or another developer from getting webpack running. If there were examples in any of the offical documenation, I made sure to link them to the source.

# About the Documentaion

The README.md file in the master branch contains the entire copy of the documentaion. Each branch contains the documentation respective to the topic.

# Getting started

Just a gentile reminder, if you decide to clone this repository run:

    npm i

This will pull in all the node_module dependencies

To run Typescript:

    npm run typescript

NOTE: if npm run typescript fails, reinstall typescript.

    npm i typescript

To run prettier:

    npm run format

To bundle with webpack:

    npm run webpack

To run Jest:

    npm run test

# Setting Up Webpack, To Get Started ... | 01

Core Concepts: go throught this page to have a minimal set up for webpack.config.js | [core concepts](https://webpack.js.org/concepts/#entry)

Basic Set up : this will walk you through the bundling process to have the html page you'll move from src into dist load in the browser |
[basic set up](https://webpack.js.org/guides/typescript/)

# Set Up TypeScriptLoader | ts-loader | 02

First make sure that typescript is set up and installed: [see the README.md](https://github.com/wasabi805/typeScript-playground)

After setting up Typescript,
if you were to compile typescript (ie, npm run typescript) and also after building weback (ie, npm run webpack)
you might see this error:

If you convert any other file besides index.ts, from `someFile.js` to `someFile.ts`, you'll get an error:
![set up](./src/images/webpack-error-1.png?raw=true)

This is because we will need to configure a loader in webpack to understand how to compile js, ts, and tsx file extentions so that webpack can compress and bundle all our js,ts, and tsx files that will get injected into our main index.html. Similarly, other resources such as style tags, css files, sass files, image files, etc., will need an appropriate loader configuration within webpack.

Below are the steps needed to configure webpack to use ts-loader. These steps reference webpack's documentaion for [adding TypeScript Loaders](https://webpack.js.org/guides/typescript/) but the same thought process applies to other resources used in our html.

## Install ts-loader

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

# Set up Styles and CSS Loader | style-loader | css-loader | 03

- 1.) Install style and css loaders

  npm install --save-dev style-loader css-loader

- 2.) In webpack.config.js, add loader configuation in the rules array

      //inside webpack.config.js

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

                  {
                      test: /\.css$/i,
                      use: ["style-loader", "css-loader"],
                  },
              ]
          },
          resolve: {
              extensions: ['.tsx', '.ts', '.js'],
          },
      }

- 3.)Import the css file into the main index.ts file so that webpack is aware it needs to handle css files.

//inside ./src/index.ts

    import { test } from './js/test'
    import "./style/input.css";

    function Component(){
            const element = document.createElement('div');
            element.innerHTML = ['Hello', 'webpack', test, 'hello again!!!!'].join(' ');
        return element;
    }

    document.body.appendChild(Component());

- 4.) Rebuild webpack

  npm run webpack

## Other Loaders | Reconfigure the rules

We'll need to reconfigure the object in the rules array because we need the ability to pass in "options" to the loader. [For more info](https://webpack.js.org/concepts/loaders/#configuration)

For this example, I'll configure css-loader to handle the usage of url() so that I can add a background image to the div with the class of "logo".

The changes made below simply are to:

- remove the string names in the loader.
- replace the string name with an object in its place.
- give that object a key of loader and its value of the loader name.
- if we need to add options, an option's key is available.

The update made below is what's recommended from [Webpack's Docs](https://webpack.js.org/concepts/loaders/#using-loaders)

      //inside webpack.config.js

      module:{
          rules:[
              {test: /\.txt?/ , use: 'raw-loader'},

              {
                  test: /\.tsx?$/,
                  use: 'ts-loader',
                  exclude: /node_modules/,
                },

              // Previous Configuation : use array with strings as loaders
              //   {
              //     test: /\.css$/i,
              //     use: ["style-loader", "css-loader"],
              //   },

              // New Configuation : use array with seprate objects of seperate loaders
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

Above, you can see the use array is now an array of objects. Both objects have a value of loader but one is for the style-loader and one is for the 'css-loader.

**Important** : The order of the loaders matters since Webpack will start at the "end" first when it bundles since the loaders are chained. According to the [doc](https://webpack.js.org/concepts/loaders/#using-loaders) ;

> Loaders can be chained. Each loader in the chain applies transformations to the processed resource. A chain is executed in reverse order. **The first loader passes its result (resource with applied transformations) to the next one, and so forth** . Finally, webpack expects JavaScript to be returned by the last loader in the chain.

**The next important action** is to import the input.css (which is the global css stylesheet) into src/index.ts so that it will be included when webpack complies and bundles index.ts to include it in the dist folder.

![set up](./src/images/importCss-indexTs.png?raw=true)

I'll then add the class name "logo" to the div I want the background image to appear in:

![set up](./src/images/divUsingCssUrl.png?raw=true)

To see the applied changes:

    npm run webpack

You should now be able to see the background image in the div with class "logo" like shown above.

# Import Images and Fonts | file-loader | url-loader | 04

The process of configurating webpack to handle images is similar to what we did for style and css.

## Instalation

Install file-loader and url-loader: [For more info on file-loader ](https://v4.webpack.js.org/loaders/file-loader/)

    npm install --save-dev style-loader file-loader

We'll need to have an image to import. Place an image in src/images.

Next import the image into src/index.ts like so:
![set up](./src/images/file-loader-import-image.png?raw=true)

It's worth noting you'll see the red squiggles under the path name. This is because a type for images hasn't been declared yet. We'll handle this later on.

Next, you need to add a rules object for images in the the rules array. This object will:

- have a test key with a value of a file extentions associated with images.
- have a use key with a value of an array of objects

Each object will have a key of loader with the value equal to the name of the loader. Specfically for file-loader, we'll need to assign an output path so that it's included in the webpack bundle to distrubute the image to our index.html located in the dist folder. For more about outputPath, see the [doc](https://v4.webpack.js.org/loaders/file-loader/#outputpath)

Below are the changes mentioned above.

    {
      module.exports={
      mode: 'development',
      entry: './src/index.ts',
      output:{
      path: path.resolve(\_\_dirname, 'dist' ),
      filename: 'main.bundle.js',
    },
    module:{
      rules:[
        {test: /\.txt?/ , use: 'raw-loader'},

        {
          test: /\.(png|jpe?g|gif)$/i,
          use:[{
            loader: 'file-loader',

            // Assign the output path to include images in the dist folder
            options: {
              outputPath: 'src/images',
            }
        },

        ...
      ]
        ...
    },
    }

Now that the file-loader configuation is set, we can generate the image file in the dist folder by rebuilding webpack.

    npm run webpack

This should generate a new images directory inside the dist folder containing the image file as shown below:
![set up](./src/images/file-loader-dist-src-images.png?raw=true)

You may notice that although the dist/src/images succesfully auto generated, you see the following error below:
![set up](./src/images/error-file-loader-ts-for-images.png?raw=true)

This relates to the image type hasn't been declared as mentioned earlier. To declare a type we'll need to create a global.d.ts file in the root directory and declare a type inside that file. For more info on modules and the role of d.ts file check the [TypeScript docs](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)

Inside the global.d.ts file declare the type for png extensions : [solution found here](https://stackoverflow.com/a/46629045/7857134)

    //inside global.d.ts

    declare module "*.png"{
        const value: any;
        export default value;
    }

This should satisfy TypeScript to allow you to import the the image without an error.

Finally rebuild webpack:

    npm run webpack

Setting up exports and imports for png image useage in another file is now complete. You should no longer see the red squiggles now that the type for png is declared. Repeat this process for jpg,jpeg, tiff, etc. if you plan on using other image file types.

![set up](./src/images/file-loader-import-error-resolved.png?raw=true)

## Set up url-loader

      npm install --save-dev style-loader url-loader

Once installed, configure the rules for this loader in webpack:

    //inside webpackconfig.js

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
                  test: /\.(woff|woff2)$/i,
                  loader: 'url-loader'
                },
            ]}
            ...
    }

Next, we'll need to download a custom font and add it in our project. In the src directory, I simply made a fonts folder where I place the custom font.

![set up](./src/images/ur-loader-fonts-dir.png?raw=true)

In order to use that font, use the CSS at rule inside the global css file. The global css file for this project is located in src/style/input.css Make sure to make a relative path reference to the font and include the font format.

![set up](./src/images/url-loader-font-face.png?raw=true)

Then in the class where the font is used, include css attr of 'font-family' and make its value the font name;

![set up](./src/images/url-loader-font-family.png?raw=true)

Add the class to the h1 containing the text we want to apply our custom font to. We'll do this through the src/index.ts file. Then in the terminal, re-bundle webpack by running:

    npm run webpack

![set up](./src/images/url-loader-apply-class.png?raw=true)

see: https://www.robinwieruch.de/webpack-font/
[for later Babel vs Webpack ](https://dev.to/getd/wtf-are-babel-and-webpack-explained-in-2-mins-43be)

# Handle Sass files | sass-loader sass | 05

We need to install sass and sass-loader. For more info on sass-loader, see the [docs](https://www.npmjs.com/package/sass-loader) In the terminal run:

    npm install sass-loader sass --save-dev

Let's start by adding the sass-loader to our rules array in webpack.config.js .

    //inside webpack.config.js

        module.exports = {
          mode: "development",
          entry: "./src/index.ts",
          output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.bundle.js",
          },
          module: {
            rules: [
              { test: /\.txt?/, use: "raw-loader" },

          //  Adding sass-loader bellow:

              {
                test: /\.s[ac]ss$/i,
                use: [{ loader: "style-loader" }, {loader: "css-loader" }, {loader: "sass-loader" }],
              },

            ]
          }}

Next, **rename your global stylesheet** ending in **.css to .scss**. For this example, my _src/style/input.css_ will get renamed to _isrc/style/input.css_.

![set up](./src/images/sass-loader-rename-file.png?raw=true)

We'll also need to rename the style import in src/index.ts as well.

    //  inside src/index.ts
    import { pack, someFunction } from "./js/constants";

    import "./style/input.scss"; // CHANGE THE IMPORT HERE

    import img from "./images/webpack-icon.png";

    function Component() {
      const docFragment = document.createDocumentFragment();
      ...
    }

To Summarize, what we've done so far, we have:

- added the loader setup to the rules array in webpack.config.js
- renamed src/style/input.css to src/style/input.scss
- renamed the import of input.scss into src/index.ts

It'd be a good idea to check that we've installed everything correctly. In the terminal run:

    npm run webpack

If the previous styling in the browser didn't change, it means that we've succesfully added sass-loader. If they did change or you get an error, check syntax, spelling, references to relative paths, etc.

Assuming there are no errors, we'll want to confirm that we can _use_ sass. The easiest way to check is to see if any sass syntax registers with webpack is, to use a nested selector that will apply style changes for an element.

Let's do that by adding another element to the DOM by creating it in src/index.ts . We'll use a nested selector from sass syntax on the element we're about to create.

Below are the changes made in src/index.ts that create our new h2 element:

![set up](./src/images/sass-loader-create-new-el.png?raw=true)

Above, we simply created a sub-title h2 element with some text in it then append it to the wrapper div.

Next, open src/style/input.scss add the following sass selector for h2:

    // inside src/style/input.scss

    body:{
      background: black;
      color: white;
    }
    ...

    .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      // Sass selector for h2
      & h2 {
        color: red;
      }

    }

    ...

This will simply select our h2 child element from the div with the class of .wrapper . Make sure to rebundle webpack in the terminal by running:

    npm run webpack

As you can see below, this will result in changing the color of the h2 to red.

![set up](./src/images/sass-loader-nested-selector.png?raw=true)

I'm going to remove the styling we just added since we've verified that sass selectors are woring.

## Additional Verificiation for @use

Another critical feature from sass is the ability to load rules, mixins, and variable from other Sass style sheets. Here's more info on [@use](https://sass-lang.com/documentation/at-rules/use) if you're interested. On a side note, @use is the current version of @import which will get phased out eventually in the next couple of years.

Let's start by adding a className to the h2 sub-title element we recently created. Here, I've given the h2 element the className of _from-a-different-sass-file_ as shown below:
![set up](./src/images/sass-loader-add-className.png?raw=true)

Next, we need to create a new sass stylesheet in src/style. For this example, the new sass stylesheet is called _different-sass-file.scss_.

Inside _different-sass-file.scss_, we'll just create a new class with the same name of the stylesheet then, assign the font color for this class like so:

    //  inside src/style/different-sass-file.scss

    .from-a-different-sass-file {
      color: light grey;
    }

Afterwards, we'll need to import the styling class we created in src/style/from-a-different-sass-file.scss into src/style/input.scss. This is done using @use provided by sass inside src/style/index.ts. It's recommended to place @use at the top of the file. According to the [docs](https://sass-lang.com/documentation/at-rules/use):

> A stylesheet’s @use rules must come before any rules other than @forward, including style rules. However, you can declare variables before @use rules to use when configuring modules.

The @use should be implemented like so:

    // inside src/style/input.scss

    @use "different-sass-file";

    body {
      background: black;
      color: white;
    }

    ...

We're going to verify that @use is allowing us to apply styles from a different stylesheet. We'll do that by adding a nested class for .different-sass-file to the .wrapper class as shown below :

    // inside src/style/input.scss
    @use "different-sass-file";

    body {
      background: black;
      color: white;
    }
    ...
    @font-face {
      font-family: "Adistro";
      src: url(.././fonts/Adistro.otf) format("opentype");
    }

    .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      // Here is the styling we will add

      .different-sass-file {
        font-family: "Adistro";
        font-size: 3rem;
      }
    }
    ...

Finally to apply our changes, recomplie by running in the terminal:

    npm run webpack

We see that both styles from src/style.iput.scss and from src/style/different-sass-file-scss are applied to the html mark up.
![set up](./src/images/sass-loader-use.png?raw=true)

# Set up html-webpack-plugin | 06

According to the [docs](https://webpack.js.org/plugins/html-webpack-plugin/):

> The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles

## Why are we installing this plugin?

In regards to this repo, we'll use features from HtmlWebpackPlugin to generate an index.html for our dist folder that are generated from a template index.html file located in src/html. Consider that we've already specified the entry point within webpack.config.js for our javascript. In the previous section above for _Install ts-loader_, the changes we made to webpack.config.js are:

    // inside webpack.config.js

    module.exports={
          mode: 'development',
          entry: './src/index.ts',
          output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.bundle.js",
          }
    }
    ...

Since we've set entry = _'./src/index.ts'_ and _output.path = path.resolve(\_\_dirname, "dist")_ what we are saying that we want wepack to bundle our src/index.ts file and once it's completed creating the bundled copy, place it in the dist folder.

Currently, we do not have the same type of process to bundle and include our src/html/index.html into the dist folder. Since more than likely, dist is gitignored, anytime this branch is cloned, it wil not have an index.html. Setting up HtmlWebpackPlugin will make sure that an index.html exists when this branch is cloned.

## Instalation

    npm install --save-dev html-webpack-plugin

Next, modify webpack.config.js to include HtmlWebpackPlugin as a plugin. [see the docs](https://webpack.js.org/plugins/html-webpack-plugin/)

    // inside webpack.config.js

    const HtmlWebpackPlugin = require('html-webpack-plugin');   <----- 1.) make sure to require HtmlWebpackPlugin
    const path = require('path');

    module.exports = {
      entry: 'index.js',
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
      },

    plugins: [new HtmlWebpackPlugin(                            <----- 2.) add the plugin to the plugins array
      {template: 'src/html/index.html'}                         <----- 3.) include a template key with a value for the path to our souce index.html
    )],
    };

We'll need to make sure now that we've specified that our index.html template it exists. If it does not exist create the directory with a generic html doc inside. It should look something like this:

    //inside src/html.index.html

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Webpack-TypeScript-Tailwind</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>

      </body>
    </html>

Now rebuild webpack to verify that an index.html gets generated into our dist folder by running:

    npm run webpack

You should now see a new index.html file show up in the dist folder as shown below:
![set up](./src/images/html-webpack-plugin-destination.png?raw=true)

Something worth point out is that if there are any script tags within our source index.html that reference dist/main.bundle.js, remove the script. As shown below, now that we have HtmlWebpackPlugin installed, it will automatically include the bundle containing the index.html from dist that we want to display: Any additional script tags from the source index.html will result in rending index.html from dist twice.

![set up](./src/images/html-webpack-plugin-generated-script-tag.png?raw=true)

## House Keeping in the Dist Folder | clean-webpack-plugin | 07

This plugin isn't nesseary but is recomended to keep the dist folder organized. Since we're using webpack to build bundles from our src directory, everytime we make changes or add resorces such as new files, images, fonts, etc. to src, a new resources will get generated in the dist folder. If we decided that no longer need any of those resorces and delete them from src, they will remain in the dist folder.

The clean-webpack-plugin solves this issue: According to the [docs](https://www.npmjs.com/package/clean-webpack-plugin)

> By default, this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.

## Instalation

    npm install --save-dev clean-webpack-plugin

Then add the plugin to webpack.config.js as shown below:

    //  inside webpack.config.js

    module.exports = {
      mode: "development",
      entry: "./src/index.ts",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js",
      },
      module: {
        rules: [
          ...
          { test: /\.txt?/, use: "raw-loader" },
          ..
        ]
      }

      //  ADD CleanWebpackPlugin BELOW in the plugins array

      plugins: [
        new HtmlWebpackPlugin({template: 'src/html/index.html'}),
        new CleanWebpackPlugin()
      ],

      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
    };

Now run:

    npm run webpack

If there are any un-used files in the dist folder, the will get removed everytime you rebundle webpack.

# Babel And Jest | 08

Before starting the set up, it wouldn't hurt to look over the docs for using [Typescript with jest](https://jestjs.io/docs/getting-started#using-typescript) to get a general idea of what we're trying to accomplish.

Babel [DOES NOT SUPPORT TypeScript out of the box](https://babeljs.io/docs/en/babel-core/#default_extensions). The following steps will allow babel support for TypeScript. The following steps will allow us to make use of es6 functionality such as imports and exports of .ts files. This will be important for later when we create Jest test later on.

## Instalation | Babel Set Up for TypeScript

    npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-typescript @babel/plugin-transform-typescript

[babel-preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript) and [babel-plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript)

Next, create a [babel.config.json](https://babeljs.io/docs/en/usage#overview) in the root directory, then add '@babel/preset-env' and @babel/preset-typescript to the presets array as shown below: [see](https://jestjs.io/docs/getting-started#using-typescript)

      //inside babel.config.json

      module.exports = {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
        ],
      };

FYI, If this step above isn't completed or '@babel/preset-env', '@babel/preset-typescript' are missing for the presets array, you will encounter [this error](https://drive.google.com/file/d/165ZryS-0YmuvNp_jEPv4c6LZZ6bfsoVS/view?usp=sharing)when trying to run jest tests later on.

The [order of listed presets matters](https://babeljs.io/docs/en/presets/) as they opperate last to first.

## Configure Loaders | Babel Set Up

Now that we've set up the presets in babel.config.js we'll continue by [adding the babel-loader in webpack.config.js ](https://webpack.js.org/loaders/babel-loader/#usage)

      // inside webpack.config.js

      module.exports = {
        mode: "development",
        entry: "./src/index.ts",
        output: {
          path: path.resolve(__dirname, "dist"),
          filename: "main.bundle.js",
        },

      module: {
        rules: [
          ...
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,

            //  ADD babel-loader HERE
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins:['@babel/preset-typescript'],
              }
            }
          }
          ...
        ]
      }
      }

## Installation | Jest set up for Typescript

This portion of the instalation process covers changes made to the webpack configurations to handle assest importanted into our index.ts. This is nessesary since index.ts is parsed by Jest when index.ts is imported into a jest test file.

We'll need to install a few more things:

    npm i jest jest-environment-jsdom jest-cli @types/jest

- jest-environment-jsdom provides a test environment for Jest to test DOM events
- jest-cli just allows us to run jest commands in the terminal.
- @types/jest allows TypeScript to understand types in Jest

We'll need jest-environment-jsdom to be able to test events that occur in the DOM such as things like clicking buttons and testing their actions. According to the :

> jsdom and the jest-environment-jsdom package simulate a DOM environment as if you were in the browser. This means that every DOM API that we call can be observed in the same way it would be observed in a browser!

Once you've installed the packages from above, add a jest key to package.json. We'll specify the transform value to [allow Jest to parse Typescript syntax](https://jestjs.io/docs/code-transformation). Also we need to define [testEnvivornment as jsdom](https://jestjs.io/docs/tutorial-jquery) so that jest can handle DOM events as mentioned earlier. Show below are the updates we need to make in package.json .

      // inside package.json:
      {
      ...
        "jest": {
          "transform": {
            "^.+\\.[t|j]sx?$": "babel-jest"
          },
          "testEnvironment": "jsdom",
        },
      ...
      }

## Jest Set up for Testing | Test Folder Structure

- In package.json add a script to run jest tests:

      //inside pacakage.json:
      {
      ...
        "scripts": {
          "webpack": "npx webpack ",
          "typescript": "tsc",
          "format": "npx prettier --write .",

          // ADD jest to script
          "test": "jest",

      },
      ...
      }

- In the root directory, create a folder named "\_\_tests\_\_"
- Inside that "\_\_tests\_\_" directory, create two more directories: one name "stubs" and the other named "unit"

- Inside the "stubs" directory, create a file named images.js and inside images.js, add the following code:

      //  inside \__tests__/stubs/images.js

      module.exports = {

      };

- Inside the "stubs" directory, create a file named styles.js and inside styles.js, add the following code:

      //  inside \__tests__/stubs/styles.js

      module.exports = {

      };

What we've done here is [define the mock/stub](https://jestjs.io/docs/webpack#handling-static-assets) according to Jest documentation. We'll continue on with making a simple unit test.

- Inside the "\_\_tests\_\_/unit" directory create a file called "index.test.ts" . It's worth noting that I've chosen to name this file index.test.ts for this project. This file could also be very well named something Component.test.ts or someOtherName.test.ts. The important part is that whatever name is chosen, the name is proceded by ".test.ts" . **This is so that jest knows to only run tests on files that end in "test.ts"**

- In "\_\_test\_\_/unit/index.test.ts", write a simple test:

      // insideside "\__test__/unit/index.test.ts"

      describe('test', ()=>{
          it('tests that 1 + 1 is equal to 2',()=>{
              expect(1+1===2).toBe(true)
          })

          it('tests that 4 divided by 2 is equal to 2',()=>{
              expect(4/2 ===2).toBe(true)
          })
      })

To recap, our file structure should look like:
![set up](./src/images/jest-tests-dir-set-up.png?raw=true)

We can test that Jest is working properly based off the simple test we created in "\_\_tests\_\_/unit/index.test.ts"

At this point let's confirm that jest in hook eup correctly. In the terminal run:

    npm run test

we should be able to see:
![set up](./src/images/jest-confirmed-pass.png?raw=true)

# Jest Set up for Styling and Images | moduleNameMapper

Previously, we confirmed that Jest is working with our simple test however, if we were to import src/index.ts into this file, we'd see some Jest errors since we haven't configured Jest to handle situations where it encounters other assest such as styles and images we've imported into src/index.ts. [see](https://stackoverflow.com/a/54646930/7857134) and the [docs for handling static assets](https://jestjs.io/docs/webpack#handling-static-assets)

To remedy this, we'll need to mock/stub stying and images since Jest is primarly concerned with only testing typescript and javascript functionality. Make the following changes in package.json by updating the update the [moduleNameMapper](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring) key our jest configuation to assign a path to the stubs as shown below:

      // inside package.JSON

      {
        "jest": {
          "transform": {
            "^.+\\.[t|j]sx?$": "babel-jest"
          },
          "testEnvironment": "jsdom",

          // ADD path to the stubs

          "moduleNameMapper": {
            "\\.(css|less|scss)$": "<rootDir>/__tests__/stubs/styles.js",
            "\\.(png|jpg|jpeg)$": "<rootDir>/__tests__/stubs/images.js"
          },
        }
      }

Next, we'll need to let Jest know to only run tests on files that have ".test.ts" in their filename : we do this by adding a "testMatch" key to the jest configuations in package.json. The value for "testMatch" is a regex match for specifiying the .test.ts prefix. FYI, if this step is not done, then Jest will include out stubs as tests and those tests will fail. You'll see a measage like:

        FAIL  __tests__/stubs/images.js
          ● Test suite failed to run

            Your test suite must contain at least one test.

In order to get jest to ingnore files that aren't tests and resolve this error, we'll need to update package.JSON to ignore it.

      //inside package.json

        {
          "jest": {
          "transform": {
            "^.+\\.[t|j]sx?$": "babel-jest"
          },
          "testEnvironment": "jsdom",
          "moduleNameMapper": {
            "\\.(css|less|scss)$": "<rootDir>/__tests__/stubs/config.js",
            "\\.(png|jpg|jpeg)$": "<rootDir>/__tests__/stubs/images.js"
          },

            //  ADD THIS TO THE JEST CONFIGS in package.JSON
          "testMatch": [ "**/?(*.)+(test).[jt]s?(x)" ]
        },
        }

So now that our Jest configuation is set up, we can test weather or not we can successfully import a Typescript file into a Jest file.

To confirm our configuration changes were succesfull, import the file from src/index.ts into "\_\_tests\_\_/unit/index.test.ts". We'll also add a console.log for our import as shown below

Now run:

     npm run test

We can conclude from our Jest set up :

- Jest file encountered no issues with importing src/index.ts : No issues encountered due to the static assets imported into src/index.ts.
- The simple tests passed
- Jest understood the type for our imported src/index.ts file.
- No additional tests were created with the inclusion of the stubs directory into the \_\_tests\_\_ directory

![set up](./src/images/jest-confirm-import-works.png?raw=true)

# Webpack Dev Server

Wepack dev server is a good alternative to vsCode live server plugin with minimal configuartion. This section covers adding webpack dev server.

For more detils on configuring webpack dev server, [checkout the docs](https://webpack.js.org/configuration/dev-server/)

Also referenced [Brad Traversy's github](https://gist.github.com/bradtraversy/1c93938c1fe4f10d1e5b0532ae22e16a)

# Installation

    npm i -D webpack webpack-cli webpack-dev-server

## Add Webpack devServer Configs

Add the webpack devServer configs to webpack.config.js

      //  inside webpack.config.js

      module.exports = {
            mode: 'development',
            entry: './src/index.js',
            output: {
              path: path.resolve(__dirname, 'dist'),
              filename: 'main.bundle.js',
            },

          // ADD THE DEV SERVER PROPERTIES

          devServer: {
            static: {
              directory: path.resolve(__dirname, 'dist'),
            },
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,
          },
      }

## Add Script for Webpack Dev Server

      //inside package.json

      {
        "scripts": {
              ...
                "dev": "webpack server",
              ...
            },

      }

Now run:

    npm run dev
