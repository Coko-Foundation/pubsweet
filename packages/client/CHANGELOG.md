# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="6.0.1"></a>
## [6.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@6.0.0...pubsweet-client@6.0.1) (2018-10-08)




**Note:** Version bump only for package pubsweet-client

<a name="6.0.0"></a>
# [6.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@5.0.2...pubsweet-client@6.0.0) (2018-09-29)


### Features

* add global property to team ([81b2a7b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/81b2a7b)), closes [#424](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/424)


### BREAKING CHANGES

* Teams now have a built-in global property meant to distinguish between object-based
teams and global teams. Previously a global team was defined as a team missing its object, but since
that is ambiguous, i.e. an object can be missing for several reasons - a global property is much
more straight-forward. If you were already using a .global property on Team in your app, your app
will break as the GraphQL schema will conflict.




<a name="5.0.2"></a>
## [5.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@5.0.1...pubsweet-client@5.0.2) (2018-09-27)




**Note:** Version bump only for package pubsweet-client

<a name="5.0.1"></a>
## [5.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@5.0.0...pubsweet-client@5.0.1) (2018-09-25)




**Note:** Version bump only for package pubsweet-client

<a name="5.0.0"></a>
# [5.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.2.2...pubsweet-client@5.0.0) (2018-09-20)


### Features

* add base-model package for standalone data models ([fc446e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc446e8)), closes [#395](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/395)


### BREAKING CHANGES

* In PubSweet server, the exported thing is no longer startServer directly, but it's
now part of the exported object. This will break applications that use the equivalent of const
startServer = require('pubsweet-server'). The new method for getting a startServer is const {
startServer } = require('pubsweet-server').




<a name="4.2.2"></a>
## [4.2.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.2.1...pubsweet-client@4.2.2) (2018-09-19)


### Bug Fixes

* get current user in authorize component ([ae773fa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ae773fa))




<a name="4.2.1"></a>
## [4.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.2.0...pubsweet-client@4.2.1) (2018-09-06)




**Note:** Version bump only for package pubsweet-client

<a name="4.2.0"></a>
# [4.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.3...pubsweet-client@4.2.0) (2018-09-04)


### Bug Fixes

* **client:** create a new authsome instance if not supplied ([fcc5423](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fcc5423))
* **client:** fix graphql queries ([3003c50](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3003c50))
* **client:** initialize an authsome mode from config if not supplied ([e0b7416](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e0b7416))
* use named graphql queries ([03e5656](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/03e5656))
* **subscriptions:** get token from local storage on each reconnect ([68dabdc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/68dabdc))


### Features

* **client:** add AuthorizeWithGraphQL ([57eca9a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/57eca9a))




<a name="4.1.3"></a>
## [4.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.2...pubsweet-client@4.1.3) (2018-08-23)


### Bug Fixes

* fixed minor mistake ([cbe6d75](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cbe6d75))




<a name="4.1.2"></a>
## [4.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.1...pubsweet-client@4.1.2) (2018-08-22)


### Bug Fixes

* fixed websocket protocol over https ([2235990](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2235990))




<a name="4.1.1"></a>
## [4.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.0...pubsweet-client@4.1.1) (2018-08-20)




**Note:** Version bump only for package pubsweet-client

<a name="4.1.0"></a>
# [4.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.5...pubsweet-client@4.1.0) (2018-08-17)


### Bug Fixes

* **authorize:** fix for correct props propagation ([5de8ea8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5de8ea8))
* **graphql:** disable authentication for websocket link ([06305c7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/06305c7))
* **server:** use the existing http server for subscriptions ([c5d1362](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c5d1362))
* **test:** fix Root test in client ([c6ed350](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c6ed350))
* **warnings:** naming changes ([e4727ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4727ad))


### Features

* **graphql:** add subscription support to graphql ([d71b0c6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d71b0c6))
* **graphql:** enable authentication over the websocket ([98c9e6d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98c9e6d))
* **graphql:** get hostname from variables ([64b7c4f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/64b7c4f))
* **graphql:** make connection to websocket optional ([695f1bb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/695f1bb))




<a name="4.0.5"></a>
## [4.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.4...pubsweet-client@4.0.5) (2018-08-02)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.4"></a>
## [4.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.3...pubsweet-client@4.0.4) (2018-07-27)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.3"></a>
## [4.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.2...pubsweet-client@4.0.3) (2018-07-12)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.2"></a>
## [4.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.1...pubsweet-client@4.0.2) (2018-07-09)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.1"></a>
## [4.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.0...pubsweet-client@4.0.1) (2018-07-03)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.0"></a>
# [4.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.3...pubsweet-client@4.0.0) (2018-07-02)


### Features

* **ui:** introduce more line height variables ([85c24e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/85c24e2))


### BREAKING CHANGES

* **ui:** the existing fontLineHeight variable is gone and replaced by multiple new variables




<a name="3.0.3"></a>
## [3.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.2...pubsweet-client@3.0.3) (2018-06-28)




**Note:** Version bump only for package pubsweet-client

<a name="3.0.2"></a>
## [3.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.1...pubsweet-client@3.0.2) (2018-06-28)


### Bug Fixes

* **authorize:** render function component ([cebdaa3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cebdaa3))
* **authsome:** change names to tests and function ([3f3559c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3f3559c))




<a name="3.0.1"></a>
## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.0...pubsweet-client@3.0.1) (2018-06-19)


### Bug Fixes

* **pubsweet-ui:** tests are failing ([0e57798](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0e57798))




<a name="3.0.0"></a>
# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.5...pubsweet-client@3.0.0) (2018-06-01)


### Features

* **ui:** start ui-toolkit module ([2083b9c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2083b9c))


### BREAKING CHANGES

* **ui:** th now comes from the toolkit, so all th imports from ui are now broken




<a name="2.5.5"></a>
## [2.5.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.4...pubsweet-client@2.5.5) (2018-05-21)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.4"></a>
## [2.5.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.3...pubsweet-client@2.5.4) (2018-05-18)


### Bug Fixes

* use one file at monorepo root ([456f49b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/456f49b))




<a name="2.5.3"></a>
## [2.5.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.2...pubsweet-client@2.5.3) (2018-05-10)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.2"></a>
## [2.5.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.1...pubsweet-client@2.5.2) (2018-05-09)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.1"></a>
## [2.5.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.0...pubsweet-client@2.5.1) (2018-05-03)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.0"></a>
# [2.5.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.4.1...pubsweet-client@2.5.0) (2018-04-25)


### Features

* **client:** add support for Team SSE ([429d113](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/429d113))




<a name="2.4.1"></a>
## [2.4.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.4.0...pubsweet-client@2.4.1) (2018-04-24)


### Bug Fixes

* **authenticated-component:** redirect to next path ([fbde445](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fbde445))




<a name="2.4.0"></a>
# [2.4.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.3.1...pubsweet-client@2.4.0) (2018-04-11)


### Features

* enable the Apollo client to be customised ([0546acc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0546acc))




<a name="2.3.1"></a>
## [2.3.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.3.0...pubsweet-client@2.3.1) (2018-03-30)




**Note:** Version bump only for package pubsweet-client

<a name="2.3.0"></a>
# [2.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.6...pubsweet-client@2.3.0) (2018-03-28)


### Bug Fixes

* **client:** add tests to graphql HOCs ([440bb4b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/440bb4b))


### Features

* **client:** add Apollo Client ([2fe9d93](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2fe9d93))




<a name="2.2.6"></a>
## [2.2.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.5...pubsweet-client@2.2.6) (2018-03-28)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.5"></a>
## [2.2.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.4...pubsweet-client@2.2.5) (2018-03-27)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.4"></a>
## [2.2.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.3...pubsweet-client@2.2.4) (2018-03-19)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.3"></a>
## [2.2.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.2...pubsweet-client@2.2.3) (2018-03-15)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.2"></a>

## [2.2.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.1...pubsweet-client@2.2.2) (2018-03-09)

**Note:** Version bump only for package pubsweet-client

<a name="2.2.1"></a>

## [2.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.0...pubsweet-client@2.2.1) (2018-03-06)

### Bug Fixes

* **client:** add ui dependency ([cc1a8ae](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cc1a8ae))

<a name="2.2.0"></a>

# [2.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.1.1...pubsweet-client@2.2.0) (2018-03-05)

### Bug Fixes

* downgrade styled-components dependency in pubsweet-client ([718558e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/718558e))
* update Root to use new StyleRoot component ([9d4c0ef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9d4c0ef))

### Features

* **normalize:** add normalize css ([9eb24e5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9eb24e5))
* **ui:** add theming to Tags ([ee959d2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee959d2))

<a name="2.1.1"></a>

## [2.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.1.0...pubsweet-client@2.1.1) (2018-02-16)

### Bug Fixes

* **client:** remove unused dependency on login component ([6c5dd97](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6c5dd97))

<a name="2.1.0"></a>

# [2.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.0.0...pubsweet-client@2.1.0) (2018-02-08)

### Features

* **client:** add styled components ([43ab2c5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/43ab2c5))

<a name="2.0.0"></a>

# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@1.1.4...pubsweet-client@2.0.0) (2018-02-02)

### Features

* **client:** upgrade React to version 16 ([626cf59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/626cf59)), closes [#65](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/65)

### BREAKING CHANGES

* **client:** Upgrade React to version 16
