# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-collection@3.0.1...@pubsweet/model-collection@3.0.2) (2019-01-16)

**Note:** Version bump only for package @pubsweet/model-collection





## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-collection@3.0.0...@pubsweet/model-collection@3.0.1) (2019-01-14)

**Note:** Version bump only for package @pubsweet/model-collection





# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-collection@2.0.0...@pubsweet/model-collection@3.0.0) (2019-01-13)


### Features

* add [@pubsweet](https://gitlab.coko.foundation/pubsweet)/errors ([2969bf6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2969bf6))


### BREAKING CHANGES

* If you required errors deeply from pubsweet-server before, i.e.
`pubsweet-server/src/errors`, this will no longer work, and you need to change your require to
`@pubsweet/errors`.





# 2.0.0 (2019-01-09)


### Features

* **server:** migrate Collection to a model component ([8380b69](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8380b69))
* introduce [@pubsweet](https://gitlab.coko.foundation/pubsweet)/models package ([7c1a364](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c1a364))


### BREAKING CHANGES

* **server:** Collections, currently stored in a NoSQL-like entities table, are now living in
standalone collections table. Since the constraints from PostgreSQLs columns are stricter than a
JSON data field, where the collection data currently lives, no automatic migration of data is
possible - and migrations will have to be done on a app-by-app basis.
