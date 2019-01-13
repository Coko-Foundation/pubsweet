# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0 (2019-01-13)


### Features

* add [@pubsweet](https://gitlab.coko.foundation/pubsweet)/errors ([2969bf6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2969bf6))


### BREAKING CHANGES

* If you required errors deeply from pubsweet-server before, i.e.
`pubsweet-server/src/errors`, this will no longer work, and you need to change your require to
`@pubsweet/errors`.





# [1.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.1.0...@pubsweet/base-model@1.2.0) (2019-01-09)


### Bug Fixes

* fix BaseModel's updateProperties and findByField ([418a27a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/418a27a))
* improve BaseModel's handling of schema and updateProperties ([80f7f3f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/80f7f3f))
* **base-model:** improve BaseModel's save() ([bf8a438](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bf8a438))
* various migration related fixes ([2aef24a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2aef24a))
* **base-model:** updated is always present ([c9e645d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c9e645d))


### Features

* **base-model:** remove proxy for setting model properties ([e9ad1fa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e9ad1fa))
* introduce [@pubsweet](https://gitlab.coko.foundation/pubsweet)/models package ([7c1a364](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c1a364))





# [1.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.12...@pubsweet/base-model@1.1.0) (2018-12-12)


### Bug Fixes

* **base-model:** ensure updated is set on insert ([d04688b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d04688b))
* **base-model:** make funcs private and rename vars ([3e64aa6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3e64aa6))
* **base-model:** use trx within transaction ([8330615](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8330615))


### Features

* **base-model:** add test to check exception when saving stale data ([9d73525](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9d73525))
* **base-model:** protect save from stale data ([836a9b8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/836a9b8))





## [1.0.12](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.11...@pubsweet/base-model@1.0.12) (2018-12-04)

**Note:** Version bump only for package @pubsweet/base-model





## [1.0.11](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.10...@pubsweet/base-model@1.0.11) (2018-11-30)

**Note:** Version bump only for package @pubsweet/base-model





## [1.0.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.9...@pubsweet/base-model@1.0.10) (2018-11-29)

**Note:** Version bump only for package @pubsweet/base-model





<a name="1.0.9"></a>
## [1.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.8...@pubsweet/base-model@1.0.9) (2018-11-13)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.8"></a>
## [1.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.7...@pubsweet/base-model@1.0.8) (2018-11-05)


### Bug Fixes

* **base-model:** support graph inserts ([ff40287](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ff40287))




<a name="1.0.7"></a>
## [1.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.6...@pubsweet/base-model@1.0.7) (2018-10-17)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.6"></a>
## [1.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.5...@pubsweet/base-model@1.0.6) (2018-10-08)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.5"></a>
## [1.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.4...@pubsweet/base-model@1.0.5) (2018-09-29)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.4"></a>
## [1.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.3...@pubsweet/base-model@1.0.4) (2018-09-28)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.3"></a>
## [1.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.2...@pubsweet/base-model@1.0.3) (2018-09-27)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.2"></a>
## [1.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.1...@pubsweet/base-model@1.0.2) (2018-09-27)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.1"></a>
## [1.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/base-model@1.0.0...@pubsweet/base-model@1.0.1) (2018-09-25)




**Note:** Version bump only for package @pubsweet/base-model

<a name="1.0.0"></a>
# 1.0.0 (2018-09-20)


### Features

* add base-model package for standalone data models ([fc446e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc446e8)), closes [#395](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/395)


### BREAKING CHANGES

* In PubSweet server, the exported thing is no longer startServer directly, but it's
now part of the exported object. This will break applications that use the equivalent of const
startServer = require('pubsweet-server'). The new method for getting a startServer is const {
startServer } = require('pubsweet-server').