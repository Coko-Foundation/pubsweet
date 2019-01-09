# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0 (2019-01-09)


### Features

* **server:** migrate Collection to a model component ([8380b69](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8380b69))
* introduce [@pubsweet](https://gitlab.coko.foundation/pubsweet)/models package ([7c1a364](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c1a364))


### BREAKING CHANGES

* **server:** Collections, currently stored in a NoSQL-like entities table, are now living in
standalone collections table. Since the constraints from PostgreSQLs columns are stricter than a
JSON data field, where the collection data currently lives, no automatic migration of data is
possible - and migrations will have to be done on a app-by-app basis.
