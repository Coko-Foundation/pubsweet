# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

      <a name="7.2.0"></a>
# [7.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@7.1.2...pubsweet-server@7.2.0) (2018-07-09)


### Features

* **server:** make morgan request log format configurable ([a2a3810](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a2a3810))




      <a name="7.1.2"></a>
## [7.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@7.1.1...pubsweet-server@7.1.2) (2018-06-19)




**Note:** Version bump only for package pubsweet-server

<a name="7.1.1"></a>
## [7.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@7.1.0...pubsweet-server@7.1.1) (2018-06-01)


### Bug Fixes

* **styleguide:** add and use simple authsome mode in styleguide ([e2e0e85](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e2e0e85))




<a name="7.1.0"></a>
# [7.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@7.0.1...pubsweet-server@7.1.0) (2018-05-18)


### Bug Fixes

* use one file at monorepo root ([456f49b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/456f49b))


### Features

* migration runner ([be49be5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/be49be5))




<a name="7.0.1"></a>
## [7.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@7.0.0...pubsweet-server@7.0.1) (2018-05-03)


### Bug Fixes

* **server:** update nested PATCH endpoint ([9793075](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9793075))




<a name="7.0.0"></a>
# [7.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@6.1.0...pubsweet-server@7.0.0) (2018-05-03)


### Features

* add config property for graphql endpoint ([c463855](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c463855))
* **server:** add current and update state to update authorization ([9b2b073](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9b2b073)), closes [#393](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/393)


### BREAKING CHANGES

* **server:** Authsome mode parts that deal with 'PATCH' or update operations, must now deal with
the changed API, which provides a {current:, update:} object, where 'current' represents the current
state of the object, and 'update' representes the requested update. This was added so that one can
verify e.g. that a object.status update is allowed, if the current object.status is 'editing', and
the wished update.status is 'edited'.




<a name="6.1.0"></a>
# [6.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@6.0.0...pubsweet-server@6.1.0) (2018-04-25)


### Features

* **server:** add sse events to team endpoints ([26a739a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/26a739a)), closes [#390](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/390)




<a name="6.0.0"></a>
# [6.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@5.0.0...pubsweet-server@6.0.0) (2018-04-24)


### Bug Fixes

* **server:** correct 'updated' property to 'update' ([18a6b35](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/18a6b35)), closes [#385](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/385)


### Features

* **server:** implement authorization-based filtering of SSE ([a1b5cd3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a1b5cd3))
* **server:** simplify currentUser query response ([6432b58](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6432b58))


### BREAKING CHANGES

* **server:** remove `token` from `currentUser` query response since it must have been provided in the request.




<a name="5.0.0"></a>
# [5.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@4.0.0...pubsweet-server@5.0.0) (2018-04-11)


### Bug Fixes

* **graphql:** make teamType a string ([d2005ac](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d2005ac))
* **pubsweet-server:** typo correction ([ed88381](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ed88381))
* **pubsweet-server:** update teams api ([6652307](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6652307))
* **teams:** add object.team to authsome query ([79b39b5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/79b39b5))
* **teams:** fix test authsome mode for PATCH ([f448c19](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f448c19))


### BREAKING CHANGES

* **pubsweet-server:** The teams API endpoints now work differently in terms of filtering capabilities & in combination with Authsome, in the same way as the collections and fragments API endpoints work. See https://gitlab.coko.foundation/pubsweet/pubsweet/merge_requests/177 for more information.




<a name="4.0.0"></a>
# [4.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@3.0.0...pubsweet-server@4.0.0) (2018-04-03)


### Features

* **server:** remove user.teams pre-filling ([055eafe](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/055eafe))


### BREAKING CHANGES

* **server:** User.teams no longer returns an array of objects, but instead returns an array of
ids, as it's stored in the database.




<a name="3.0.0"></a>
# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@2.0.5...pubsweet-server@3.0.0) (2018-03-30)


### Bug Fixes

* **graphql:** reorder authorization checks for creation ([25c6274](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/25c6274))
* **server:** add create property validation ([0eb3f4a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0eb3f4a))
* **server:** add nesting back to users list endpoint ([da01334](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/da01334))


### Features

* **server:** add permission based filtering to users api ([f440388](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f440388))
* **server:** make team types strings ([1fee5f0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1fee5f0))


### BREAKING CHANGES

* **server:** Team's teamType is now a string (e.g. 'managingEditor', 'reviewer')instead of an object.




<a name="2.0.5"></a>
## [2.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@2.0.4...pubsweet-server@2.0.5) (2018-03-28)


### Bug Fixes

* set owners when creating entities via GraphQL API ([992a1c2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/992a1c2))




<a name="2.0.4"></a>
## [2.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-server@2.0.3...pubsweet-server@2.0.4) (2018-03-27)




**Note:** Version bump only for package pubsweet-server

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
