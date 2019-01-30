# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
