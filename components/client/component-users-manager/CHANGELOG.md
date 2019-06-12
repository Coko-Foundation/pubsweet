# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.8...pubsweet-component-users-manager@3.0.9) (2019-06-12)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.7...pubsweet-component-users-manager@3.0.8) (2019-05-27)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.6...pubsweet-component-users-manager@3.0.7) (2019-04-25)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.5...pubsweet-component-users-manager@3.0.6) (2019-04-18)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.4...pubsweet-component-users-manager@3.0.5) (2019-04-09)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.3...pubsweet-component-users-manager@3.0.4) (2019-03-06)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.2...pubsweet-component-users-manager@3.0.3) (2019-03-05)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.1...pubsweet-component-users-manager@3.0.2) (2019-02-19)

**Note:** Version bump only for package pubsweet-component-users-manager





## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@3.0.0...pubsweet-component-users-manager@3.0.1) (2019-02-19)

**Note:** Version bump only for package pubsweet-component-users-manager





# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@2.0.6...pubsweet-component-users-manager@3.0.0) (2019-02-01)


### Code Refactoring

* temporarily remove unmigrated components ([32db6ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32db6ad))


### Features

* **users-manager:** migrate to GraphQL ([fa54414](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fa54414))
* very basic backend/working users manager ([b3c06b6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b3c06b6))


### BREAKING CHANGES

* A lot of unmigrated (not yet moved from REST/Redux to GraphQL/Apollo system) bits
have changed. There might be some breaking changes as a result. This is a big migration involving
big changes - if you encounter anything weird, please contact us on GitLab or on Mattermost.
* **users-manager:** No longer uses the REST endpoints or the Redux functinality on the client-side,
it's purely GraphQL-based.





## [2.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@2.0.5...pubsweet-component-users-manager@2.0.6) (2019-01-16)

**Note:** Version bump only for package pubsweet-component-users-manager





## [2.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@2.0.4...pubsweet-component-users-manager@2.0.5) (2019-01-14)

**Note:** Version bump only for package pubsweet-component-users-manager





## [2.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@2.0.3...pubsweet-component-users-manager@2.0.4) (2019-01-13)

**Note:** Version bump only for package pubsweet-component-users-manager





## [2.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@2.0.2...pubsweet-component-users-manager@2.0.3) (2019-01-09)

**Note:** Version bump only for package pubsweet-component-users-manager





## [2.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@2.0.1...pubsweet-component-users-manager@2.0.2) (2018-12-12)

**Note:** Version bump only for package pubsweet-component-users-manager





<a name="2.0.1"></a>
## [2.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@2.0.0...pubsweet-component-users-manager@2.0.1) (2018-04-03)




**Note:** Version bump only for package pubsweet-component-users-manager

<a name="2.0.0"></a>
# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@1.0.1...pubsweet-component-users-manager@2.0.0) (2018-03-30)


### Features

* **components:** remove react-bootstrap ([e66c933](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e66c933))
* **users-manager:** add support for removing members ([bb06148](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb06148))
* **users-manager:** add way to add global teams ([9bbccab](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9bbccab))


### BREAKING CHANGES

* **users-manager:** Depends on a validation change for teamType -> string, and additionally, a validation change where team's objects are no longer required.




<a name="1.0.1"></a>

## [1.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@1.0.0...pubsweet-component-users-manager@1.0.1) (2018-02-16)

**Note:** Version bump only for package pubsweet-component-users-manager

<a name="1.0.0"></a>

# [1.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-component-users-manager@0.2.3...pubsweet-component-users-manager@1.0.0) (2018-02-02)

### Features

* **client:** upgrade React to version 16 ([626cf59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/626cf59)), closes [#65](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/65)

### BREAKING CHANGES

* **client:** Upgrade React to version 16
