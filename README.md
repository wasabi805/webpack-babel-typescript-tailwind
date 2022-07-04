# Import Images and Fonts | file-loader | url-loader

see: https://www.robinwieruch.de/webpack-font/
for later Babel vs Webpack : https://dev.to/getd/wtf-are-babel-and-webpack-explained-in-2-mins-43be

## Set up file-loader and url-loader

Add file-loader and url-loader: [For more info on file-loader ](https://v4.webpack.js.org/loaders/file-loader/)

    npm install --save-dev style-loader file-loader url-loader

We'll need to have an image to import. Place an image in src/images.

Next import the image into src/index.ts like so:
![set up](./src/images/file-loader-import-image.png?raw=true "Optional Title")

it's worth noting you'll see the red squiggles under the path name. This is because a type for images hasn't been declared yet. We'll handle this later on.

Next, you need to add a rule for images in the the rules array by adding an object to the rules array. This object will:

- have a test key with a value of a file extentions associated with images.
- have a use key with a value of an array of objects

Each object will have a key of loader with the value equal to the name of the loader. Specfically for file-loader, we'll need to assign an output path so that it is included in the bundling process for webpack to distrubute the image to our index.html located in the dist folder. For more about outputPath, see the [doc](https://v4.webpack.js.org/loaders/file-loader/#outputpath)

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

Now that the file-loader configuation is set, we can generate the image file in the dist folder by rebuilding webpack. Run this in the terminal to rebuild webpack:

    npm run webpack

This should generate a new images directory inside the dist folder containing the image file as shown below:
![set up](./src/images/file-loader-dist-src-images.png?raw=true "Optional Title")

You may notice that although the dist/src/images succesfully auto generated, you see the following error below:
![set up](./src/images/error-file-loader-ts-for-images.png?raw=true "Optional Title")

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

<!-- ![set up](./src/images/file-loader-build-image-dir.png?raw=true "Optional Title") -->

Setting up exports and imports of files is now complete. You should no longer see the red squiggles now that the type for png is declared. Repeat this process for jpg,jpeg, tiff, etc. if you plan on using other image file types.

![set up](./src/images/file-loader-import-error-resolved.png?raw=true "Optional Title")

# Set up Styles and CSS Loader | style-loader | css-loader

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

- 3.)import the css file into the main index.ts file so that webpack is aware it needs to handle css files.

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

We'll need to reconfigure the object in the rules array because we need to be able to pass in "options" to loader.These options instruct that loader on tasks such as weather or not to process certain files as resources to provide for our html. If they **do** need to process the resource, the options values gives further granularity on how to do so. [For more info](https://webpack.js.org/concepts/loaders/#configuration)

For this example, I'll how configure css-loader to have th ability to handle the usage url() so that I can add a background image as the background of a div with the class of "logo".

The changes we'll make below simply are to:

- remove the strings names of the loader.
- replace the string name with an object in its place.
- give that object a key of loader with the value of string name of the loader we removed from the rules array.
- if we need to add options, we make a key of options whole value is an object.

Note about that last step: The keys will be specific to the particular loader so you'll probably need to look at the docs for that loader to figure out the options paramters to configure the loader.

The update we make below is what's recomended from [Webpack's Docs](https://webpack.js.org/concepts/loaders/#using-loaders)

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

Above you can see that the use array is now an array of objects. Both those objects have a value of loader but one is for the style-loader and one is for the 'css-loader.

**Very important** , the order of the loaders matters since Webpack will start at the "end" first when it bundles since the loaders are chained. According to the [doc](https://webpack.js.org/concepts/loaders/#using-loaders) ;

> Loaders can be chained. Each loader in the chain applies transformations to the processed resource. A chain is executed in reverse order. **The first loader passes its result (resource with applied transformations) to the next one, and so forth** . Finally, webpack expects JavaScript to be returned by the last loader in the chain.

**The next important action** is to import the input.css (which is the global css stylesheet) into src/index.ts so that it will be included when webpack complies and bundles index.ts to include it in the dist folder.

![set up](./src/images/importCss-indexTs.png?raw=true "Optional Title")

I'll then go ahead and add the class name "logo" to the div I want the background image to appear in:

![set up](./src/images/divUsingCssUrl.png?raw=true "Optional Title")

and finally run:

    npm run webpack

The you should now be able to see the background image in the div with class "logo" like shown above.

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
