# Handle Sass files | sass-loader sass

TODO: npm install sass-loader sass webpack --save-dev
[see sass-loader docs](https://www.npmjs.com/package/sass-loader)

TODO: configure webpack rules:

    //inside webpack.config

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

              {
                test: /\.s[ac]ss$/i,
                use: [{ loader: "style-loader" }, {loader: "css-loader" }, {loader: "sass-loader" }],
              },
            ]
          }}

Next, **rename you global stylesheet** ending in **css to scss**. For this example, my _input.css_ will get renamed to _input.scss_.

Since this file is imported into src/index.ts, well need to also rename the file there to.

    //inside src/index.ts
    import { pack, someFunction } from "./js/constants";

    import "./style/input.scss"; // CHANGE THE IMPORT HERE

    import img from "./images/webpack-icon.png";

    function Component() {
      const docFragment = document.createDocumentFragment();
      ...
    }

We can verify if sass-loader was added correctly as a loader in our webpack.config.js in the terminal by running:

    npm run webpack

If the previous styling in the browser didn't change, then the configuation changes are correct. If they did change or you get error, check syntax, spelling, etc.

Now, we'll want to confirm that we can use sass. The easiest way is to see if we can nest added styles in nested classes. Let's do that by adding another element to the DOM by creating it in src/index.ts Below are the changes made in index.ts that create our new h2 element:

![set up](./src/images/sass-loader-create-new-el.png?raw=true "Optional Title")

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

This will simply select h2 children from the div with class .wrapper . Make sure to rebundle webpack in the terminal by running the script, _npm run webpack_. As you can see below, this will result in changing the color of the h2 to red.

![set up](./src/images/sass-loader-nested-selector.png?raw=true "Optional Title")

I'm going to remove the styling we just added since it shows that we can use sass selectors now.

## Additional Verificiation for @use

Another critical feature from sass is the ability to load rules, mixins, and variable from other Sass style sheets. Here's more info on [@use](https://sass-lang.com/documentation/at-rules/use) if you're interested. On a side note, @use is the current version of @import which will get phased out eventually in the next couple of years.

Let's start by adding a className to the h2 sub-title element we recently created. Here, I've given the h2 element the className of _from-a-different-sass-file_ as shown below:
![set up](./src/images/sass-loader-add-className.png?raw=true "Optional Title")

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

To demonstrate that styles from seperate sass stylesheets are provided by @use, we'll also nest the .from-a-different-sass-file class within the .wrapper class inside src/style/index.ts:

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

      .from-a-different-sass-file {
        font-family: "Adistro";
        font-size: 3rem;
      }
    }
    ...

Finally, if we run _npm run webpack_ to recomplie, we see that both styles from src/style.iput.scss and from src/style/different-sass-file-scss are applied to the html mark up.
![set up](./src/images/sass-loader-use.png?raw=true "Optional Title")

# Import Images and Fonts | file-loader | url-loader

This will cover....

## Set up file-loader

Add file-loader and url-loader: [For more info on file-loader ](https://v4.webpack.js.org/loaders/file-loader/)

    npm install --save-dev style-loader file-loader

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

Setting up exports and imports for png image useage in another file is now complete. You should no longer see the red squiggles now that the type for png is declared. Repeat this process for jpg,jpeg, tiff, etc. if you plan on using other image file types.

![set up](./src/images/file-loader-import-error-resolved.png?raw=true "Optional Title")

# Set up url-loader

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

![set up](./src/images/ur-loader-fonts-dir.png?raw=true "Optional Title")

In order to use that font, use the CSS at rule inside the global css file. The global css file for this project is located in src/style/input.css Make sure to make a relative path reference to the font and include the font format.

![set up](./src/images/url-loader-font-face.png?raw=true "Optional Title")

Then in the class where the font is used, include css attr of 'font-family' and make its value the font name;

![set up](./src/images/url-loader-font-family.png?raw=true "Optional Title")

Add the class to the h1 containing the text we ant to apply our custom font to. We'll do this through the src/index.ts file. Then in the terminal, re-bundle webpack by running:

    npm run webpack

![set up](./src/images/url-loader-apply-class.png?raw=true "Optional Title")

see: https://www.robinwieruch.de/webpack-font/
[for later Babel vs Webpack ](https://dev.to/getd/wtf-are-babel-and-webpack-explained-in-2-mins-43be)

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
