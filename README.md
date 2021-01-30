# react-starter-express ![Node CI](https://github.com/amazingrv/react-starter-express/workflows/Node%20CI/badge.svg?branch=master)

A Simple react starter kit with exposed config and hooks support, runnnig from express server (for Node version 10.13 and above).

Supports routing, ReduxJS, eslint with recommended lint rules, prettier and other best practices supported OOB

Currently supported config:

-   exposed configuration for eslint, browserlint, babel, postcss etc.
-   browserlist support with postcss for autoprefixer
-   babel-preset-env, Core-JS 3 Polyfills and other most used babel plugins
-   webpack loaders for eslint, font and images etc.
-   support for css 3 and css modules for scoped css
-   friendly erros with formatted webpack output via webpack plugins
-   lodash, momentjs and respective loaders for tree-shaking support
-   all optimizations applied to production build for minimum size with max performance.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot reloading mode using express configured with webpack-dev-middlware and webpack-hot-middleware:

```sh
npm start
```

To create a production build (dist folder) with production express server:

```sh
npm run build
```

## Running

Run `npm start` in dist folder to start running the app
