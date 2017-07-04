# Easy Local Notes

A web application for taking notes built with React JS! 
[See demo here](https://zitros.github.io/easy-local-notes).

Easy Local Notes application demonstrates the usage of
[React XMasonry layout](https://zitros.github.io/react-xmasonry).

Preview
-------

![ScreenShot](https://cloud.githubusercontent.com/assets/4989256/23872195/0c16887e-0836-11e7-9dee-baded29bc796.png)

How-To Develop
--------------

You need the latest [Git](https://git-scm.com) and [NodeJS](https://nodejs.org) installed on your 
system.

To get the source of the project, open the command prompt and clone and enter the project's 
directory:
 
```bash
git clone https://github.com/ZitRos/easy-local-notes
cd easy-local-notes
```

The project comes with several dependencies, so you need to install them first to be able to build
it. To do this, execute:

```bash
npm install
```

Now you will be able to build the application from sources. JavaScript files, which rest in `src`
folder will be compile to `docs/index.js` file.

```bash
npm run build # or: npm run build-dev to start development build
```

That's it! You can receive some warnings on this phase: just ignore them.

Now you have the files in `docs` folder which you can serve to open the application in
the browser. For example, you can use `serve` package to do so:

```bash
npm install -g serve # install serve if you haven't already;
serve docs           # start serving files from docs folder.
```

Then, open the web address printed in the console window.

License
-------

[MIT](LICENSE) © [Nikita Savchenko](https://nikita.tk)
