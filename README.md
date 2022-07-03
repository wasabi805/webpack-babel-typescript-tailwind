# Walk through with Webpack Docs

First make sure that typescript is set up and installed: [see the README.md](https://github.com/wasabi805/typeScript-playground)

After setting up Typescript,
if you were to compile typescript (ie npm run typescript) and after run weback (ie, npm run webpack)
you might see this error:

you'll see that if you convert any other other file than index.ts, from `someFile.js` to `someFile.ts`,
you'll get an error like:
![set up](./images/webpack-error-1.png?raw=true "Optional Title")

The following directions are to address this issue:

1.)...TBD

## Setting Up Webpack, To Get Started ...

Core Concepts: go throught this page to have a minimal set up for webpack.config.js | [core concepts](https://webpack.js.org/concepts/#entry)

Basic Set up : this will walk you through the bundling process to have the html page you'll move from src into dist load in the browser |
[basic set up](https://webpack.js.org/guides/typescript/)

Note: in the the Basic Set up section, if lodash isn't working for you, use javascript join() instead.
You'll still need to npm install lodash --save-dev.
Continue through the docs and by the end, you should be able to have webpack recognize lodash from the node_modules by the end.

## Adding TypeScript

- added typescript first
