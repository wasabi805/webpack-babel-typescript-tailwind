# Tailwind Template

![Tailwind Logo](./src/images/tailwind-logo.jpg?raw=true)

Here's a working template for Tailwind. I primarily made it to have as a broiler plate for code excerises in other repos.

it contains:

- Tailwind

- Webpack

- Typescript

- Babel

- Jest

- prettier

- file loader

- style loader

- css loader

- url loader

- HtmlWebpackPlugin

## Notes to myself

Pay no attention to the notes below. They're simply references to setting up this repo from another repo i made:

First remove sass, remove all sass files and sass references THEN remove the uninstall the loaders and remove wepack config

This is beacuse [you don’t need to use a preprocessor with Tailwind](https://tailwindcss.com/docs/using-with-preprocessors).

then follow [Brad Treversy's Guide](https://gist.github.com/bradtraversy/1c93938c1fe4f10d1e5b0532ae22e16a)

Important: when you make style changes, you need to run:

    npm run webpack

then:

    npm run dev
