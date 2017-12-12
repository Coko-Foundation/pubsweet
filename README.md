<div width="100%" align="center">
  <img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/rgb-medium.jpg" width="300" />
  <h2>The open toolkit for building publishing workflows</h2>
</div>

| ![PubSweet home](https://img.shields.io/badge/PubSweet-home-51c1bc.svg?style=flat&colorA=84509d) [![MIT license](https://img.shields.io/badge/license-MIT-e51879.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/LICENSE) [![mattermost](https://img.shields.io/badge/mattermost_chat-coko%2Fpubsweet-blue.svg)](https://mattermost.coko.foundation/coko/channels/pubsweet) |
| :----: |

# Contents

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:0 orderedList:0 -->

- [Overview](#overview)
	- [PubSweet packages](#pubsweet-packages)
- [Getting started](#getting-started)
- [Support](#support)
- [Credits](#credits)

<!-- /TOC -->

# Overview

**PubSweet** allows you to build state-of-the-art publishing platforms.

It's a modular and flexible framework consisting of a **server** and **client** that work together, **components** that can modify or extend the functionality of the server and/or client, and a **command-line tool** that helps manage PubSweet apps.

## PubSweet packages (managed with Lerna)

| package | description |
| :-------- | :-------- |
| [![pubsweet-server](https://img.shields.io/badge/PubSweet-server-51c1bc.svg?style=flat&colorA=84509d) pubsweet-server](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/server) | an extensible RESTful API that runs on the server |
| [![pubsweet-client](https://img.shields.io/badge/PubSweet-client-51c1bc.svg?style=flat&colorA=84509d) pubsweet-client](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/client) | an extensible frontend app that runs in the browser |
| [![pubsweet-components](https://img.shields.io/badge/PubSweet-components-51c1bc.svg?style=flat&colorA=84509d) pubsweet-components](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/components) | components for server and/or client |
| [![pubsweet-cli](https://img.shields.io/badge/PubSweet-CLI-51c1bc.svg?style=flat&colorA=84509d) pubsweet cli](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/cli) | a suite of command-line tools for building and managing your platform |
| [pubsweet-theme-plugin](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/theme-plugin) | webpack plugin for theme support in PubSweet |
| [@pubsweet/logger](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/logger) | logging utility |
| [@pubsweet/db-manager](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/db-manager) | utility for managing PubSweet databases |

# Getting started

The entry-point into PubSweet is the `pubsweet` command-line tool: [pubsweet-cli](https://gitlab.coko.foundation/pubsweet/packages/pubsweet-cli).

# Support

- **If you have a general query about PubSweet**, or want to discuss anything with us, come and [chat to us in our Mattermost channel](https://mattermost.coko.foundation/coko/channels/pubsweet).

- **Bug reports and feature requests** belong in the issues of this monorepo.


# Projects using PubSweet

- [Editoria](https://gitlab.coko.foundation/editoria/editoria) - a book production platform built for University of California Press
- [Xpub](https://gitlab.coko.foundation/xpub/xpub) - a journal publishing platform

# Credits

PubSweet is part of the [Collaborative Knowledge Foundation](https://coko.foundation) family.

<a href="https://coko.foundation"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/COKO_logo.jpg" width="300" /></a>
