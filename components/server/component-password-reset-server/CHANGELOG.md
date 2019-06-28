# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/component-password-reset-server@2.1.6...@pubsweet/component-password-reset-server@2.1.7) (2019-06-28)

**Note:** Version bump only for package @pubsweet/component-password-reset-server





## [2.1.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/component-password-reset-server@2.1.5...@pubsweet/component-password-reset-server@2.1.6) (2019-06-24)

**Note:** Version bump only for package @pubsweet/component-password-reset-server





## [2.1.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/component-password-reset-server@2.1.4...@pubsweet/component-password-reset-server@2.1.5) (2019-06-21)

**Note:** Version bump only for package @pubsweet/component-password-reset-server





## [2.1.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/component-password-reset-server@2.1.3...@pubsweet/component-password-reset-server@2.1.4) (2019-06-13)

**Note:** Version bump only for package @pubsweet/component-password-reset-server





## [2.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/component-password-reset-server@2.1.2...@pubsweet/component-password-reset-server@2.1.3) (2019-06-12)

**Note:** Version bump only for package @pubsweet/component-password-reset-server





## [2.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/component-password-reset-server@2.1.1...@pubsweet/component-password-reset-server@2.1.2) (2019-05-27)

**Note:** Version bump only for package @pubsweet/component-password-reset-server





## [2.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/component-password-reset-server@2.1.0...@pubsweet/component-password-reset-server@2.1.1) (2019-04-25)

**Note:** Version bump only for package @pubsweet/component-password-reset-server





# 2.1.0 (2019-04-18)


### Features

* client-side password reset component using graphql ([33df495](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/33df495))
* migrate password reset's server component to GraphQL ([4403312](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4403312))





## [2.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@2.0.2...pubsweet-component-password-reset-backend@2.0.3) (2019-01-16)

**Note:** Version bump only for package pubsweet-component-password-reset-backend





## [2.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@2.0.1...pubsweet-component-password-reset-backend@2.0.2) (2019-01-14)

**Note:** Version bump only for package pubsweet-component-password-reset-backend





## [2.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@2.0.0...pubsweet-component-password-reset-backend@2.0.1) (2019-01-13)

**Note:** Version bump only for package pubsweet-component-password-reset-backend





# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@1.0.6...pubsweet-component-password-reset-backend@2.0.0) (2019-01-09)


### Bug Fixes

* change password reset timestamp generation ([600be3a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/600be3a))
* **password-reset-server:** align mailer config with send email ([d1cf251](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d1cf251)), closes [#432](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/432)


### BREAKING CHANGES

* **password-reset-server:** Config for mailer is now read from mailer.path, not mailer.transport
* Previously, passwordResetTimestamp was generated as a number of seconds since
epoch. In the new user data model, all dates are strings in ISO8601 format. This commit fixes the
incosistency and makes password reset work again.





## [1.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@1.0.5...pubsweet-component-password-reset-backend@1.0.6) (2018-12-12)

**Note:** Version bump only for package pubsweet-component-password-reset-backend





<a name="1.0.5"></a>
## [1.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@1.0.4...pubsweet-component-password-reset-backend@1.0.5) (2018-09-25)




**Note:** Version bump only for package pubsweet-component-password-reset-backend

<a name="1.0.4"></a>
## [1.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@1.0.3...pubsweet-component-password-reset-backend@1.0.4) (2018-04-03)




**Note:** Version bump only for package pubsweet-component-password-reset-backend

<a name="1.0.3"></a>
## [1.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@1.0.2...pubsweet-component-password-reset-backend@1.0.3) (2018-03-27)




**Note:** Version bump only for package pubsweet-component-password-reset-backend

<a name="1.0.2"></a>
## [1.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@1.0.1...pubsweet-component-password-reset-backend@1.0.2) (2018-03-19)




**Note:** Version bump only for package pubsweet-component-password-reset-backend

<a name="1.0.1"></a>
## [1.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@1.0.0...pubsweet-component-password-reset-backend@1.0.1) (2018-03-15)




**Note:** Version bump only for package pubsweet-component-password-reset-backend

<a name="1.0.0"></a>

# [1.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-password-reset-backend@0.2.2...pubsweet-component-password-reset-backend@1.0.0) (2018-02-16)

### Code Refactoring

* **components:** update mail transport config shape ([d142cd3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d142cd3))

### BREAKING CHANGES

* **components:** mail transport config has moved from `mail-transport` to `mailer.transport`
