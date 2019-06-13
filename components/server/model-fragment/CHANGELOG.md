# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.9...@pubsweet/model-fragment@3.0.10) (2019-06-13)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.8...@pubsweet/model-fragment@3.0.9) (2019-06-12)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.7...@pubsweet/model-fragment@3.0.8) (2019-05-27)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.6...@pubsweet/model-fragment@3.0.7) (2019-04-25)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.5...@pubsweet/model-fragment@3.0.6) (2019-04-18)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.4...@pubsweet/model-fragment@3.0.5) (2019-04-09)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.3...@pubsweet/model-fragment@3.0.4) (2019-03-06)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.2...@pubsweet/model-fragment@3.0.3) (2019-03-05)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.1...@pubsweet/model-fragment@3.0.2) (2019-02-19)

**Note:** Version bump only for package @pubsweet/model-fragment





## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@3.0.0...@pubsweet/model-fragment@3.0.1) (2019-02-19)

**Note:** Version bump only for package @pubsweet/model-fragment





# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@2.0.2...@pubsweet/model-fragment@3.0.0) (2019-02-01)


### Features

* remove REST endpoints ([585881b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/585881b))
* **graphql:** add where option to connector calls where needed ([9ff779b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9ff779b))


### BREAKING CHANGES

* This removes all previous /api endpoints, with the exception of file upload.





## [2.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@2.0.1...@pubsweet/model-fragment@2.0.2) (2019-01-16)

**Note:** Version bump only for package @pubsweet/model-fragment





## [2.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@2.0.0...@pubsweet/model-fragment@2.0.1) (2019-01-14)

**Note:** Version bump only for package @pubsweet/model-fragment





# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-fragment@1.1.0...@pubsweet/model-fragment@2.0.0) (2019-01-13)


### Features

* add [@pubsweet](https://gitlab.coko.foundation/pubsweet)/errors ([2969bf6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2969bf6))


### BREAKING CHANGES

* If you required errors deeply from pubsweet-server before, i.e.
`pubsweet-server/src/errors`, this will no longer work, and you need to change your require to
`@pubsweet/errors`.





# 1.1.0 (2019-01-09)


### Bug Fixes

* various migration related fixes ([2aef24a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2aef24a))


### Features

* introduce [@pubsweet](https://gitlab.coko.foundation/pubsweet)/models package ([7c1a364](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c1a364))
* migrate Fragment to use BaseModel ([bd4c7f9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bd4c7f9))
