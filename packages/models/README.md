# Models

A package that connects all model components together, so that you can use them elsewhere with e.g.

```
const { User } = require('@pubsweet/models')
```

For a model component to be accessible through `@pubsweet/models`, it needs to be listed in your application's config, for example, like so:

```
{
  pubsweet: {
    components: [
      '@pubsweet/model-user',
      '@pubsweet/model-team',
    ]
  }
}
```
