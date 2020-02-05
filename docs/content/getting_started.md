## Install PubSweet and set up a new app

So you've decided to give PubSweet a try? Awesome! Let's get started! You'll need a couple of things installed on your development machine before you get started:

- `Node.js` (version 10 or higher, [installation instructions](https://nodejs.org/en/download/))
- `yarn` (version 1.15.2 or higher, [installation instructions](https://yarnpkg.com/lang/en/docs/install))
- `git`, [installation instructions](https://git-scm.com/downloads)
- `docker`, [installation instructions](https://docs.docker.com/install/)
- `docker-compose`, [installation instructions](https://docs.docker.com/compose/install/)

Once these are installed, you can install `pubsweet`, our command-line tool:

```bash
yarn global add pubsweet
```

In case you can't install yarn globally, type:

```bash
yarn add pubsweet
```

and it will install `pubsweet` in your home directory.

Then use it to create a new application:

```bash
pubsweet new yourAppName
```

You may get an error if the `pubsweet` executable is not in your `PATH`.
You may set the `PATH` environment variable or simply replace the command `pubsweet` with `yarn pubsweet`, like this:

```bash
yarn pubsweet new yourAppName
```

This will initialize a new PubSweet application based on [PubSweet starter](https://gitlab.coko.foundation/pubsweet/pubsweet-starter).

Once this is complete (it will also install the needed dependencies), you can start developing with PubSweet:

```bash
cd yourAppName
yarn start:services
```

This starts the required PostgreSQL database and ensures your app can connect to it. The last step is to run:

```bash
yarn pubsweet server
```

This starts your server and also compiles your client-side application and provides you with a live-reloaded environment for development.

Navigating to [http://localhost:3000](http://localhost:3000) you should see this text displayed:
<img src="hello-world.png" style="width: 100%;max-width: 700px; display: block;margin: 2em auto;">

There's a few components in this small application to help you get started: a login component (with password reset), a signup component, and a simple dashboard. We've also included a [small kitchen sink garden thing](http://localhost:3000/dashboard/kitchen-sink), showing the use of some `@pubsweet/ui` components.

**That should be it!** Please reach out on our [public channels](https://mattermost.coko.foundation/coko/channels/pubsweet) if things aren't going as planned (but also if they are! :).

Note: In development, the default username is `admin` and the default password is `password`. This user is automatically created for you when the application starts. See [dbManager configuration](/#/Getting%20started?id=dbmanager) for more information.

<br>
<br>
<br>
## Main concepts for your first app

`pubsweet-client` uses React. As such, it relies on an `app/app.js` file to serve as the `root` component, and a `app/routes.jsx` file to specify your app's routes. It also leverages popular libraries such as `webpack` and `react-router` to provide functionality for bundling and routing.

### Configuration

PubSweet provides options to configure your application by adding configuration files to a `config` folder you'll create in the root of your application. More on the files required and the different configuration options for PubSweet applications can be found in the following chapter.

### Running the application

Once you have your configuration set up, the application can be started. This is generally done using a script from `package.json`, which in turn executes `pubsweet start`.

## Configuring a PubSweet app

Configuration files for PubSweet applications exist inside the `config` folder in each application's root directory. [Node-config](https://github.com/lorenwest/node-config/ 'undefined') is used for handling different files for different environments. A good general file structure would be the following, sorted by reversed priority (for example, an option in a more specific file will overwrite the same option in the `default.js`):

- `default.js` defines options that apply to all environments
- `[ENVIRONMENT].js` defines options that apply to this environment only, but should be commited (eg. `development.js`, `production.js`)
- `local-environment.js` defines the options that apply to the local (and usually secret) setup of a specific environment. These files should be `gitignored`. (eg. `local-development.js`), and
- `custom-environment-variables.js` looks, by default, for environment variables.

Please refer to [Node-config's documentation](https://github.com/lorenwest/node-config 'undefined') for different options and extensions for the above.

## Configuration options

Let's take a look at the options that you will most likely need.

### Authsome

- `mode`: Declares where your authsome mode exists.

```js static
authsome: {
  // This should be either an npm package or an absolute path, not a relative path.
  mode: path.join(__dirname, 'auth.js'),
}
```

[See the Authsome chapter for more information.](/#/Authorization%20and%20permissions)

### dbManager

The options here will introduce a user to the database when `pubsweet setupdb` is run.

- `admin`: Whether the user is admin user or not.
- `email`: The user's email.
- `password`: The user's password.
- `username`: The user's username.

```js static
dbManager: {
  admin: true,
  email: 'john@example.com',
  password: 'somepassword',
  username: 'john'
}
```

### mailer

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

### publicKeys

The whole config should not be available to `pubsweet-client` as it might include sensitive information (e.g. the secret). The `publicKeys` config option lets developers add a whitelist of keys that should be available in the client (using starter's `webpack` configuration).

```js static
publicKeys: ['authsome', 'pubsweet', 'pubsweet-client', 'validations']
```

### pubsweet

- `components`: List of components in the system. It is necessary to add new PubSweet components here if they extend the system in some way.

```js static
pubsweet: {
  components: [
    'pubsweet-component-login',
    'pubsweet-component-signup',
    '@pubsweet/component-password-reset-server',
    '@pubsweet/component-password-reset-client',
  ]
}
```

### pubsweet-client

- `login-redirect`: Where you're redirected to after login.

```js static
'pubsweet-client': {
  'login-redirect': '/'
}
```

### pubsweet-server

- `baseUrl`: The base URL of the actual deployment (eg. _localhost:3ooo_ or _myapp.coko.foundation_)
- `db`: Database configuration options, which are simply passed to `node-postgres`. Check the package's [docs](https://node-postgres.com/api/pool 'undefined') for valid options.
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
  logger: require('winston')
  port: 3000,
  secret: 'notsosecret',
  uploads: 'uploads',
}
```

## Component configuration options

Components sometimes expect their own config options. Refer to each component's documentation for details. The most important thing to know is that the name of the component is the key.

## Custom configuration options

Beyond the above, you could add new configuration options and use them at will. This would be most useful when adding configuration options for your custom components.
