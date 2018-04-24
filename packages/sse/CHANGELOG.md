# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="1.0.0"></a>
# [1.0.0](http://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-sse@0.1.5...pubsweet-sse@1.0.0) (2018-04-24)


### Bug Fixes

* **sse:** remove listener with actual listener function ([4d6a21e](http://gitlab.coko.foundation/pubsweet/pubsweet/commit/4d6a21e))
* **sse:** use req.user instead of a class property ([345fb0e](http://gitlab.coko.foundation/pubsweet/pubsweet/commit/345fb0e))


### Features

* **sse:** filter sse based on permissions ([9310190](http://gitlab.coko.foundation/pubsweet/pubsweet/commit/9310190))
* **sse:** introduce authorization-based filtering of server-sent events ([ba566c1](http://gitlab.coko.foundation/pubsweet/pubsweet/commit/ba566c1))


### BREAKING CHANGES

* **sse:** The pubsweet-sse package is now strongly bound to the authorization library
(Authsome) that PubSweet uses in the server. Authsome is now used to filter events based on
permissions, and by default, events will be dropped/not sent. They will be sent only if handled by
the Authsome mode.




<a name="0.1.5"></a>
## [0.1.5](http://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-sse@0.1.4...pubsweet-sse@0.1.5) (2018-04-11)


### Bug Fixes

* bump standard dependency ([0c599db](http://gitlab.coko.foundation/pubsweet/pubsweet/commit/0c599db))
