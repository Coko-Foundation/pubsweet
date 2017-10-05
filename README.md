<div width="100%" align="center">
  <h1>PubSweet CLI</h1>
  <h2>command-line tools for managing PubSweet apps</h2>
</div>

| ![PubSweet home](https://img.shields.io/badge/PubSweet-CLI-51c1bc.svg?style=flat&colorA=84509d) [![MIT license](https://img.shields.io/badge/license-MIT-e51879.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/LICENSE) [![npm](https://img.shields.io/npm/v/pubsweet.svg)](https://npmjs.com/package/pubsweet) [![build status](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/badges/master/build.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/commits/master) [![coverage report](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/badges/master/coverage.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/commits/master) [![code style standard](https://img.shields.io/badge/code%20style-standard-green.svg)](https://standardjs.com/) [![mattermost chat](https://img.shields.io/badge/mattermost_chat-coko%2Fpubsweet-blue.svg)](https://mattermost.coko.foundation/coko/channels/pubsweet) |
| :----: |

# Contents

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:0 orderedList:0 -->
- [Introduction](#introduction)
	- [PubSweet overview](#pubsweet-overview)
		- [PubSweet modules](#pubsweet-modules)
- [Getting started with PubSweet CLI](#getting-started-with-pubsweet-cli)
	- [Getting PubSweet CLI](#getting-pubsweet-cli)
		- [Prerequisites](#prerequisites)
		- [Installation](#installation)
		- [Installation on Windows](#installation-on-windows)
	- [Using PubSweet CLI](#using-pubsweet-cli)
		- [Displaying the commands (`pubsweet` or `pubsweet help`)](#displaying-the-commands-pubsweet-or-pubsweet-help)
		- [Generating an app (`pubsweet new`)](#generating-an-app-pubsweet-new)
		- [Running your app (`pubsweet run`)](#running-your-app-pubsweet-run)
		- [Setting up the database (`pubsweet setupdb`)](#setting-up-the-database-pubsweet-setupdb)
		- [Adding a user to the database (`pubsweet adduser`)](#adding-a-user-to-the-database-pubsweet-adduser)
- [Contributing](#contributing)

<!-- /TOC -->

# Introduction

## PubSweet overview

**PubSweet** allows you to build state-of-the-art publishing platforms.

It's a modular and flexible framework consisting of a **server** and **client** that work together, **components** that can modify or extend the functionality of the server and/or client, and a **command-line tool** that helps manage PubSweet apps.

### PubSweet modules

| repository | description |
| :-------- | :-------- |
| [![pubsweet-server](https://img.shields.io/badge/PubSweet-server-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-server](https://gitlab.coko.foundation/pubsweet/pubsweet-server) | an extensible server API that runs on the server |
| [![pubsweet-client](https://img.shields.io/badge/PubSweet-client-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-client](https://gitlab.coko.foundation/pubsweet/pubsweet-client) | an extensible client app that runs in the browser |
| [![pubsweet-components](https://img.shields.io/badge/PubSweet-components-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-components](https://gitlab.coko.foundation/pubsweet/pubsweet-components) | pluggable extensions for server and/or client |
| [![pubsweet-cli](https://img.shields.io/badge/PubSweet-CLI-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-cli](https://gitlab.coko.foundation/pubsweet/pubsweet-cli) | a suite of command-line tools for building and managing your platform |

# Getting started with PubSweet CLI

## Getting PubSweet CLI

### Prerequisites

- Node.js v7.6+
- yarn v0.21+

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

- Install Ubuntu on Windows: [Windows Store](https://www.microsoft.com/en-gb/store/p/ubuntu/9nblggh4msv6#system-requirements)
- Launch the Bash on Ubuntu on Windows from the Start menu
- Install nvm: [nvm install script](https://github.com/creationix/nvm#install-script)

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

- Restart your terminal/bash
- `nvm install 7.7` (this version of Node.js is the latest to have precompiled leveldown packages)
- `npm install -g pubsweet`

### Quickstart

The sequence of commands for generating and running a sample app is as follows:

```bash
pubsweet new my-app-name
cd my-app-name
pubsweet setupdb # (or npm run setupdb) 
pubsweet start # (or npm start)
```

## Using PubSweet CLI

### Displaying the commands (`pubsweet` or `pubsweet help`)

Outputs:

```
Usage: pubsweet [options] [command]


Commands:

  new         create and set up a new pubsweet app
  start       start a pubsweet app
  setupdb     generate a database for a pubsweet app
  add         add one or more components to a pubsweet app
  remove      remove one or more components from a pubsweet app
  adduser     add a user to the database for a pubsweet app
  help [cmd]  display help for [cmd]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

For any command, you can see detailed usage help by running `pubsweet help cmd`, e.g.:

```bash
pubsweet help new
pubsweet help start
[...etc]
```

### Generating an app (`pubsweet new`)

The `new` subcommand generates a template PubSweet app for you to work from. This includes dependencies, boilerplate code and configuration, and a set of initial components.

To generate an app, just provide the name:

```bash
pubsweet new myappname
```

`pubsweet` will clone the template app from GitLab (pubsweet-starter) into a subdirectory with the name you supplied, and run `yarn install` to install the app's dependencies. 

### Setting up the database (`pubsweet setupdb`)

Run the `setupdb` subcommand within your app directory to:
- create the database for your app
- create a secret in config/local.json (required by the server)

```bash
cd myappname
pubsweet setupdb
```

This will add the secret to config/local.json and generate a database at `pubsweet-server.dbPath`.

```bash
pubsweet setupdb
```

If your app already has a database, `pubsweet setupdb` will not overwrite it by default. You can force it to delete an existing database and overwrite it with a new one using `--clobber`:

```
$ pubsweet setupdb
info: Generating PubSweet app database at api/db/production
error: Database already exists
error: If you want to overwrite the database, use --clobber

$ pubsweet setupdb --clobber
info: Generating PubSweet app database at api/db/production
info: Database already exists
info: Overwriting existing database due to --clobber flag
info: Setting up the database
question:><Admin username><
[...etc]
```

The command will prompt you with a series of questions to customise your app. If you prefer to provide the answers in the initial command, you can do that instead:

```bash
pubsweet setupdb
  --username someuser \
  --email some@email.com \
  --password correct-horse-battery-staple \
  --collection Articles
```

### Running your app (`pubsweet start`)

Use the `start` subcommand within your app directory to start your app. It takes care of transpilation, module bundling and process management (using `forever`).

```bash
cd myappname
pubsweet start
```

Forever is initialised to watch for changes in the config directory by default. To manually configure forever, add settings under the `forever` key in config (see forever's documentation for which settings are available) 

`start` can also be passed `--reduxlog-off` to switch off the redux logger.

### Adding and removing components (`pubsweet add`, `pubsweet remove`)

Components add pages, actions, and behaviors to pubsweet. There are many we have bundled by default, and you can create your own. To learn more about components,
[read the documentation](https://pubsweet.org/docs/components).

Run `add` or `remove` within your app directory, followed by one or more components, to add and remove components. These subcommands use `yarn` to add or remove the components and updates the configuration for your app accordingly.

```bash
cd myappname
pubsweet add users-manager items-manager
pubsweet remove users-manager items-manager
```

Find all available components by typing:

```bash
pubsweet components
```

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

As with `pubsweet setupdb`, you can skip any or all of the interactive prompts by providing the user details with command-line flags:

```bash
pubsweet adduser \
  --username someuser \
  --email some@email.com \
  --password correct-horse-battery-staple
```

# Contributing

Please read our [CONTRIBUTING](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/blob/master/CONTRIBUTING) guide.

### Tests

Note that integration tests found in the file `./tests/integration.js` will run tests against the globally installed `pubsweet` binary. You can replace the globally installed `pubsweet` with the current repository by running `yarn link`. No tests outside this file require the globally installed binary. 

# Credits

`pubsweet-cli` is part of the PubSweet ecosystem.

<a href="https://gitlab.coko.foundation/pubsweet/pubsweet"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/rgb-medium.jpg" width="300" /></a>

PubSweet is part of the [Collaborative Knowledge Foundation](https://coko.foundation) family.

<a href="https://coko.foundation"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/COKO_logo.jpg" width="300" /></a>

