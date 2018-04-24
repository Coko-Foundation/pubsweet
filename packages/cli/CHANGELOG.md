# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

  <a name="2.2.0"></a>
# [2.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.8...pubsweet@2.2.0) (2018-04-24)


### Features

* **components:** create invite reviewer endpoints ([4269fbe](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4269fbe))




  <a name="2.1.8"></a>
## [2.1.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.7...pubsweet@2.1.8) (2018-04-11)


### Bug Fixes

* **cli:** fail early when database exists and clobber not set ([67dbe20](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/67dbe20))
* **test:** set the clobber option for setupdb test ([bb81d21](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb81d21))
* add back clobber undefined to false override ([c966115](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c966115))




<a name="2.1.7"></a>
## [2.1.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.6...pubsweet@2.1.7) (2018-04-03)




**Note:** Version bump only for package pubsweet

<a name="2.1.6"></a>
## [2.1.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.5...pubsweet@2.1.6) (2018-03-30)




**Note:** Version bump only for package pubsweet

<a name="2.1.5"></a>
## [2.1.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.4...pubsweet@2.1.5) (2018-03-28)




**Note:** Version bump only for package pubsweet

<a name="2.1.4"></a>
## [2.1.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.3...pubsweet@2.1.4) (2018-03-27)


### Bug Fixes

* **cli:** create admin user with setupdb ([46992d9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/46992d9))




<a name="2.1.3"></a>
## [2.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.2...pubsweet@2.1.3) (2018-03-19)




**Note:** Version bump only for package pubsweet

<a name="2.1.2"></a>
## [2.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.1...pubsweet@2.1.2) (2018-03-15)




**Note:** Version bump only for package pubsweet

<a name="2.1.1"></a>

## [2.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.1.0...pubsweet@2.1.1) (2018-03-09)

### Bug Fixes

* **xpub:** tests ([cec85e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cec85e2))

<a name="2.1.0"></a>

# [2.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@2.0.0...pubsweet@2.1.0) (2018-03-05)

### Bug Fixes

* **cli:** fix loop for making cmd list ([51ebd3b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/51ebd3b)), closes [#107](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/107) [#114](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/114)

### Features

* **cli:** show help when unknown command is used ([7a92e1e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7a92e1e)), closes [#107](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/107) [#114](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/114)

<a name="2.0.0"></a>

# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@1.1.9...pubsweet@2.0.0) (2018-02-23)

### Bug Fixes

* **cli:** typo ([a403cc0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a403cc0))

### Features

* switch to PostgreSQL ([d459299](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d459299))

### BREAKING CHANGES

* All data is now persisted in a PostgreSQL database instead of PouchDB
* Database server must be running and have an existing database before running `pubsweet setupdb` (Docker config provided)
`pubsweet start` runs `npm start` script if found and falls back to `pubsweet server`
`pubsweet server` starts the PubSweet server (like the old `pubsweet start`)
`pubsweet-server` model API is unchanged

<a name="1.1.9"></a>

## [1.1.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@1.1.8...pubsweet@1.1.9) (2018-02-16)

**Note:** Version bump only for package pubsweet

<a name="1.1.8"></a>

## [1.1.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet@1.1.7...pubsweet@1.1.8) (2018-02-02)

**Note:** Version bump only for package pubsweet
