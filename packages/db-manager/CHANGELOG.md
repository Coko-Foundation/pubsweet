# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
