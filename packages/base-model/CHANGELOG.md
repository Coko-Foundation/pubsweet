# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
