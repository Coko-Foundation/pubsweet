<div width="100%" align="center">
  <img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/rgb-medium.jpg" width="300" />
  <h2>The open toolkit for building publishing workflows</h2>
</div>

| [![MIT license](https://img.shields.io/badge/license-MIT-e51879.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/LICENSE) [![mattermost](https://img.shields.io/badge/mattermost_chat-coko%2Fpubsweet-blue.svg)](https://mattermost.coko.foundation/coko/channels/pubsweet) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


# Contents

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:0 orderedList:0 -->

- [Overview](#overview)
- [PubSweet packages](#pubsweet-packages)
- [Wiki](#wiki)
- [Support](#support)
- [Credits](#credits)

<!-- /TOC -->

# Overview

**PubSweet** allows you to build state-of-the-art publishing platforms.

It's a modular and flexible framework consisting of a **server** and **client** that work together, **components** that can modify or extend the functionality of the server and/or client, and a **command-line tool** that helps manage PubSweet apps.

## PubSweet packages (managed with Lerna)

| package                                                                                                                                                                                                              | description                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| [![pubsweet-server](https://img.shields.io/badge/PubSweet-server-51c1bc.svg?style=flat&colorA=84509d) pubsweet-server](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/server)                 | an extensible GraphQL API (+ custom REST endpoints needed for things like OAuth) that runs on the server |
| [![pubsweet-client](https://img.shields.io/badge/PubSweet-client-51c1bc.svg?style=flat&colorA=84509d) pubsweet-client](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/client)                 | an extensible frontend React app that runs in the browser                                                |
| [![pubsweet-components](https://img.shields.io/badge/PubSweet-components-51c1bc.svg?style=flat&colorA=84509d) pubsweet-components](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/components) | components for server and/or client                                                                      |
| [![pubsweet-cli](https://img.shields.io/badge/PubSweet-CLI-51c1bc.svg?style=flat&colorA=84509d) pubsweet cli](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/cli)                             | a suite of command-line tools for building and managing your platform                                    |
| [@pubsweet/logger](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/logger)                                                                                                                     | logging utility                                                                                          |
| [@pubsweet/db-manager](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/db-manager)                                                                                                             | utility for managing PubSweet databases                                                                  |

# Wiki

The [PubSweet Wiki](https://gitlab.coko.foundation/pubsweet/pubsweet/wikis/home) contains all of the documentation for the PubSweet framework.

The wiki answers most of the common questions around:

- Setting up your local environment
- Documentation of PubSweet components
- Using PubSweet components
- The PubSweet data model
- Technical terms
- Contributing

Additionally, we've collaboratively written (using Editoria, a PubSweet-based app), [a book about PubSweet](https://coko.foundation/books/).

# Support

- **If you have a general query about PubSweet**, or want to discuss anything with us, come and [chat to us in our Mattermost channel](https://mattermost.coko.foundation/coko/channels/pubsweet).

- **Bug reports and feature requests** belong in the issues of this monorepo.

# Projects using PubSweet

- [Editoria](https://gitlab.coko.foundation/editoria/editoria) - a book production platform built for University of California Press
- [Xpub](https://gitlab.coko.foundation/xpub/xpub) - Collabra, a journal publishing platform
- [elife-xpub](https://github.com/elifesciences/elife-xpub/) - A journal publishing platform in collaboration with eLife
- [Faraday](https://gitlab.coko.foundation/xpub/xpub-faraday) - A journal publishing platform in collaboration with Hindawi
- [Micropubs](https://gitlab.coko.foundation/micropubs/wormbase) - A micropublications platform in collaboration with Wormbase

# Credits

PubSweet is part of the [Collaborative Knowledge Foundation](https://coko.foundation) family.

<a href="https://coko.foundation"><img src="https://gitlab.coko.foundation/pubsweet/pubsweet/raw/master/assets/COKO_logo.jpg" width="300" /></a>
