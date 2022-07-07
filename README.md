# Setting up Tailwind

First remove sass, remove all sass files and sass references THEN remove the uninstall the loaders and remove wepack config

This is beacuse [you don’t need to use a preprocessor with Tailwind](https://tailwindcss.com/docs/using-with-preprocessors).

then follow [Brad Treversy's Guide](https://gist.github.com/bradtraversy/1c93938c1fe4f10d1e5b0532ae22e16a)

Important: when you make style changes, you need to run:

    npm run webpack

then:

    npm run dev
