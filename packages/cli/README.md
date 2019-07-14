# PubSweet CLI (command line interface)

# Contents

- [Introduction](#introduction)
  - [PubSweet overview](#pubsweet-overview)
    - [PubSweet modules](#pubsweet-modules)
- [Getting started with PubSweet CLI](#getting-started-with-pubsweet-cli)
  - [Getting PubSweet CLI](#getting-pubsweet-cli)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Installation on Windows](#installation-on-windows)
    - [Quickstart](#quickstart)
  - [Using PubSweet CLI](#using-pubsweet-cli)
    - [Displaying the commands (`pubsweet` or `pubsweet help`)](#displaying-the-commands-pubsweet-or-pubsweet-help)
    - [Generating an app (`pubsweet new`)](#generating-an-app-pubsweet-new)
  - [Running locally for development or evaluation](#running-locally-for-development-or-evaluation)
  - [Running in production](#running-in-production)
    - [Setting up the database (`pubsweet setupdb`)](#setting-up-the-database-pubsweet-setupdb)
    - [Building your app (`pubsweet build`)](#building-your-app-pubsweet-build)
    - [Running your app](#running-your-app)
  - [Managing your app](#managing-your-app)
    - [Adding and removing components](#adding-and-removing-components)
    - [Adding a user to the database (`pubsweet adduser`)](#adding-a-user-to-the-database-pubsweet-adduser)
- [Contributing](#contributing)
- [Credits](#credits)⏎

# Introduction

## PubSweet overview

**PubSweet** allows you to build state-of-the-art publishing platforms.

It's a modular and flexible framework consisting of a **server** and **client**
that work together, **components** that can modify or extend the functionality
of the server and/or client, and a **command-line tool** that helps manage
PubSweet apps.

### PubSweet modules

| repository                                                                                                                                                                               | description                                                           |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| [![pubsweet-server](https://img.shields.io/badge/PubSweet-server-51c1bc.svg?style=flat&colorA=84509d) pubsweet-server](https://gitlab.coko.foundation/pubsweet/pubsweet/packages/server) | an extensible server API                                              |
| [![pubsweet-client](https://img.shields.io/badge/PubSweet-client-51c1bc.svg?style=flat&colorA=84509d) pubsweet-client](https://gitlab.coko.foundation/pubsweet/pubsweet/packages/client) | an extensible client app that runs in the browser                     |
| [![pubsweet-components](https://img.shields.io/badge/PubSweet-components-51c1bc.svg?style=flat&colorA=84509d) components](https://gitlab.coko.foundation/pubsweet/pubsweet/components)   | pluggable extensions for server and/or client                         |
| [![pubsweet-cli](https://img.shields.io/badge/PubSweet-CLI-51c1bc.svg?style=flat&colorA=84509d) pubsweet-cli](https://gitlab.coko.foundation/pubsweet/pubsweet/packages/cli)             | a suite of command-line tools for building and managing your platform |

# Getting started with PubSweet CLI

## Getting PubSweet CLI

### Prerequisites

- Node.js v10.0+
- Docker (recommended but not essential)

### Installation

The PubSweet command-line tools can be installed from npm or yarn:

```bash
npm install --global pubsweet
```

or

```bash
yarn global add pubsweet
```

### Installation on Windows

- Install Ubuntu on Windows:
  [Windows Store](https://www.microsoft.com/en-gb/store/p/ubuntu/9nblggh4msv6#system-requirements)
- Launch the Bash on Ubuntu on Windows from the Start menu
- Install nvm:
  [nvm install script](https://github.com/creationix/nvm#install-script)
- Restart your terminal/bash
- `nvm install 10`
- `npm install -g pubsweet`

### Quickstart

The sequence of commands for generating and running a sample app is as follows:

```bash
pubsweet new my-app-name
cd my-app-name
pubsweet start # (or yarn start)
```

## Using PubSweet CLI

### Displaying the commands (`pubsweet` or `pubsweet help`)

Outputs:

```
Usage: pubsweet [options] [command]


Commands:

  new         create and set up a new pubsweet app
  setupdb     generate a database for a pubsweet app
  build       build static assets for a pubsweet app
  start       start pubsweet server and backing services
  server      build static assets and start a pubsweet app
  adduser     add a user to the database for a pubsweet app
  help [cmd]  display help for [cmd]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
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

## Running locally for development or evaluation

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

## Running in production

### Setting up the database (`pubsweet setupdb`)

You need an instance of PostgreSQL 9.6+. Add your database connection settings
to the `pubsweet-server.db` key in the config in any format supported by
[node-postgres](https://github.com/brianc/node-postgres).

```bash
cd myappname
pubsweet setupdb
```

If your database already has tables, `pubsweet setupdb` will not overwrite them
by default. You can force it to delete existing data using `--clobber`:

```
$ pubsweet setupdb
error: Database tables already exist
error: If you want to overwrite the database, use --clobber

$ pubsweet setupdb --clobber
info: Database tables already exist
info: Overwriting existing database due to --clobber flag
info: Setting up the database
question:><Admin username><
[...etc]
```

The command will prompt you with a series of questions to customise your app. If
you prefer to provide the answers in the initial command, you can do that
instead:

```bash
pubsweet setupdb
  --username someuser \
  --email some@email.com \
  --password correct-horse-battery-staple
```

### Building your app (`pubsweet build`)

Use the `build` subcommand within your app directory to compile your app's
static assets with webpack. This command is useful for production scenarios
where assets need to be compiled in a separate step. For development, we
recommend using `pubsweet start`, which also takes care of building your assets.

### Running your app

A sample startup script is included in the root directory of the
`pubsweet-starter` repo (`app.js`).

Ensure that the `NODE_ENV` environment variable is set to `production`.

## Managing your app

### Adding and removing components

Components add models, UI, APIs, jobs, and much more to PubSweet. There are a number in core (https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/components), and you can create your own.

To add or remove a component, install it via `yarn add component-name` (or `yarn remove` to uninstall) and edit `config/components.json` in your app's directory accordingly.

### Adding a user to the database (`pubsweet adduser`)

Run `adduser` within your app directory to add a user to an existing database:

```bash
cd myappname
pubsweet adduser
```

You can optionally make that user an admin:

```bash
pubsweet adduser --admin
```

As with `pubsweet setupdb`, you can skip any or all of the interactive prompts
by providing the user details with command-line flags:

```bash
pubsweet adduser \
  --username someuser \
  --email some@email.com \
  --password correct-horse-battery-staple
```

# Contributing

Please read our
[CONTRIBUTING](https://gitlab.coko.foundation/pubsweet/pubsweet/blob/master/CONTRIBUTING)
guide.

# Credits

`pubsweet-cli` is part of the PubSweet ecosystem.

<a href="https://gitlab.coko.foundation/pubsweet/pubsweet"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/rgb-medium.jpg" width="300" /></a>

PubSweet is part of [Collaborative Knowledge Foundation](https://coko.foundation).

<a href="https://coko.foundation"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/COKO_logo.jpg" width="300" /></a>
