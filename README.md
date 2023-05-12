# react-starter-express [![Node CI](https://github.com/amazingrv/react-starter-express/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/amazingrv/react-starter-express/actions/workflows/nodejs.yml)

A simple react starter kit with exposed config and hooks support, running from webpack-dev-server as a custom server (for Node 16 LTS and above).

Supports eslint with recommended lint rules, prettier and other best practices supported OOB

Currently supported config:

- [x] configuration for eslint, prettier and webpack
- [x] browserlist support with autoprefixer using postcss
- [x] @swc/core for transpiling javascript
- [x] support for Core-JS 3 polyfills
- [x] webpack asset modules for svg, font and images etc.
- [x] support for css modules
- [x] optimized for development with fast startup and HMR
- [x] efficient and small production builds
- [x] webpack tree-shaking with lodash and moment lib optimizations
- [x] code minification using swc-minify, csso for css and html minify
- [x] ejs for generate custom html render during server start 

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot reloading mode using express configured with dev server:

```sh
npm start
```

To create a production build (dist folder) with production express server:

```sh
npm run build
```

## Running

Run `npm start` in dist folder to start running the app
