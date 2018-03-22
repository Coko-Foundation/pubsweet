# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

  <a name="2.0.3"></a>
## [2.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@2.0.2...pubsweet-server@2.0.3) (2018-03-19)


### Bug Fixes

* **server:** cast booleans to string when filtering ([25f55c3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/25f55c3))




  <a name="2.0.2"></a>
## [2.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@2.0.1...pubsweet-server@2.0.2) (2018-03-15)




**Note:** Version bump only for package pubsweet-server

<a name="2.0.1"></a>

## [2.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@2.0.0...pubsweet-server@2.0.1) (2018-03-09)

### Bug Fixes

* **server:** return file url from upload mutation ([e10a10f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e10a10f))

<a name="2.0.0"></a>

# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@1.1.1...pubsweet-server@2.0.0) (2018-02-23)

### Features

* **server:** GraphQL endpoint improvements ([6b2858c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6b2858c))
* **server:** upload handling via GraphQL ([15b92e0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/15b92e0))
* switch to PostgreSQL ([d459299](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d459299))

### BREAKING CHANGES

* All data is now persisted in a PostgreSQL database instead of PouchDB
* Database server must be running and have an existing database before running `pubsweet setupdb` (Docker config provided)
`pubsweet start` runs `npm start` script if found and falls back to `pubsweet server`
`pubsweet server` starts the PubSweet server (like the old `pubsweet start`)
`pubsweet-server` model API is unchanged
* **server:** introduce pubsweet-server.uploads config value to specify location of uploaded files
Split GraphQL endpoint tests into separate files
Small refactor of api helper

<a name="1.1.1"></a>

## [1.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@1.1.0...pubsweet-server@1.1.1) (2018-02-16)

**Note:** Version bump only for package pubsweet-server

<a name="1.1.0"></a>

# [1.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@1.0.7...pubsweet-server@1.1.0) (2018-02-02)

### Features

* **server:** add GraphQL endpoint with basic queries ([71383e3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/71383e3)), closes [#317](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/317)
