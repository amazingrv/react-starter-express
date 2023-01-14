# react-starter-express [![Node CI](https://github.com/amazingrv/react-starter-express/actions/workflows/nodejs.yml/badge.svg)](https://github.com/amazingrv/react-starter-express/actions/workflows/nodejs.yml)

A Simple react starter kit with exposed config and hooks support, runnnig from webpack-dev-server (for Node version 14.15 and above).

Supports eslint with recommended lint rules, prettier and other best practices supported OOB

Currently supported config:

- exposed configuration for eslint, babel, postcss and webpack
- browserlist support with autoprefixer using postcss
- babel-preset-env, Core-JS 3 Polyfills and other most used babel plugins
- webpack asset modules for svg, font and images etc.
- support for css 3, optimized for development and prod builds
- webpack tree-shaking with lodash and moment lib optimizations
- prod build with minimum size using terser, css optimizer and html minify

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
