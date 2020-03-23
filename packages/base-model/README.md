For persistence of data, PubSweet uses `@pubsweet/base-model` and its BaseModel class, which is a basic model based on [Objection.js](https://vincit.github.io/objection.js/).

For a data model component, its defined exports are:

```js static
module.exports = {
  typeDefs: // GraphQL type definitions
  resolvers: // GraphQL resolvers
  modelName: 'Collection',
  model: require('./collection'),
}
```

Migrations (folder `./migrations`) are automatically added if they exist. For example migrations, see e.g. the [User model's migrations](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/components/server/model-user/src/migrations).

If you use `@pubsweet/model-some-model` in your app (by specifying it as a component in the configuration), `typeDefs` and `resolvers` are gathered in server's `schema.js` to compose the app's entire GraphQL schema from three parts: 1. `pubsweet-server`, 2. app's components and 3. app's config.

### Using standalone data models

To use the above models, all you need to do is to add them to the `pubsweet.components` configuration, e.g.:

```js static
  pubsweet: {
    components: ['@pubsweet/model-some-model'],
  },
```

The data model's migrations will be added to the list of your app's migrations, and GraphQL queries and mutations will automatically be added to your API.

### API documentation

There are a few methods in the BaseModel that add utility features.

#### save() - Saving a single model

```js static
const manuscript = await new Manuscript({ title: 'Test' }).save()
```

#### saveGraph() - Saving a graph

```js static
const manuscript = await new Manuscript({
  title: 'Test',
  teams: [{ role: 'reviewer' }],
}).saveGraph()
```

#### find() - Finding a single instance by id

Passes parameters onwards to Objection's `findById` and supports its options:

```js static
const manuscript = await Manuscript.find(
  'b70cd527-6b96-4612-b516-38a0e5ebfa65',
  { eager: 'teams' },
)
```

#### findByField() - Finding instances by field value

Passes parameters to Objection's `where`.

```js static
const manuscript = await Manuscript.findByField(
  'title',
  'Breakthrough research',
)
```

#### findOneByField() - Find a single instance by field value

Uses Objections's `where().limit(1)`.

```js static
const manuscript = await Manuscript.findOneByField('content', 'Great success')
```

#### all() - Returns all records

```js static
const manuscript = await Manuscript.all()
```

### Support for extended data models (models based on another model)

Shown in (https://gitlab.coko.foundation/pubsweet/pubsweet/blob/master/packages/base-model/test/extended-data-model-component/src/index.js) is an extended data model (`extended-data-model-component`) for testing purposes. It exports the following things:

```js static
module.exports = {
  typeDefs:
  resolvers:
  modelName: 'Model',
  model: require('./model'),
  extending: '@pubsweet/model-some-model',
}
```

Things are exactly the same as in the non-extended data model, but there is one big difference, the `extending` property. This is a string, the name of the model that this extended data model extends. In this case `@pubsweet/model-extended-some-model` extends `@pubsweet/model-some-model` and what this means, in practice, is that `@pubsweet/model-some-model`'s GraphQL schema, resolvers and migration paths will be added to `@pubsweet/model-extended-some-model`'s. This happens recursively, so for example if you had a `@pubsweet/model-super-extended-some-model` that extended `@pubsweet/model-extended-some-model`, it would also include `@pubsweet/model-some-models`'s GraphQL schema, resolvers and migration paths. ∞

### Examples in the wild

Take a look at the [micropubs/wormbase](https://gitlab.coko.foundation/micropubs/wormbase/tree/master/server) application, for an example implementation of two models, `Manuscript` and `Review` using the `BaseModel` class, the supplied GraphQL connectors and Authsome.
