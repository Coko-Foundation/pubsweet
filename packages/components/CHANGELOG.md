# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

      <a name="5.1.0"></a>
# [5.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@5.0.0...pubsweet-components@5.1.0) (2018-04-03)


### Bug Fixes

* **components:** check configuration missing ([98e96ec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98e96ec))
* **components:** fix rebase conflicts ([987858d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/987858d))
* **components:** fix test backend ([1e647f7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1e647f7))
* **components:** make use of email component ([084be2f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/084be2f))
* **components:** submit change validation minSize ([6efbcf0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6efbcf0))


### Features

* **ink-backend:** allow the app to run even if ink config is missing ([467b1de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/467b1de)), closes [#351](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/351)
* **ink-backend:** improve error messages for missing config ([ccd6326](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ccd6326)), closes [#351](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/351)




      <a name="5.0.0"></a>
# [5.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@4.3.0...pubsweet-components@5.0.0) (2018-03-30)


### Features

* **components:** remove react-bootstrap ([e66c933](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e66c933))
* **users-manager:** add support for removing members ([bb06148](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb06148))
* **users-manager:** add way to add global teams ([9bbccab](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9bbccab))


### BREAKING CHANGES

* **users-manager:** Depends on a validation change for teamType -> string, and additionally, a validation change where team's objects are no longer required.




<a name="4.3.0"></a>
# [4.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@4.2.1...pubsweet-components@4.3.0) (2018-03-28)


### Features

* **client:** add Apollo Client ([2fe9d93](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2fe9d93))




<a name="4.2.1"></a>
## [4.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@4.2.0...pubsweet-components@4.2.1) (2018-03-28)




**Note:** Version bump only for package pubsweet-components

<a name="4.2.0"></a>
# [4.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@4.1.0...pubsweet-components@4.2.0) (2018-03-27)


### Bug Fixes

* **components:** review backend remove revs ([a2781e6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a2781e6))
* resolve remaining jsx-a11y lint issues ([0675289](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0675289))
* resolve remaining jsx-a11y lint issues ([a75c0de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a75c0de))
* **components:** use version.id as key ([0ca2f56](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0ca2f56))
* **polling-server:** remove revs ([b42cecd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b42cecd))


### Features

* **components:** add Link from review page back to control panel ([860b737](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/860b737))
* **styleguide:** page per section ([0bf0836](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0bf0836))




<a name="4.1.0"></a>
# [4.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@4.0.0...pubsweet-components@4.1.0) (2018-03-19)


### Bug Fixes

* **component-send-email:** remove logger ([a8d2dda](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a8d2dda))
* **component-send-email:** remove sendMail callback ([d0be1d8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d0be1d8))
* **send-email:** rename for styleguide ([0a5b0a5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0a5b0a5))


### Features

* **component-send-email:** add error handling ([b3f423a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b3f423a))
* **component-send-email:** refactor send email ([201bfd9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/201bfd9))
* **component-send-email:** WIP refactor ses ([531d630](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/531d630))




<a name="4.0.0"></a>
# [4.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@3.0.2...pubsweet-components@4.0.0) (2018-03-15)


### Bug Fixes

* **login:** add missing recompose dependency ([a3b5a80](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a3b5a80)), closes [#353](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/353)
* **xpub:** variable linter error prosemirror ([f57768c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f57768c))


### Features

* **aws-s3:** add endpoint to zip S3 files of a manuscript ([f50f602](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f50f602))


### BREAKING CHANGES

* **aws-s3:** renamed the AWS-S3 endpoints to conform to REST principles (pluralize entity name)




<a name="3.0.2"></a>

## [3.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@3.0.1...pubsweet-components@3.0.2) (2018-03-09)

### Bug Fixes

* **xpub:** dubiously ignore linting errors ([a60d0ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a60d0ad))
* **xpub:** find-reviewers package name ([1b0ff2d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1b0ff2d))
* **xpub:** package name ([2383506](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2383506))
* **xpub:** tests ([cec85e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cec85e2))

<a name="3.0.1"></a>

## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@3.0.0...pubsweet-components@3.0.1) (2018-03-06)

**Note:** Version bump only for package pubsweet-components

<a name="3.0.0"></a>

# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@2.0.1...pubsweet-components@3.0.0) (2018-03-05)

### Bug Fixes

* restore FormGroup to its previous state, for later deletion ([3135ffd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3135ffd))
* **components:** add dependency on pubsweet/ui ([f0a1926](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f0a1926))
* **components:** correctly redirect when edit button is clicked ([faca509](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/faca509))
* **components:** login example ([6dfd66c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6dfd66c))
* **components:** login tests were failing after refactor ([62be047](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/62be047))
* **components:** make styleguide work (mostly) ([d036681](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d036681))
* **components:** PasswordReset was still using a CSS variable ([e1c2c84](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e1c2c84))
* **components:** signup and login error examples ([3f991ec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3f991ec))
* **components:** styleguide can render components using validations ([93df7af](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/93df7af))

### Code Refactoring

* **ui:** tidy AppBar ([09751b6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/09751b6))

### Features

* **elife-theme:** add elife theme ([e406e0d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e406e0d))

### BREAKING CHANGES

* **ui:** \* navLinks prop is now navLinkComponents and expects an array of
elements

<a name="2.0.1"></a>

## [2.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@2.0.0...pubsweet-components@2.0.1) (2018-02-23)

**Note:** Version bump only for package pubsweet-components

<a name="2.0.0"></a>

# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@1.1.0...pubsweet-components@2.0.0) (2018-02-16)

### Bug Fixes

* **component:** fix tests ([bf9d13e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bf9d13e))

### Code Refactoring

* **components:** update mail transport config shape ([d142cd3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d142cd3))

### Features

* **component:** add aws ses package ([2e34627](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2e34627))
* **component:** sortable list component with react-dnd ([f4bda90](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f4bda90))

### BREAKING CHANGES

* **components:** mail transport config has moved from `mail-transport` to `mailer.transport`

<a name="1.1.0"></a>

# [1.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@1.0.0...pubsweet-components@1.1.0) (2018-02-08)

### Bug Fixes

* **components:** update react-router-redux version to match client ([3d257ef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3d257ef))

### Features

* **components:** added aws s3 ([73c0764](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/73c0764))

<a name="1.0.0"></a>

# [1.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@0.0.12...pubsweet-components@1.0.0) (2018-02-02)

### Features

* **client:** upgrade React to version 16 ([626cf59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/626cf59)), closes [#65](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/65)

### BREAKING CHANGES

* **client:** Upgrade React to version 16

<a name="0.0.12"></a>

## [0.0.12](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@0.0.11...pubsweet-components@0.0.12) (2018-02-02)

**Note:** Version bump only for package pubsweet-components
