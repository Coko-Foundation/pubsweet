# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.5...@pubsweet/model-user@4.0.6) (2019-04-18)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.4...@pubsweet/model-user@4.0.5) (2019-04-09)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.3...@pubsweet/model-user@4.0.4) (2019-03-06)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.2...@pubsweet/model-user@4.0.3) (2019-03-05)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.1...@pubsweet/model-user@4.0.2) (2019-02-19)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.0...@pubsweet/model-user@4.0.1) (2019-02-19)


### Bug Fixes

* **model-user:** fix update user mutation's password hashing ([5c50fda](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5c50fda))





# [4.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@3.0.2...@pubsweet/model-user@4.0.0) (2019-02-01)


### Bug Fixes

* **model-user:** use correct team member reference ([9dfee12](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9dfee12))


### Features

* add team relationship to user and test it ([a10e81c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a10e81c))
* remove REST endpoints ([585881b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/585881b))
* **graphql:** add where option to connector calls where needed ([9ff779b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9ff779b))
* **model-user:** improve eager loading in graphql ([2ae9640](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2ae9640))


### BREAKING CHANGES

* This removes all previous /api endpoints, with the exception of file upload.





## [3.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@3.0.1...@pubsweet/model-user@3.0.2) (2019-01-16)

**Note:** Version bump only for package @pubsweet/model-user





## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@3.0.0...@pubsweet/model-user@3.0.1) (2019-01-14)

**Note:** Version bump only for package @pubsweet/model-user





# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@2.0.0...@pubsweet/model-user@3.0.0) (2019-01-13)


### Features

* add [@pubsweet](https://gitlab.coko.foundation/pubsweet)/errors ([2969bf6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2969bf6))


### BREAKING CHANGES

* If you required errors deeply from pubsweet-server before, i.e.
`pubsweet-server/src/errors`, this will no longer work, and you need to change your require to
`@pubsweet/errors`.





# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@1.0.1-alpha.0...@pubsweet/model-user@2.0.0) (2019-01-09)


### Bug Fixes

* **model-user:** change passwordResetTimestamp schema ([e0aafff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e0aafff))
* **model-user:** passwordResetTimestamp can be null ([abfc095](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/abfc095))
* **server:** additionally protect /api/users ([78ae476](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/78ae476))


### Features

* **base-model:** remove proxy for setting model properties ([e9ad1fa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e9ad1fa))
* introduce [@pubsweet](https://gitlab.coko.foundation/pubsweet)/models package ([7c1a364](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c1a364))


### BREAKING CHANGES

* **server:** This adds additional authorization checks for the new user creation REST endpoint.
Your authsome modes have to be updated.





## 1.0.1-alpha.0 (2018-11-23)


### Bug Fixes

* **model-user:** omit passwordHash from JSON representation ([c33fbee](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c33fbee))


### Features

* add standalone user model ([240beca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/240beca))