PubSweet CLI (using `pubsweet` or `pubsweet help`) outputs:

```md
Usage: pubsweet [options][command]

Commands:

new create and set up a new pubsweet app
build build static assets for a pubsweet app
start start pubsweet server and backing services
server build static assets and start a pubsweet app
help [cmd] display help for [cmd]

Options:

-h, --help output usage information
-V, --version output the version number
```

For any command, you can see detailed usage help by running `pubsweet help cmd`,
e.g.:

```bash
pubsweet help new
pubsweet help start
[...etc]
```

### Generating an app (`pubsweet new`)

The `new` subcommand generates a template PubSweet app for you to work from.
This includes dependencies, boilerplate code and configuration, and a set of
initial components.

To generate an app, just provide the name:

```bash
pubsweet new myappname
```

`pubsweet` will clone the template app from GitLab (pubsweet-starter) into a
subdirectory with the name you supplied, and run `yarn install` to install the
app's dependencies.

### Running locally for development or evaluation

```bash
cd myappname
pubsweet start
```

Use the `start` subcommand within your app directory to start your app. Open a
browser and navigate to http://localhost:3000. A default user account is
created for you: username `admin`, password `password`.

Under the hood, `pubsweet start` uses Docker Compose to:

- start the backing services (database)
- set up the database if necessary, including a default admin user (`pubsweet setupdb`)
- build static assets with Webpack (`pubsweet build`)
- and start the PubSweet server application (`pubsweet server`)

Additionally it uses Forever and Webpack watch mode to recompile and reload when
changes are detected.

Forever is initialised to watch for changes in the config directory by default.
To manually configure forever, add settings under the `forever` key in config
(see forever's documentation for which settings are available)

The details for the default admin user can be supplied in a config file, via
environment variable or on the command line using
[node-config](https://github.com/lorenwest/node-config/wiki/Command-Line-Overrides).
See `config/development.js` in the starter application.

`pubsweet start` is not recommended for production, where it is generally
preferable to compile assets separately and maintain a startup script in your
app. A sample startup script is included in the root directory of the
`pubsweet-starter` repo (`app.js`).

### Running in production

#### Setting up the database

`pubsweet setupdb` is now deprecated. To setup the database you can now use seeding scripts like the example [here](https://gitlab.coko.foundation/micropublication/micropublication/blob/master/scripts/setupDb.sh).

#### Building your app (`pubsweet build`)

Use the `build` subcommand within your app directory to compile your app's
static assets with webpack. This command is useful for production scenarios
where assets need to be compiled in a separate step. For development, we
recommend using `pubsweet start`, which also takes care of building your assets.

#### Running your app

A sample startup script is included in the root directory of the
`pubsweet-starter` repo (`app.js`).

Ensure that the `NODE_ENV` environment variable is set to `production`.

### Managing your app

#### Adding and removing components

Components add models, UI, APIs, jobs, and much more to PubSweet. There are a number in core (https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/components), and you can create your own.

To add or remove a component, install it via `yarn add component-name` (or `yarn remove` to uninstall) and edit `config/components.json` in your app's directory accordingly.

#### Adding a user to the database

`pubsweet adduser` command is now deprecated. To add users to the database you can use seeding scripts like in the example [here](https://gitlab.coko.foundation/micropublication/micropublication/blob/master/scripts/seedUsers.js).
