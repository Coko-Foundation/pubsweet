# PubSweet Components

# Developing your own components

## Conventions

### Client components

Package layout

* `src/` contains ES6/JSX/SASS sources (pointed to by `main`)

All modules forming part of the public API of the component should be exported from the index.js. Deep imports are discouraged (e.g. `package-name/some/file`).

The component's `index.js` should export e.g.:

```js
module.exports = {
  client: {
    components: [() => require('./LoginContainer')],
  },
}
```

### Server components

Should specify a minimum required version of Node and have no transpiling.

The component's `index.js` should export e.g.:

```js
module.exports = {
  server: () => app => require('./InkBackend')(app),
}
```

An instace of the Express.js server gets passed to the component as `app`.

### Model components

A model component's `index.js` should export e.g.:

```js
module.exports = {
  typeDefs: require('./typeDefs'),
  resolvers: require('./resolvers'),
  modelName: 'Manuscript',
  model: require('./manuscript'),
}
```

## Publishing

Be sure to switch to a separate branch for Lerna releases (e.g. `release`), as the master branch is protected from push, so your releases will fail.
