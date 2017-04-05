# PubSweet

[![build status](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/badges/master/build.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/commits/master)
[![coverage report](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/badges/master/coverage.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/commits/master)

## Overview

**PubSweet** allows you to build state-of-the-art publishing platforms. It's a modular and flexible framework consisting of:

- [pubsweet-server](https://gitlab.coko.foundation/pubsweet/pubsweet-server): an extensible back-end API that runs on the server
- [pubsweet-client](https://gitlab.coko.foundation/pubsweet/pubsweet-client): an extensible frontend app that runs in the browser
- [pubsweet-components](https://gitlab.coko.foundation/pubsweet/pubsweet-components): pluggable extensions for both back- and frontend
- [pubsweet-cli](https://gitlab.coko.foundation/pubsweet/pubsweet-cli): a suite of tools for building and managing your platform. `pubsweet-cli` is generally the entry-point into the framework.

For a high-level overview of PubSweet , and to follow discussion and issues about the project as a whole, there's the [pubsweet](https://gitlab.coko.foundation/pubsweet/pubsweet) repository.

You can read more about the ideas behind PubSweet on [the Collaborative Knowledge Foundation blog](http://coko.foundation/blog.html#reimagine).

## Getting started

### Prerequisites

- node v6+
- npm v3+ or yarn v0.22+

### Installation

`pubsweet-cli` can be installed from npm or yarn:

```bash
npm install --global pubsweet
```

or

```bash
yarn global add pubsweet
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

Please read our [CONTRIBUTING](https://gitlab.coko.foundation/pubsweet/pubsweet-cli/blob/master/CONTRIBUTING) guide.
