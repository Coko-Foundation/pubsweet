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
| [![pubsweet-server](https://img.shields.io/badge/PubSweet-server-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-server](https://gitlab.coko.foundation/pubsweet/pubsweet-server) | an extensible backend API that runs on the server |
| [![pubsweet-client](https://img.shields.io/badge/PubSweet-client-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-client](https://gitlab.coko.foundation/pubsweet/pubsweet-client) | an extensible frontend app that runs in the browser |
| [![pubsweet-components](https://img.shields.io/badge/PubSweet-components-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-components](https://gitlab.coko.foundation/pubsweet/pubsweet-components) | pluggable extensions for server and/or client |
| [![pubsweet-cli](https://img.shields.io/badge/PubSweet-CLI-51c1bc.svg?style=flat&colorA=84509d) pubsweet/pubsweet-cli](https://gitlab.coko.foundation/pubsweet/pubsweet-cli) | a suite of command-line tools for building and managing your platform |

# Getting started with PubSweet CLI

## Getting PubSweet CLI

### Prerequisites

- node v7.6+
- npm v3+ or yarn v0.21+

### Installation

The PubSweet command-line tools can be installed from npm or yarn:

```bash
npm install --global pubsweet
```

or

```bash
yarn global add pubsweet
```

## Using PubSweet CLI

### Displaying the commands (`pubsweet` or `pubsweet help`)

Outputs:

```
Usage: pubsweet [options] [command]


Commands:

  new         create and set up a new pubsweet app
  run         start a pubsweet app
  setupdb     generate a database for a pubsweet app
  add         add one or more components to a pubsweet app
  adduser     add a user to the database for a pubsweet app
  help [cmd]  display help for [cmd]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

For any command, you can see detailed usage help by running `pubsweet help cmd`, e.g.:

```bash
pubsweet help new
pubsweet help run
[...etc]
```

### Generating an app (`pubsweet new`)

The `new` subcommand generates a template PubSweet app for you to work from. This includes everything needed to run your publishing platform: dependencies, database setup, boilerplate code and configuration, and a set of initial components.

To generate an app, just provide the name:

```bash
pubsweet new myappname
```

`pubsweet` will create a subdirectory with the name you supplied, and start generating the app inside. It'll ask you a series of questions to customise your app. If you prefer to provide the answers in the initial command, you can do that instead:

```bash
pubsweet new myappname \
  --username someuser \
  --email some@email.com \
  --password correct-horse-battery-staple \
  --collection Articles
```

### Running your app (`pubsweet run`)

The `run` subcommand starts your app. It takes care of transpilation, module bundling and process management.

To start your app:

**either** use the `run` command from the app directory:

```bash
cd myappname
pubsweet run
```

**or** provide the app path to the `run` command:

```bash
pubsweet run path/to/myapp
```

### Setting up the database (`pubsweet setupdb`)

The `setupdb` subcommand creates the database for your app. It is usually used when you've cloned the source code of an existing app, or when you want to start over with a fresh database.

To generate a database for an app that doesn't have one yet:

```bash
pubsweet setupdb ./path/to/app/dir
```

By default this will generate a **production** database only. To generate a **dev** database, run the command with `--dev`:

```bash
pubsweet setupdb --dev ./path/to/app/dir
```

If your app already has a database, `pubsweet setupdb` will not overwrite it by default. You can force it to delete an existing database and overwrite it with a new one using `--clobber`:

```
$ pubsweet setupdb ./path/to/app/dir
info: Generating PubSweet app database at path api/db/production
error: Database appears to already exist
error: If you want to overwrite the database, use --clobber
$ pubsweet setupdb --clobber ./path/to/app/dir
info: Generating PubSweet app database at path api/db/production
info: Database appears to already exist
info: Overwriting existing database due to --clobber flag
info: setting up the database
info: building prompt
question:><Admin username><
[...etc]
```

As with `pubsweet new`, you can skip any or all of the interactive prompts by providing the user details with command-line flags:

```bash
pubsweet setupdb ./path/to/app/dir \
  --username someuser \
  --email some@email.com \
  --password correct-horse-battery-staple \
  --collection Articles
```

### Adding a user to the database (`pubsweet adduser`)

You can add a user to an existing database:

```bash
pubsweet adduser ./path/to/app/dir
```

You can optionally make that user an admin:

```bash
pubsweet adduser --admin ./path/to/app/dir
```

As with `pubsweet new` and `pubsweet setupdb`, you can skip any or all of the interactive prompts by providing the user details with command-line flags:

```bash
pubsweet adduser ./path/to/app/dir \
  --username someuser \
  --email some@email.com \
  --password correct-horse-battery-staple
```

# Contributing

Please read our [CONTRIBUTING](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/blob/master/CONTRIBUTING) guide.

# Credits

`pubsweet-cli` is part of the PubSweet ecosystem.

<a href="https://gitlab.coko.foundation/pubsweet/pubsweet"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/rgb-medium.jpg" width="300" /></a>

PubSweet is part of the [Collaborative Knowledge Foundation](https://coko.foundation) family.

<a href="https://coko.foundation"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/COKO_logo.jpg" width="300" /></a>
