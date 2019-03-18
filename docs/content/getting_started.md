# Install PubSweet and set up an app

You'll need a couple of things installed on your machine before you get started: `Node.js` (version 8.9) or higher and `yarn` (version 1.3.2 or higher).

To start working on a PubSweet application, you could grab one that already exists from our GitLab, like Editoria or xPub. You could also start with [`pubsweet-starter`](https://gitlab.coko.foundation/pubsweet/pubsweet-starter 'undefined') that has been created with the sole purpose of getting devs up and running with minimal friction.

The rest of this chapter assumes that you chose neither of those paths and decided to create your application from scratch.

Before anything, you will need to start with an empty Node.js project to which you'll add the needed dependencies by typing the following:

```bash
yarn add pubsweet \
pubsweet-server \
pubsweet-client \
pubsweet-component-login \
pubsweet-component-signup
```

Note: We use `yarn` in our examples, as we heavily use `yarn workspaces` in our code. Feel free to use `npm`, however, if you think that covers your use cases better.

# Main concepts for your first app

`pubsweet-client` uses React. As such, it relies on an `app.js` file to serve as the `root` component, and a `routes.js` file to specify your app's routes. It also leverages popular libraries such as `webpack` and `react-router` to provide functionality for bundling and routing. Here's a simple example of how to get started.

You will need three main files: `app.js`, `index.html`, and `routes.js`. By convention, we add these files in an `app` folder in the root of the application.

## index.html

Your `index.html` file is the web page into which your PubSweet app loads. All it contains is a `<div id="root">` – which will be replaced with your React app's elements — and a script to load your bundled app.

```html
<!DOCTYPE html>

<head>
  <meta charset\="utf-8"\>
</head>

<body>
  <div id\="root"\></div>
  <script type\="text/javascript" charset\="utf-8" src\="/assets/app.js"\></script>
</body>

</html>
```

Your `index.html` file should look pretty much like this example, although your script source might change if you choose to reconfigure your webpack settings.

## app.js

This is your React app's entry point. It grabs the `<div id="root">` from the `index.html` file and replaces it with the PubSweet app. This is also where you import a theme for your PubSweet app to use, if you choose to use one (for more information see the Theming section).

```js static
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

import createHistory from 'history/createBrowserHistory'

import { configureStore, Root } from 'pubsweet-client'
import theme from '@pubsweet/coko-theme'

import routes from './routes'

const history = createHistory()
const store = configureStore(history, {})

const rootEl = document.getElementById('root')

ReactDOM.render(
  <Root history\={history} routes\={routes} store\={store} theme\={theme} />,
  rootEl,
)

export default hot(module)(Root)
```

## routes.js

Finally, you'll need a `routes.js` file for your `app.js` file to reference. This file indicates what components should be served up from different routes in the app's URL.

```js static
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Login from 'pubsweet-component-login/LoginContainer'
import Signup from 'pubsweet-component-signup/SignupContainer'
import PasswordReset from 'pubsweet-component-password-reset-frontend/PasswordReset'

import Dashboard from './components/Dashboard'

const routes = (
  <Switch>
    <Route component={Login} exact path="/login" />
    <Route component={Signup} exact path="/signup" />
    <Route component={PasswordReset} exact path="/password-reset" />
    <Route component={NavigationBar} path="/" />
    <Switch>
      <Route component={Dashboard} exact path="/dashboard" />
      <Redirect to="/dashboard" /> // redirect other routes
    </Switch>
  </Switch>
)

export default routes
```

You'll want to configure this file to reflect your desired paths, components, and public/private pages.

## Webpack

As mentioned earlier in this chapter, `pubsweet-client` uses webpack to provide app bundles. Create a folder called `webpack` in the root of your application and add the file `webpack.development.config.js` to it. Refer to webpack's documentation for what goes in the config or feel free to copy one of the [existing](https://gitlab.coko.foundation/micropubs/wormbase/blob/develop/webpack/webpack.development.config.js 'undefined') webpack configuration files. It is possible to add a configuration file for each environment you'll be working in (for instance, you can add a `webpack.production.config.js` to define Webpack rules for the production environment) .

One thing to note is that PubSweet components are written in ES6 (including proposals down to Stage 2) and do not come precompiled to ES5. This means that you have to explicitly tell webpack to compile them, by including something similar to the following in your module rules config.

```js static
  {
    test: /\\.js$|\\.jsx$/,
    loader: 'string-replace-loader',
    query: {
      search: 'PUBSWEET\_COMPONENTS',
      replace: \`\[${clientComponents
        .map(component => \`require('${component}')\`)
        .join(', ')}\]\`,
    },
    include: \[
      // include app folder
      path.join(\_\_dirname, '..', 'app'),
      // include pubsweet packages which are published untranspiled
      /pubsweet-\[^/\\\\\]+\\/(?!node\_modules)/,
      /@pubsweet\\/\[^/\\\\\]+\\/(?!node\_modules)/,
      // include other packages when this repo is mounted in a workspace
      /packages\\/\[^/\\\\\]+\\/(?!node\_modules)/,
    \]
  }
```

## Configuration

PubSweet provides options to configure your application by adding configuration files to a `config` folder you'll create in the root of your application. More on the files required and the different configuration options for PubSweet applications can be found in the following chapter.

## Running the application

Once you have your configuration set up, the application can be started. This is generally done using a script from `package.json`, which in turn executes `pubsweet start`. Alternatively, it can be run directly from a terminal with `npx pubsweet start`.

# Configuring a PubSweet app

Configuration files for PubSweet applications exist inside the `config` folder in each application's root directory. [Node-config](https://github.com/lorenwest/node-config/ 'undefined') is used for handling different files for different environments. A good general file structure would be the following, sorted by reversed priority (for example, an option in a more specific file will overwrite the same option in the `default.js`):

- `default.js` defines options that apply to all environments
- `[ENVIRONMENT].js` defines options that apply to this environment only, but should be commited (eg. `development.js`, `production.js`)
- `local-environment.js` defines the options that apply to the local setup of a specific environment. These files should be `gitignored`. (eg. `local-development.js`), and
- `custom-environment-variables.js` looks, by default, for environment variables.

Please refer to [Node-config's documentation](https://github.com/lorenwest/node-config 'undefined') for different options and extensions for the above. Also, it is important to note that you could, for example, use `.yaml` files instead of JavaScript ones, or not use environment variables at all. We don't require one way or the other – it's up to you.

# Configuration options

Configuration files internally adhere to the following structure:

```js static
module.exports = {
  <component-name>: {
    <config-option\-1\>: 'value-1',
    <config-option\-2\>: 'value-2',
  }
}
```

Let's take a look at the options that you will most likely need.

## Authsome

Config options:

- `mode`: Declares where your authsome mode exists.
- `teams`: Declares the teams that exist in the application.

```js static
authsome: {
  // This should be either an npm package or an absolute path, not a relative path.
  mode: path.join(\_\_dirname, 'auth.js'),
  teams: {
    copyEditors: { // team type
        name: 'Copy Editors' // name for display purposes
    },
    productionEditors: {
      name: 'Production Editors'
    },
  }
}
```

[See the Authsome chapter for more information.](inline 'undefined')

## dbManager

The options here will introduce a user to the database when `pubsweet setupdb` is run.

- `admin`: Whether the user is admin user or not.
- `email`: The user's email.
- `password`: The user's password.
- `username`: The user's username.

dbManager: {
admin: true,
email: 'john@example.com',
password: 'somepassword',
username: 'john'
}

## mailer

Configure how emails are being sent out by the system.

- `from`: Who the emails should appear to be sent from.
- `transport`: The mechanism used to send the email out.

The example below uses [Ethereal Mail](https://ethereal.email/ 'undefined') which can be useful during testing as the emails are not sent to users, but are held online so you can see what would have been sent out. Replace the auth credentials with your own account, or if using a different SMTP server, replace the host and port accordingly:

```js static
mailer: {
  from: 'nobody@example.com',
  transport: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'xxx@ethereal.email',
      pass: 'xxx',
    },
  }
}
```

## publicKeys

The whole config should not be available to `pubsweet-client` as it might include sensitive information (e.g. the secret). The `publicKeys` config option lets developers add a whitelist of keys that should be available in the client. To use this option, you need to use or copy our Webpack config.

```js static
publicKeys: \[
  'authsome',
  'pubsweet',
  'pubsweet-client',
  'validations'
\]
```

## pubsweet

- `components`: List of components in the system. It is necessary to add new PubSweet components here if they extend the system in some way.

```js static
pubsweet: {
  components: \[
    "pubsweet-component-login",
    "pubsweet-component-signup",
    "pubsweet-component-password-reset-backend",
    "pubsweet-component-password-reset-frontend"
  \]
}
```

## pubsweet-client

- `login-redirect`: Where you're redirected to after login.

```js static
'pubsweet-client': {
  'login-redirect': '/'
}
```

## pubsweet-server

- `baseUrl`: The base URL of the actual deployment (eg. _localhost:3ooo_ or _myapp.coko.foundation_)
- `db`: Database configuration options, which are simply passed to `node-postgres`. Check the package's [docs](https://node-postgres.com/api/pool 'undefined') for valid options.
- `enableExperimentalGraphql`: Toggles whether the graphql endpoint is registered on the server.
- `logger`: The logging mechanism (eg. a `winston` config).
- `port`: The port the server will run on.
- `secret`: The secret for signing web tokens.
- `uploads`: A filepath for the uploads folder.

```js static
'pubsweet-server': {
  baseUrl: 'localhost:3000',
  db: {
    database: 'mydb',
    password: 'mypass',
    port: 5432,
    user: 'myuser'
  },
  enableExperimentalGraphql: true,
  logger: new winston.Logger({
    transports: \[
      new winston.transports.Console({
        colorize: true,
      }),
    \],
  }),
  port: 3000,
  secret: 'notsosecret',
  uploads: 'uploads',
}
```

## Validations

Links to your type validations when writing to the database. PubSweet uses `joi` for validations.

```js static
validations: {
  fragment: {
    fragmentType: Joi.string(),
    kind: Joi.string(),
    title: Joi.string(),
    published: Joi.bool(),
    published\_at: Joi.string(),
    source: Joi.any(),
    presentation: Joi.string(),
  },
  collection: {
    title: Joi.string(),
  },
}
```

# Component configuration options

Components sometimes expect their own config options. Refer to each component's documentation for details. The most important thing to know is that the name of the component is the key.

```js static
'pubsweet-component-ink-backend': {
  inkEndpoint: 'http://ink.coko.foundation/'
  email: 'someuser@example.com',
  password: 'somepassword',
  recipes: {
    'editoria-typescript': 1
  }
}
```

# Custom configuration options

Beyond the above, you could add new configuration options and use them at will. This would be most useful when adding configuration options for your custom components. Nothing is stopping you, however, from adding extra options to existing keys.

```js static
'pubsweet-server': {
  'secret': 'notsosecret',
  'mycustomoption': true
},
'my-custom-component': {
  'enableFeature': false
}
```
