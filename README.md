# PubSweet

[![build status](https://gitlab.coko.foundation/pubsweet/pubsweet/badges/master/build.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet/commits/master)
[![coverage report](https://gitlab.coko.foundation/pubsweet/pubsweet/badges/master/coverage.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet/commits/master)

## Overview

**PubSweet** allows you to build state-of-the-art publishing platforms. It's a modular and flexible framework consisting of:

- [pubsweet-backend](https://gitlab.coko.foundation/pubsweet/pubsweet-backend): an extensible back-end API that runs on the server
- [pubsweet-frontend](https://gitlab.coko.foundation/pubsweet/pubsweet-frontend): an extensible frontend app that runs in the browser
- [pubsweet-components](https://gitlab.coko.foundation/pubsweet/pubsweet-components): pluggable extensions for both back- and frontend
- [pubsweet](https://gitlab.coko.foundation/pubsweet/pubsweet): a suite of tools for building and managing your platform. `pubsweet` is the entry-point into the framework.

You can read more about the ideas behind PubSweet on [the Collaborative Knowledge Foundation blog](http://coko.foundation/blog.html#reimagine).

## Getting started

### Prerequisites

- node v6+
- npm v3+ (please do not use yarn yet, there is an known and unresolved issue with it in our case)

### Installation

`pubsweet` can be installed from npm:

```bash
npm install --global pubsweet
```

### Generating an app (`pubsweet new`)

The `new` subcommand generates a template PubSweet app for you to work from. This includes everything needed to run your publishing platform: dependencies, database setup, boilerplate code and configuration, and a set of initial components.

To generate an app, just provide the name:

```bash
pubsweet new myappname
```

`pubsweet` will create a subdirectory with the name you supplied, and start generating the app inside. It'll ask you a series of questions to customise your app. If you prefer to provide the answers in the initial command, you can do that instead.

Running `pubsweet help new` or `pubsweet new --help` shows you the available arguments for the command:

```
Usage: pubsweet-new [options] [name]

Options:

  -h, --help             output usage information
  --dev                  Setup app for development
  --username [string]    Admin username
  --email [string]       Admin email address
  --password [string]    Admin password
  --collection [string]  Initial collection title
```

### Running your app (`pubsweet run`)

The `run` subcommand starts your app. It takes care of transpilation, module bundling and process management.

To start your app:

**either** use the `run` command from the app directory:

```bash
cd myappname
pubsweet run
```

**or** provide the path to the `run` command:

```bash
pubsweet run path/to/myapp
```

# Contributing

Please read our [CONTRIBUTING](https://gitlab.coko.foundation/pubsweet/pubsweet/blob/master/CONTRIBUTING) guide.
