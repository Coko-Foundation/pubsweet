# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.1.0...@pubsweet/db-manager@2.1.1) (2018-11-30)

**Note:** Version bump only for package @pubsweet/db-manager





# [2.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.9...@pubsweet/db-manager@2.1.0) (2018-11-29)


### Features

* **migration:** change temp dir to pubsweet migrate cwd ([1f30625](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1f30625))





      <a name="2.0.9"></a>
## [2.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.8...@pubsweet/db-manager@2.0.9) (2018-11-13)




**Note:** Version bump only for package @pubsweet/db-manager

      <a name="2.0.8"></a>
## [2.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.7...@pubsweet/db-manager@2.0.8) (2018-11-05)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="2.0.7"></a>
## [2.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.6...@pubsweet/db-manager@2.0.7) (2018-10-17)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="2.0.6"></a>
## [2.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.5...@pubsweet/db-manager@2.0.6) (2018-10-08)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="2.0.5"></a>
## [2.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.4...@pubsweet/db-manager@2.0.5) (2018-09-29)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="2.0.4"></a>
## [2.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.3...@pubsweet/db-manager@2.0.4) (2018-09-28)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="2.0.3"></a>
## [2.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.2...@pubsweet/db-manager@2.0.3) (2018-09-27)


### Bug Fixes

* fixing a release with unstaged changes ([db2cdd3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/db2cdd3))




<a name="2.0.2"></a>
## [2.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.1...@pubsweet/db-manager@2.0.2) (2018-09-27)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="2.0.1"></a>
## [2.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@2.0.0...@pubsweet/db-manager@2.0.1) (2018-09-25)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="2.0.0"></a>
# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.4.0...@pubsweet/db-manager@2.0.0) (2018-09-20)


### Features

* add base-model package for standalone data models ([fc446e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc446e8)), closes [#395](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/395)


### BREAKING CHANGES

* In PubSweet server, the exported thing is no longer startServer directly, but it's
now part of the exported object. This will break applications that use the equivalent of const
startServer = require('pubsweet-server'). The new method for getting a startServer is const {
startServer } = require('pubsweet-server').




<a name="1.4.0"></a>
# [1.4.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.3.2...@pubsweet/db-manager@1.4.0) (2018-09-19)


### Features

* **server:** remove require-relative ([38a8f50](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/38a8f50))




<a name="1.3.2"></a>
## [1.3.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.3.1...@pubsweet/db-manager@1.3.2) (2018-09-04)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.3.1"></a>
## [1.3.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.3.0...@pubsweet/db-manager@1.3.1) (2018-08-20)


### Bug Fixes

* drop tables in one query ([11179ea](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/11179ea))




<a name="1.3.0"></a>
# [1.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.2.1...@pubsweet/db-manager@1.3.0) (2018-08-17)


### Bug Fixes

* clobbering tables ([d4e6944](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d4e6944))


### Features

* add CLI migrate command ([3ea9dd2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3ea9dd2))




<a name="1.2.1"></a>
## [1.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.2.0...@pubsweet/db-manager@1.2.1) (2018-07-09)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.2.0"></a>
# [1.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.1.1...@pubsweet/db-manager@1.2.0) (2018-06-28)


### Features

* add addFragment to dbmanager ([e12c305](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e12c305))
* remove extraneous brackets ([c9e6b35](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c9e6b35))
* remove line that adds first fragment to collection ([f17a494](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f17a494))
* unit tests for add fragment ([10fba12](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/10fba12))




<a name="1.1.1"></a>
## [1.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.1.0...@pubsweet/db-manager@1.1.1) (2018-06-19)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.1.0"></a>
# [1.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.12...@pubsweet/db-manager@1.1.0) (2018-05-18)


### Bug Fixes

* use one file at monorepo root ([456f49b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/456f49b))


### Features

* migration runner ([76a48b3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/76a48b3))
* migration runner ([be49be5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/be49be5))




<a name="1.0.12"></a>
## [1.0.12](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.11...@pubsweet/db-manager@1.0.12) (2018-05-03)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.11"></a>
## [1.0.11](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.10...@pubsweet/db-manager@1.0.11) (2018-05-03)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.10"></a>
## [1.0.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.9...@pubsweet/db-manager@1.0.10) (2018-04-25)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.9"></a>
## [1.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.8...@pubsweet/db-manager@1.0.9) (2018-04-24)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.8"></a>
## [1.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.7...@pubsweet/db-manager@1.0.8) (2018-04-11)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.7"></a>
## [1.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.6...@pubsweet/db-manager@1.0.7) (2018-04-03)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.6"></a>
## [1.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.5...@pubsweet/db-manager@1.0.6) (2018-03-30)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.5"></a>
## [1.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.4...@pubsweet/db-manager@1.0.5) (2018-03-28)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.4"></a>
## [1.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.3...@pubsweet/db-manager@1.0.4) (2018-03-27)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.3"></a>
## [1.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.2...@pubsweet/db-manager@1.0.3) (2018-03-19)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.2"></a>
## [1.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.1...@pubsweet/db-manager@1.0.2) (2018-03-15)




**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.1"></a>

## [1.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@1.0.0...@pubsweet/db-manager@1.0.1) (2018-03-09)

**Note:** Version bump only for package @pubsweet/db-manager

<a name="1.0.0"></a>

# [1.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@0.0.17...@pubsweet/db-manager@1.0.0) (2018-02-23)

### Features

* switch to PostgreSQL ([d459299](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d459299))

### BREAKING CHANGES

* All data is now persisted in a PostgreSQL database instead of PouchDB
* Database server must be running and have an existing database before running `pubsweet setupdb` (Docker config provided)
`pubsweet start` runs `npm start` script if found and falls back to `pubsweet server`
`pubsweet server` starts the PubSweet server (like the old `pubsweet start`)
`pubsweet-server` model API is unchanged

<a name="0.0.17"></a>

## [0.0.17](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@0.0.16...@pubsweet/db-manager@0.0.17) (2018-02-16)

**Note:** Version bump only for package @pubsweet/db-manager

<a name="0.0.16"></a>

## [0.0.16](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/db-manager@0.0.15...@pubsweet/db-manager@0.0.16) (2018-02-02)

**Note:** Version bump only for package @pubsweet/db-manager
