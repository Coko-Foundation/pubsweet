# Base model (standalone data models)

This package introduces a BaseModel class, which is a basic model based on [Objection.js](https://vincit.github.io/objection.js/). In its tests (`data-model-component`, `extended-data-model-component`: https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/base-model/test), you can see how that enables you to add your own data model to PubSweet. A data model that lives in its own database table, as defined in its migration(s).

For a data model package, its defined exports are:

```
module.exports = {
  typeDefs: // GraphQL type definitions
  resolvers: // GraphQL resolvers
  modelName: 'Collection',
  model: require('./collection'),
}
```

Migrations (folder `./migrations`) are automatically added if they exist.

If you use `@pubsweet/model-some-model` in your app (by specifying it as a component in the configuration), `typeDefs` and `resolvers` are gathered in server's `schema.js` to compose the app's entire GraphQL schema from three parts: 1. `pubsweet-server`, 2. app's components and 3. app's config.

# Support for extended data models (models based on another model)

Shown in (https://gitlab.coko.foundation/pubsweet/pubsweet/blob/master/packages/base-model/test/extended-data-model-component/src/index.js) is an extended data model (`extended-data-model-component`) for testing purposes. It exports the following things:

```
module.exports = {
  typeDefs:
  resolvers:
  modelName: 'Model',
  model: require('./model'),
  extending: '@pubsweet/model-some-model',
}
```

Things are exactly the same as in the non-extended data model, but there is one big exception, the `extending` property. This is a string, the name of the model that this extended data model extends. In this case `@pubsweet/model-extended-some-model` extends `@pubsweet/model-some-model` and what this means, in practice, is that `@pubsweet/model-some-model`'s GraphQL schema, resolvers and migration paths will be added to `@pubsweet/model-extended-some-model`'s. This happens recursively, so for example if you had a `@pubsweet/model-super-extended-some-model` that extended `@pubsweet/model-extended-some-model`, it would also include `@pubsweet/model-some-models`'s GraphQL schema, resolvers and migration paths. :curly_loop:

# Using standalone data models

To use the above models, all you need to do is to add them to the `pubsweet.components` configuration, e.g.:

```
  pubsweet: {
    components: ['@pubsweet/model-some-model'],
  },
```

The data model's migrations will be added to the list of your app's migrations, and GraphQL queries and mutations will automatically be added to your API.

# Examples in the wild

Take a look at the [micropubs/wormbase](https://gitlab.coko.foundation/micropubs/wormbase/tree/develop/server) application, for an example implementation of two models, `Manuscript` and `Review` using the `BaseModel` class, the supplied GraphQL connectors and Authsome.
