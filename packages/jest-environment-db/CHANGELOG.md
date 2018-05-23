# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="1.0.1"></a>
## [1.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/jest-environment-db@1.0.0...jest-environment-db@1.0.1) (2018-05-18)


### Bug Fixes

* use MIT on all package.json files ([4558ae4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4558ae4))




<a name="1.0.0"></a>
# 1.0.0 (2018-02-23)


### Features

* switch to PostgreSQL ([d459299](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d459299))


### BREAKING CHANGES

* All data is now persisted in a PostgreSQL database instead of PouchDB
* Database server must be running and have an existing database before running `pubsweet setupdb` (Docker config provided)
`pubsweet start` runs `npm start` script if found and falls back to `pubsweet server`
`pubsweet server` starts the PubSweet server (like the old `pubsweet start`)
`pubsweet-server` model API is unchanged
