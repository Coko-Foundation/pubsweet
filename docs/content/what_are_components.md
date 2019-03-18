# Background

Before explaining what a component is, it is important to provide some context on how a component fulfills part of the workflow model that you, as a developer, are working toward.

The workflow is built using a number of _workspaces_. Each workspace provides a certain piece of functionality to the PubSweet application. Each of these spaces is implemented using a component (eg. a login page), which itself is usually composed of a number of smaller components (eg. a couple of input fields and a button).

# Components

A PubSweet component is a JavaScript module that can extend or change the functionality of a PubSweet application. Developers and designers can use any combination of components they can imagine to build the publishing platform they need.

PubSweet components are broadly divided in two categories: server components and client components, depending on whether they aim to extend `pubsweet-server` or `pubsweet-client` respectively. Both types are expected to follow the naming convention of `pubsweet-component-` or `@pubsweet/component-` to allow for easy discoverability.

PubSweet components export certain keys from their main file. This export makes them loadable by PubSweet applications and tooling.

## Server components

A server component can export the following keys:

- `server`: This key allows Express.js routes and/or middleware to extend the server. The value for this key is a function that returns another function that accepts an Express.js app as its first argument. This function can do whatever it wants with the app (eg. add new routes, apply middleware functions). Take a look at the [password reset component](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/components/PasswordReset-server 'undefined') for a starting point.
- `typeDefs`: GraphQL type definitions
- `resolvers`: GraphQL resolvers

```js static
module.exports = {
  server: () => app => {
    app.get('someroute', someRouteFunction)
    app.use(someMiddleware)
  },
  typeDefs: \`GraphQL type definitions\`,
  resolvers: { }
}
```

## Client components

All client component options are exported under the `client` key. The options that can be nested under this key are as follows:

- `components`: An array of functions that return React components

```js static
module.exports = {
  client: {
    components: \[
      () => someReactComponent,
      () => anotherReactComponent
    \],
  }
}
```

The [`login`](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/components/Login 'null') component is a good standing example of a client component. It (predictably) provides basic user login functionality in the client. It does this by exporting:

- A React login form that provides a login interface and uses the login GraphQL Query's and mutations to authenticate users.

You can install the `login` component and instantly have login functionality in your app. You can also pick and choose which parts of the component you use.

# Components Library

As mentioned already, PubSweet components follow the naming convention of starting with `pubsweet-component-` or `@pubsweet/component-` to make them easily discoverable on the npm registry. However, this is not a requirement. In fact, components don't have to be published at all - they can live in a directory or a git repository.

A number of PubSweet components are already available for developers. Some of them exist in the [PubSweet repository](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/components 'undefined') and are ready to use.

## PubSweet UI

Most of the components in the Components Library use a number of smaller, highly reusable components. From small components like input fields and buttons to a configurable form, there are a lot of small components that can be useful to any number of larger components.

[PubSweet UI](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/ui 'undefined') (`@pubsweet/ui`) is an important PubSweet package intended to house these small components. It makes an ever-expanding list of these components available for developers, and plays a central role in the development flow of a front-end component. UI elements are categorized based on a loose adherence to the principles of [atomic design](http://bradfrost.com/blog/post/atomic-web-design/ 'undefined').

PubSweet also provides a [complementary library](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/ui-toolkit 'undefined') (`@pubsweet/ui-toolkit`) that provides some helper functions (more on that in [the theming section of this book](inline 'undefined')), as well as bits of reusable CSS (eg. rotation keyframes animations, fade ins etc.).

## Conventional Commits

All changes to components are documented using [Conventional Commits](https://conventionalcommits.org/ 'undefined'). A good example of how this might look like in practice is our [commit log](https://gitlab.coko.foundation/pubsweet/pubsweet/commits/master 'undefined'). All contributions to these libraries are required to follow this particular commit structure.
