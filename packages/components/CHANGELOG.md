# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [13.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@13.0.0...pubsweet-components@13.0.1) (2019-02-19)


### Bug Fixes

* **model-user:** fix update user mutation's password hashing ([5c50fda](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5c50fda))





# [13.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@12.0.2...pubsweet-components@13.0.0) (2019-02-01)


### Bug Fixes

* **eslint:** submit form ([1462c10](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1462c10))
* **model-team:** fix membership update query ([918da4e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/918da4e))
* **model-team:** use model (not db) identifiers ([6535ca3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6535ca3))
* **model-user:** use correct team member reference ([9dfee12](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9dfee12))
* **review:** assign reviewers ([f10a0a4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f10a0a4))
* **review:** improve formik usage onChange ([18faca6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/18faca6))
* **styleguide:** temporarily disable styleguide ([e519ed1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e519ed1))
* **submit:** fixing submit confirm button ([8aee1e5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8aee1e5))


### Code Refactoring

* temporarily remove unmigrated components ([32db6ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32db6ad))


### Features

* add team relationship to user and test it ([a10e81c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a10e81c))
* **model-team:** migrate team members ([9dd8943](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9dd8943))
* remove redux ([4217850](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4217850))
* remove REST endpoints ([585881b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/585881b))
* **model-team:** use authorization helpers available from context ([6a4be16](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6a4be16))
* very basic backend/working users manager ([b3c06b6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b3c06b6))
* **blog:** initial migration to graphql ([73e9647](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/73e9647))
* **graphql:** add where option to connector calls where needed ([9ff779b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9ff779b))
* **model-team:** add addMember, removeMember, improve fetching ([9c48f2c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9c48f2c))
* **model-team:** introduce TeamMember model ([dfb2cce](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/dfb2cce))
* **model-team:** simplify objectId and objectType storage ([665cf85](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/665cf85))
* **model-team:** simplify team and members into one component ([3cc9e8a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3cc9e8a))
* **model-user:** improve eager loading in graphql ([2ae9640](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2ae9640))
* **teams:** add alias and team member management ([bb2efb4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb2efb4))
* **users-manager:** migrate to GraphQL ([fa54414](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fa54414))


### BREAKING CHANGES

* A lot of unmigrated (not yet moved from REST/Redux to GraphQL/Apollo system) bits
have changed. There might be some breaking changes as a result. This is a big migration involving
big changes - if you encounter anything weird, please contact us on GitLab or on Mattermost.
* **teams:** The GraphQL schema/API has changed to suport the Team -> TeamMembers -> User/Alias
relationships. Take a look at `team_graphql_test.js` for examples on how you can now manage team
memberships with a single createTeam/updateTeam mutation.
* **model-team:** Previously objectId and objectType were stored in a JSONB column on the teams
table. This has changed (and the migration takes care of table and data migration) in favor of
storing objectId and objectType as flat columns on the teams table. For reasons of querying,
indexing and ease of use, this is a better option. The read side of the API still returns a nested
TeamObject, but the GraphQL mutations have changed (see `team_graphql_test.js` for some examples).
* This removes all previous /api endpoints, with the exception of file upload.
* **model-team:** Members were previously stored on the Team.members property, as a JSONB array. Now
they're represented through the TeamMembers join table, that joins users and teams.
* **users-manager:** No longer uses the REST endpoints or the Redux functinality on the client-side,
it's purely GraphQL-based.
* All components that rely on Redux's actions and reducers will cease to work in this
version. Migrating to GraphQL and Apollo on the client and server is advised.





## [12.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@12.0.1...pubsweet-components@12.0.2) (2019-01-16)


### Bug Fixes

* **components:** change back teams model to previous model ([a5eeae0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a5eeae0))
* **components:** fixing components after new manuscript version ([89537ff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/89537ff))
* **components:** generals fixes on the components ([4a78cfe](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4a78cfe))
* **components:** graphql data model changes ([4b61093](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4b61093))
* **formbuilder:** delete forms ([17c52d0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/17c52d0))
* **formbuilder:** save to file ([c4f4196](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c4f4196))
* **formik:** improve formik usage ([24b42ff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/24b42ff))
* **graphql:** review components fixes ([8094d9e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8094d9e))
* **login:** error on integration test failed login ([f061e58](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f061e58))
* **login:** redirect to the dashboard ([41a7cc9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/41a7cc9))
* **login:** unneeded vars ([7610f94](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7610f94))
* **manuscript:** wax did not show ([80ae8c6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/80ae8c6))
* **merge:** merging to master ([8603808](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8603808))
* **submit:** intro template ([6c850e1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6c850e1))
* **submit:** intro template fix eslint ([fcc2599](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fcc2599))
* **test:** formbuilder ([93c55fd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/93c55fd))
* **test:** login tests ([438ab2e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/438ab2e))
* **test:** problems with eslint and test ([48f7fe2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/48f7fe2))
* **xpub-review:** changes tp reviews ([5ae4240](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5ae4240))





## [12.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@12.0.0...pubsweet-components@12.0.1) (2019-01-14)

**Note:** Version bump only for package pubsweet-components





# [12.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@11.0.0...pubsweet-components@12.0.0) (2019-01-13)


### Features

* add [@pubsweet](https://gitlab.coko.foundation/pubsweet)/errors ([2969bf6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2969bf6))


### BREAKING CHANGES

* If you required errors deeply from pubsweet-server before, i.e.
`pubsweet-server/src/errors`, this will no longer work, and you need to change your require to
`@pubsweet/errors`.





# [11.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@10.1.0...pubsweet-components@11.0.0) (2019-01-09)


### Bug Fixes

* adjust xpub-review-server to use the new BaseModel models ([7f745f0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7f745f0))
* **model-team:** use correct dependencies ([21552e1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/21552e1))
* change password reset timestamp generation ([600be3a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/600be3a))
* various migration related fixes ([2aef24a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2aef24a))
* **model-user:** change passwordResetTimestamp schema ([e0aafff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e0aafff))
* **model-user:** omit passwordHash from JSON representation ([c33fbee](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c33fbee))
* **model-user:** passwordResetTimestamp can be null ([abfc095](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/abfc095))
* **password-reset-server:** align mailer config with send email ([d1cf251](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d1cf251)), closes [#432](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/432)
* **server:** additionally protect /api/users ([78ae476](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/78ae476))
* **xpub-review-server:** use correct requires ([f8fe5d7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f8fe5d7))


### Features

* add standalone user model ([240beca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/240beca))
* **base-model:** remove proxy for setting model properties ([e9ad1fa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e9ad1fa))
* **components:** remove FormGroup component ([507b242](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/507b242))
* **server:** migrate Collection to a model component ([8380b69](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8380b69))
* introduce [@pubsweet](https://gitlab.coko.foundation/pubsweet)/models package ([7c1a364](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c1a364))
* migrate Fragment to use BaseModel ([bd4c7f9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bd4c7f9))
* migrate team to BaseModel ([512a562](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/512a562))


### BREAKING CHANGES

* **password-reset-server:** Config for mailer is now read from mailer.path, not mailer.transport
* **server:** This adds additional authorization checks for the new user creation REST endpoint.
Your authsome modes have to be updated.
* Previously, passwordResetTimestamp was generated as a number of seconds since
epoch. In the new user data model, all dates are strings in ISO8601 format. This commit fixes the
incosistency and makes password reset work again.
* **server:** Collections, currently stored in a NoSQL-like entities table, are now living in
standalone collections table. Since the constraints from PostgreSQLs columns are stricter than a
JSON data field, where the collection data currently lives, no automatic migration of data is
possible - and migrations will have to be done on a app-by-app basis.
* **components:** FormGroup component has been removed as it is unused. It also uses the old
model/validation system, that will shortly no longer exist.





# [10.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@10.0.2...pubsweet-components@10.1.0) (2018-12-12)


### Bug Fixes

* **xpub-manuscript:** ensure file is present before accessing properties ([15945d4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/15945d4))


### Features

* add email templating component ([4baa6e0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4baa6e0))





## [10.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@10.0.1...pubsweet-components@10.0.2) (2018-12-04)

**Note:** Version bump only for package pubsweet-components





## [10.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@10.0.0...pubsweet-components@10.0.1) (2018-11-30)


### Bug Fixes

* **xpub-edit:** spaces are being eaten on firefox ([8112208](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8112208)), closes [#430](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/430)





# [10.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.10.2...pubsweet-components@10.0.0) (2018-11-29)


### Features

* **various:** update styled-components ([5c51466](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5c51466))
* **various:** upgrade styled-components ([9b886f6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9b886f6))


### BREAKING CHANGES

* **various:** Replace all styled-components .extend with styled()
* **various:** Replace styled-components injectGlobal with new createGlobalStyle





      <a name="9.10.2"></a>
## [9.10.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.10.1...pubsweet-components@9.10.2) (2018-11-16)


### Bug Fixes

* highlight js dependency update ([0fb0733](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0fb0733))




      <a name="9.10.1"></a>
## [9.10.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.10.0...pubsweet-components@9.10.1) (2018-11-13)


### Bug Fixes

* update html-epub dependency ([5f55907](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5f55907))




<a name="9.10.0"></a>
# [9.10.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.9.1...pubsweet-components@9.10.0) (2018-11-05)


### Features

* GraphQL Login component ([70df3de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/70df3de))
* GraphQL Xpub review component ([66b3e73](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/66b3e73))
* GraphQL Xpub submit component ([ba07060](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ba07060))




<a name="9.9.1"></a>
## [9.9.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.9.0...pubsweet-components@9.9.1) (2018-10-17)


### Bug Fixes

* sync cache added ([6989dd6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6989dd6))




<a name="9.9.0"></a>
# [9.9.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.8.0...pubsweet-components@9.9.0) (2018-10-12)


### Features

* conversion of inline notes ([deb2930](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/deb2930))
* download html for pagedJS ([cec190e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cec190e))
* paged exporter ([250510b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/250510b))




<a name="9.8.0"></a>
# [9.8.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.8...pubsweet-components@9.8.0) (2018-10-08)


### Features

* **$epub:** additional converter for ucp ([293274d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/293274d))
* **epub:** additional converter for UCP ([87b3041](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/87b3041))




<a name="9.7.8"></a>
## [9.7.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.7...pubsweet-components@9.7.8) (2018-09-29)




**Note:** Version bump only for package pubsweet-components

<a name="9.7.7"></a>
## [9.7.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.6...pubsweet-components@9.7.7) (2018-09-28)




**Note:** Version bump only for package pubsweet-components

<a name="9.7.6"></a>
## [9.7.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.5...pubsweet-components@9.7.6) (2018-09-27)




**Note:** Version bump only for package pubsweet-components

<a name="9.7.5"></a>
## [9.7.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.4...pubsweet-components@9.7.5) (2018-09-27)




**Note:** Version bump only for package pubsweet-components

<a name="9.7.4"></a>
## [9.7.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.3...pubsweet-components@9.7.4) (2018-09-25)


### Bug Fixes

* **components:** make team manager resitant to undefined objects ([f180348](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f180348))




<a name="9.7.3"></a>
## [9.7.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.2...pubsweet-components@9.7.3) (2018-09-20)




**Note:** Version bump only for package pubsweet-components

<a name="9.7.2"></a>
## [9.7.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.1...pubsweet-components@9.7.2) (2018-09-19)


### Bug Fixes

* exported notes and fix notes on different lines ([1336da6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1336da6))
* **component:** add state to italics ([68ffe93](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/68ffe93))




<a name="9.7.1"></a>
## [9.7.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.7.0...pubsweet-components@9.7.1) (2018-09-06)




**Note:** Version bump only for package pubsweet-components

<a name="9.7.0"></a>
# [9.7.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.6.3...pubsweet-components@9.7.0) (2018-09-04)


### Bug Fixes

* **editor:** remove warnings ([b563efd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b563efd))
* **editor:** replace wax with wax-prosemirror ([d7b12f4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d7b12f4))
* **fomrbuilder:** fix validation ([98b3b5e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98b3b5e))
* **foormbuilder:** linter prettier ([db290ff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/db290ff))
* **formbuilder:** create folder from scratch ([a2d533e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a2d533e))
* **formbuilder:** erase files uneeded ([9bc04cd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9bc04cd))
* **formbuilder:** fixing styling issues to submit ([54bc9a3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/54bc9a3))
* **formbuilder:** test addition ([1379895](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1379895))
* **readme:** change readme files ([eb0ff9b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/eb0ff9b))
* **styleguide:** remove console ([c8f7bb2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c8f7bb2))
* **submit:** fixing authors save field ([bb89f08](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb89f08))
* **submit:** form was updated correctly ([94f9844](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/94f9844))
* **test:** add data-test-id to tabs ([e8a42cb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e8a42cb))
* **test:** fix intgration test ([900f0db](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/900f0db))
* **update:** update dependencies ([52c0002](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/52c0002))
* **xpubformbuilder:** integration test and component ([6806f81](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6806f81))


### Features

* **backend:** add backend check path floder ([8c95e72](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8c95e72))
* **components:** form builder backend requests ([7082b0f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7082b0f))
* **formbuilder:** add components for the builder ([cfae1c0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cfae1c0))
* **formbuilder:** add form redux actions formbuilder ([7436353](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7436353))
* **formbuilder:** add formbuilder component ([c24b9f7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c24b9f7))
* **formbuilder:** add forms layout ([0cd6b9d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0cd6b9d))
* **formbuilder:** add validation for elements ([882935a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/882935a))
* **formbuilder:** layout of form builder ([2bd4956](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2bd4956))
* **submit:** import dynamically the form template ([ac4649e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ac4649e))
* add wax-prose-mirror to xpub ([c397a97](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c397a97))




<a name="9.6.3"></a>
## [9.6.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.6.2...pubsweet-components@9.6.3) (2018-08-23)




**Note:** Version bump only for package pubsweet-components

<a name="9.6.2"></a>
## [9.6.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.6.1...pubsweet-components@9.6.2) (2018-08-22)


### Bug Fixes

* **xpub-edit:** hide menu when readonly ([3a5b846](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3a5b846))




<a name="9.6.1"></a>
## [9.6.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.6.0...pubsweet-components@9.6.1) (2018-08-20)




**Note:** Version bump only for package pubsweet-components

<a name="9.6.0"></a>
# [9.6.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.5.0...pubsweet-components@9.6.0) (2018-08-17)


### Bug Fixes

* **actions:** pubsweet ui responsive ([b1cab9a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b1cab9a))
* **actions:** validationStatus fix ([762432f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/762432f))
* **css:** fix responsiveness of actions ([9bff385](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9bff385))
* **revert:** valildateStatus ([5d6f53e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5d6f53e))
* **style:** remove  enter line ([e2de927](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e2de927))
* **style:** responsive line tool ([c3219ec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c3219ec))
* **warnings:** don't pass every prop to Dom Element ([a27d938](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a27d938))
* **warnings:** don't pass every prop to Dom Element ([d8f5e93](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d8f5e93))
* **warnings:** key actions ([2f176f0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2f176f0))
* **warnings:** naming changes ([e4727ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4727ad))
* **warnings:** remove key from unneeded component ([2dda7a5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2dda7a5))


### Features

* use onBlur ([9990e1e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9990e1e))
* **xpub-edit:** add readonly prop to texteditor ([054bcef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/054bcef))




<a name="9.5.0"></a>
# [9.5.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.4.0...pubsweet-components@9.5.0) (2018-08-02)


### Features

* **aws-s3:** add option to save files with new names ([14e66e3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/14e66e3))




<a name="9.4.0"></a>
# [9.4.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.3.1...pubsweet-components@9.4.0) (2018-07-27)


### Bug Fixes

* keep toolbar height consinstent ([7896e7b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7896e7b))
* **dashboard:** delete associated fragments ([f95c292](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f95c292))


### Features

* add Attachments pubsweet comp for image upload ([a2dc8ca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a2dc8ca))
* remove Wax from manuscript page ([da1147b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/da1147b))
* upload image working ([c77e4e0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c77e4e0))
* upload in progress ([29e48d9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/29e48d9))




<a name="9.3.1"></a>
## [9.3.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.3.0...pubsweet-components@9.3.1) (2018-07-23)


### Bug Fixes

* **dashboard:** add keys to dashboard ([38f73f7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/38f73f7))
* **dashobard:** add key to compoent ([bc76925](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bc76925))
* **review:** change attachment files ([bdfa18d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bdfa18d))
* **review:** change user assign editor ([eadca2b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/eadca2b))
* **submit:** authors Input start open ([03bbe31](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/03bbe31))
* **submit:** fix lint error ([d6c2077](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d6c2077))




<a name="9.3.0"></a>
# [9.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.2.0...pubsweet-components@9.3.0) (2018-07-19)


### Bug Fixes

* add  wax till features done ([6f9fa2c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6f9fa2c))
* linting errors ([1759e9e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1759e9e))
* remove prose-mirror menu ([19028d2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/19028d2))
* **dashboard:** fixing typo message upload ([3fec4ef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3fec4ef))
* wax ver 0.2.5 ([9dce588](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9dce588))
* **teams-manager:** update to fit new server Team model ([ccef37c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ccef37c))


### Features

* add dependency ([6bc93e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6bc93e8))
* add plugins for column resizing and table editing ([d796fe3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d796fe3))
* add resize cursor ([15a17ca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/15a17ca))
* add shortcuts ([7cb5f0b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7cb5f0b))
* add table options ([f7d34d3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f7d34d3))
* add tables schema ([b66e97b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b66e97b))
* basic styling of the editor ([7cc9f59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7cc9f59))
* correct order of plugins ([e8c20f7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e8c20f7))
* create new table command ([429d7ed](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/429d7ed))
* do not display table menu whhen table is not selected ([d4d4bb1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d4d4bb1))
* dropdown from pubsweet/ui in editor's toolbar ([de3d008](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/de3d008))
* rename Dropdown to DropDownTable ([a341592](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a341592))
* some styling ([e4f7f44](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4f7f44))
* styles for table to work properly ([1defda3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1defda3))
* table drop down styling ([04c69bd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/04c69bd))




<a name="9.2.0"></a>
# [9.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.1.0...pubsweet-components@9.2.0) (2018-07-12)


### Bug Fixes

* change shortcut and label text ([882a490](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/882a490))
* have wax back till all feautures are done ([615d77f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/615d77f))
* remove unused code ([b8f7abb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b8f7abb))
* typo ([b2667b6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b2667b6))
* **epub server:** bugfix on a dependency ([a78d1b3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a78d1b3))


### Features

* add bullet list ([f528fd0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f528fd0))
* create main editor ([b0eeca3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b0eeca3))
* hide lift/join if not list ([a63028c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a63028c))
* join and lift lists ([505e306](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/505e306))
* ordered lists in progress ([2ba933f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2ba933f))
* replace wax with noteEditor/add basic,list schema as dependencies ([64ba50a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/64ba50a))




<a name="9.1.0"></a>
# [9.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.0.1...pubsweet-components@9.1.0) (2018-07-09)


### Bug Fixes

* **components:** button to styledButton ([0404203](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0404203))
* **menu:** menu component of layout ([19bebef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/19bebef))
* **menu:** reset function ([2961a85](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2961a85))
* **teamanager:** remove name ([60cd6ee](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/60cd6ee))
* **teammanager:** test fix failing ([c559488](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c559488))
* **teammanager:** update styles component ([c92bbd5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c92bbd5))
* **teams:** update styleguide ([427bcc6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/427bcc6))
* **teams:** update ui ([23f49d5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/23f49d5))
* **test:** mock authorize ([9c89540](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9c89540))
* **test:** update snapshot ([8cd93a4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8cd93a4))
* **whitespaces:** remove whitespaces ([a4803cb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a4803cb))
* **xpub-team-manager:** move files to components ([4421a68](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4421a68))


### Features

* **team-management:** create new team component ([1f4c677](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1f4c677))
* **team-management:** fix page layout ([9f5c6b5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9f5c6b5))
* **xpub-edit:** make debounce delay configurable ([d7784c1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d7784c1))
* correct version number ([56b467a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/56b467a))
* update dependency versions ([51486f4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/51486f4))




<a name="9.0.1"></a>
## [9.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@9.0.0...pubsweet-components@9.0.1) (2018-07-03)




**Note:** Version bump only for package pubsweet-components

<a name="9.0.0"></a>
# [9.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@8.0.1...pubsweet-components@9.0.0) (2018-07-02)


### Bug Fixes

* **components:** import Manage styles in component ([6f0e443](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6f0e443))


### Features

* **ui:** introduce more line height variables ([85c24e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/85c24e2))


### BREAKING CHANGES

* **components:** Manage.scss is now required in the component itself. Since this was usually
required from the app itself, this would now result in double importing of styles.
* **ui:** the existing fontLineHeight variable is gone and replaced by multiple new variables




<a name="8.0.1"></a>
## [8.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@8.0.0...pubsweet-components@8.0.1) (2018-06-28)




**Note:** Version bump only for package pubsweet-components

<a name="8.0.0"></a>
# [8.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@7.1.0...pubsweet-components@8.0.0) (2018-06-28)


### Bug Fixes

* **authorize:** add authorize to hide delete ([125a872](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/125a872))
* **authsome:** update stucture of currentUpdate ([909b80f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/909b80f))
* **component:** erase comment setOwners ([1119d7f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1119d7f))
* **components:** prevent Delete when paper is submitted status ([b556e25](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b556e25))
* **connectpage:** add redirect on anothorized ([2d256a8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2d256a8))
* **dashboard:** make use of authorize ([ccc993c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ccc993c))
* **dashboard:** mock authorize component ([198f95a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/198f95a))
* **monorepo:** fix versions of ui across repo ([72ada07](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/72ada07))
* **styleguide:** correct require path ([79a2b07](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/79a2b07))
* **submit:** add text SubNotes to submit ([d034b05](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d034b05))
* **submit:** change texts get from config ([fbd209f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fbd209f))


### Code Refactoring

* **ui:** replace current gridunit variables with one small value ([cf48f29](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cf48f29))


### Features

* **connectpage:** add authsome mode to ConnectPage ([1f85eff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1f85eff))
* **xpub-edit:** add CSS override hooks ([36bf82c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/36bf82c))
* **xpub-edit:** allow menu icons to be configured ([fb578bf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fb578bf))


### BREAKING CHANGES

* **ui:** Your ui components will now be multiplying a much smaller value so they need to be
adjusted




<a name="7.1.0"></a>
# [7.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@7.0.0...pubsweet-components@7.1.0) (2018-06-19)


### Bug Fixes

* **dashboard:** add actions to dashboard editorItem ([58733b6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/58733b6))
* **dashboard:** empty declaration object ([919bde4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/919bde4))
* add content-type to delete file middleware ([9fd2d92](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9fd2d92))
* **epub:** add code snippets to epub export ([375d5dc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/375d5dc))
* **linter:** error ([7db67f9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7db67f9))
* **metadata:** empty values ([e6f55ea](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e6f55ea))
* **polling server:** locking and unlocking handled in server now ([19ac6bf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/19ac6bf))
* **pubsweet-ui:** tests are failing ([0e57798](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0e57798))
* **send-email-server:** use config package according to documentation ([d05d72f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d05d72f))
* linting errors ([03c52da](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/03c52da))


### Features

* add figure and figcaption on export ([6b3ebd6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6b3ebd6))
* add highlight js to export ([ef08e72](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ef08e72))
* styles for the figcaption ([ae19a09](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ae19a09))




<a name="7.0.0"></a>
# [7.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@6.3.0...pubsweet-components@7.0.0) (2018-06-01)


### Bug Fixes

* **components:** change assigning editors to fragments ([98bc86a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98bc86a))
* **components:** dasboard fixing multiple submissions ([01fa2f9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/01fa2f9))
* **components:** revert assigning editors to version ([74bf8f3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/74bf8f3))
* **components:** submit button show ([2635368](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2635368))
* **dashboard:** empty dashboard collections ([3f4db98](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3f4db98))
* **dashboard:** remove regenerate import and add it to styleguide ([96731cf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/96731cf))
* **dashboard:** section hide on empty ([7a139ec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7a139ec))
* **dashboard:** test change object dashboard ([906ccfd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/906ccfd))
* **review-server:** remove debug logs ([16dc70a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/16dc70a))
* **styleguide:** compile authsome ([8e9407f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8e9407f))
* **test:** dashboard - reviewer test ([30f41b3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/30f41b3))
* **test:** debug test on gitalb ([387d5b7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/387d5b7))
* **test:** debugging on gitlab ([72f5c4f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/72f5c4f))
* **test:** gitlab error ([3c8a4b8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3c8a4b8))
* **test:** review backend test ([3cd439c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3cd439c))
* **test:** reviewer backend server ([edd00ba](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/edd00ba))


### Features

* **components:** add authsome to dashboard ([833a9de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/833a9de))
* **ui:** start ui-toolkit module ([2083b9c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2083b9c))


### BREAKING CHANGES

* **ui:** th now comes from the toolkit, so all th imports from ui are now broken




<a name="6.3.0"></a>
# [6.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@6.2.2...pubsweet-components@6.3.0) (2018-05-24)


### Bug Fixes

* **aws-s3:** add end when sending 204 ([5a72d40](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5a72d40))
* **aws-s3:** handle case when no files were found ([36241c2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/36241c2))


### Features

* **aws-s3:** file download and select zip file types ([e4a876f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4a876f))




<a name="6.2.2"></a>
## [6.2.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@6.2.1...pubsweet-components@6.2.2) (2018-05-21)


### Bug Fixes

* **components:** use Tabs from pubsweet ui ([8e9fd3c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8e9fd3c))




<a name="6.2.1"></a>
## [6.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@6.2.0...pubsweet-components@6.2.1) (2018-05-18)


### Bug Fixes

* use MIT on all package.json files ([4558ae4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4558ae4))
* **components:** add tests to suggestions component ([50777b3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/50777b3))
* **components:** authors assigning problem ([50baa94](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/50baa94))
* **components:** cases with empty editors suggestions ([0a6bd45](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0a6bd45))
* **components:** delete unneeded line ([daea008](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/daea008))
* **components:** rewrite conditional checks to more clean ([c41d79d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c41d79d))
* **components:** submit submitted versions ([48d07ee](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/48d07ee))
* **components:** upload diasble during converting ([227b136](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/227b136))




<a name="6.2.0"></a>
# [6.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@6.1.0...pubsweet-components@6.2.0) (2018-05-10)


### Bug Fixes

* **components:** dashboard if statment reject ([999587a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/999587a))
* **components:** decision linter ([5679ce0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5679ce0))
* **components:** fix lint errors ([4e22ec1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4e22ec1))
* **components:** fix linting issues ([4385b58](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4385b58))
* **components:** fixes in linter ([7c31f6b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c31f6b))
* **components:** html parse, styled components ([8b24552](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8b24552))
* **components:** lint issues ([ff56878](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ff56878))
* **components:** linter ([9aac3fa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9aac3fa))
* **components:** merge two commponets two one ([4e2ed76](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4e2ed76))
* **components:** redirect submission add selectors ([53db5a7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/53db5a7))
* **components:** redux form ([2f7f1ed](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2f7f1ed))
* **components:** review page layout ([4ea2cdd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4ea2cdd))
* **components:** take care of case of zero files ([82cff08](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/82cff08))
* **components:** title wording ([0c293f4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0c293f4))


### Features

* **components:** add columns to submission and tabs ([40470a0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/40470a0))
* **components:** add current version files ([4c77f3c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4c77f3c))
* **components:** add tabs to submission ([0e45892](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0e45892))
* **components:** create accordion component ([05a23e4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/05a23e4))
* **components:** create accordion component ([54f5b7d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/54f5b7d))




<a name="6.1.0"></a>
# [6.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@6.0.0...pubsweet-components@6.1.0) (2018-05-09)


### Bug Fixes

* **xpub-dash:** fix reviewer item crash when status is revision ([fc79496](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc79496))
* fixed misnamed redux form props in authors input ([940edc0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/940edc0))
* fixed misnamed redux form props in authors input ([bb4af56](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb4af56))
* fixed misnamed redux form props in authors input ([fb362b2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fb362b2))
* **xpub-edit:** ensure config is not regenerated on each render ([d98e722](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d98e722))


### Features

* add AuthorsInput component ([f7d12b3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f7d12b3))
* authors input, added padding around fields ([1e5d742](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1e5d742))
* authors input, fixed merge error ([c908fa4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c908fa4))
* authors input, fixed prettier errors ([0657143](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0657143))
* authors input,component  updated to ensure at least one author ([d43dd92](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d43dd92))
* list styles for authors input ([3f85bbd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3f85bbd))
* two inputs per line ([aa0544a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/aa0544a))
* update MetadataFields to use AuthorsInput component ([fa1640e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fa1640e))
* update MetadataFields to use AuthorsInput component ([1baac87](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1baac87))
* update MetadataFields to use AuthorsInput component ([355f282](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/355f282))




<a name="6.0.0"></a>
# [6.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@5.4.0...pubsweet-components@6.0.0) (2018-05-03)


### Bug Fixes

* **theme:** remove warning color ([c0897c8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c0897c8))
* **xpub-dashboard:** correct styles for author manuscripts ([1d8761e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1d8761e))


### BREAKING CHANGES

* **theme:** might break components that used the warning colors




<a name="5.4.0"></a>
# [5.4.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@5.3.2...pubsweet-components@5.4.0) (2018-05-03)


### Bug Fixes

* **components:** add version to collection ([98303ae](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98303ae))
* **components:** align columns cp page ([a5968b0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a5968b0))
* **components:** align dropdown horizontally ([a7081e3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a7081e3))
* **components:** change position and direction of assign ([7a7eeb3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7a7eeb3))
* **components:** change supplymentary to attachment component ([143c452](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/143c452))
* **components:** fix lint errors ([c2b8e52](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c2b8e52))
* **components:** fix lint errors ([2503ff9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2503ff9))
* **components:** fix lint errors ([98046fb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98046fb))
* **components:** fix lint errors ([be173db](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/be173db))
* **components:** fix unsued lint error ([20c282c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/20c282c))
* **components:** load all users to control panel ([92dac6b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/92dac6b))
* **components:** load all users to control panel ([90c88e6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/90c88e6))
* **components:** load all users to control panel ([85fa14f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/85fa14f))
* **components:** load all users to control panel ([f20e44d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f20e44d))
* **components:** loading data in the decision form ([8f499aa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8f499aa))
* **components:** remove from Dashboard assign editor ([751a63e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/751a63e))
* **components:** take care of case of zero files ([b70f728](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b70f728))
* **xpub-edit:** prevent editors from submitting form ([f1f7dda](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f1f7dda))


### Features

* **components:** add assign editors to cp ([3cca44d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3cca44d))
* **components:** add assign editors to cp ([987310d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/987310d))
* **xpub-edit:** create editor component with simple API ([ee6fb83](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee6fb83))




<a name="5.3.2"></a>
## [5.3.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@5.3.1...pubsweet-components@5.3.2) (2018-04-25)




**Note:** Version bump only for package pubsweet-components

<a name="5.3.1"></a>
## [5.3.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@5.3.0...pubsweet-components@5.3.1) (2018-04-25)




**Note:** Version bump only for package pubsweet-components

<a name="5.3.0"></a>
# [5.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@5.2.0...pubsweet-components@5.3.0) (2018-04-24)


### Bug Fixes

* **aws-s3:** update getSigned url ([d6f27ef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d6f27ef))
* **compoenents:** fix cases of empty objects in metadata ([7a5bfbc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7a5bfbc))
* **component:** put striphtml function back to place ([2a69dca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2a69dca))
* **components:** add file streamlined data ([9dd6797](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9dd6797))
* **components:** add metadata StreamLined ([29a1fcd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/29a1fcd))
* **components:** add subinfo to upload ([446fc16](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/446fc16))
* **components:** change order ([2020d49](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2020d49))
* **components:** change placeholder ([d80a41a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d80a41a))
* **components:** change text input fields ([775a961](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/775a961))
* **components:** change text to create submission button ([d3b6385](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d3b6385))
* **components:** change value to files at upload components ([aa2b45e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/aa2b45e))
* **components:** dashboard update ([08feafb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/08feafb))
* **components:** fix file name problem ([73f33c9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/73f33c9))
* **components:** fix review backend test ([874b6a3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/874b6a3))
* **components:** fix test backend authbear ([25c0623](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/25c0623))
* **components:** fix test backend authbear ([7c16970](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c16970))
* **components:** passport through route ([593eeda](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/593eeda))
* **components:** passport through route ([fdf9dce](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fdf9dce))
* **components:** remove tables - add list of metadata ([b9d57cd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b9d57cd))
* **components:** remove xpub-app folder ([d356c6d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d356c6d))
* **components:** statuses changed for revision ([3bc09dc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3bc09dc))
* **components:** structure title under Toolbar ([3e7b76b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3e7b76b))
* **dashboard:** change stremlined metadata label ([992cc4f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/992cc4f))
* **xpub-submit:** use no-redux version of uploadFile ([cc904a3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cc904a3))


### Features

* **component:** add make invitation request ([9e00e11](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9e00e11))
* **component:** add make invitation request ([30193b3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/30193b3))
* **component:** add make invitation request ([7245d35](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7245d35))
* **component:** add make invitation request ([947c846](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/947c846))
* **component:** add make invitation request ([ae785b9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ae785b9))
* **component:** add make invitation request ([36faf21](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/36faf21))
* **component:** add make invitation request ([38e5728](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/38e5728))
* **component:** add make invitation request ([bda7d95](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bda7d95))
* **component:** add make invitation request ([1911bab](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1911bab))
* **component:** add make invitation request ([335d0f0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/335d0f0))
* **component:** add make invitation request ([1412d87](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1412d87))
* **component:** add make invitation request ([d070bb1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d070bb1))
* **component:** add make invitation request ([f9cae33](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f9cae33))
* **component:** add make invitation request ([61a1f0b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/61a1f0b))
* **component:** add make invitation request ([5a9b393](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5a9b393))
* **component:** add make invitation request ([430e9e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/430e9e2))
* **component:** add make invitation request ([3d13943](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3d13943))
* **component:** add make invitation request ([27e2984](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/27e2984))
* **component:** add make invitation request ([b049aa3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b049aa3))
* **component:** add make invitation request ([c4317bb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c4317bb))
* **component:** add make invitation request ([dcd1f46](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/dcd1f46))
* **component:** add make invitation request ([9d731d3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9d731d3))
* **component:** add make invitation request ([9d0ad57](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9d0ad57))
* **component:** add make invitation request ([20628a4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/20628a4))
* **component:** add make invitation request ([44f1574](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/44f1574))
* **component:** add make invitation request ([6f27a3e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6f27a3e))
* **component:** add make invitation request ([3817c8a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3817c8a))
* **component:** add make invitation request ([659eb64](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/659eb64))
* **component:** add make invitation request ([ff3f8fb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ff3f8fb))
* **component:** add make invitation request ([4820e45](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4820e45))
* **component:** add make invitation request ([721bbaf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/721bbaf))
* **component:** add make invitation request ([251381c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/251381c))
* **components:** add API endpoint invitation ([009b693](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/009b693))
* **components:** add API endpoint invitation ([9276ef9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9276ef9))
* **components:** add API endpoint invitation ([ee82d6b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee82d6b))
* **components:** add API endpoint invitation ([e50383f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e50383f))
* **components:** add API endpoint invitation ([fc40c17](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc40c17))
* **components:** add API endpoint invitation ([a781136](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a781136))
* **components:** add API endpoint invitation ([24810b8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/24810b8))
* **components:** add API endpoint invitation ([d21afe6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d21afe6))
* **components:** add API endpoint invitation ([2703f3e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2703f3e))
* **components:** add API endpoint invitation ([24ee6ca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/24ee6ca))
* **components:** add API endpoint invitation ([17d9532](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/17d9532))
* **components:** add API endpoint invitation ([98d568e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98d568e))
* **components:** add API endpoint invitation ([d19bf84](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d19bf84))
* **components:** add API endpoint invitation ([4739b84](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4739b84))
* **components:** add API endpoint invitation ([f963b76](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f963b76))
* **components:** add API endpoint invitation ([10fb6e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/10fb6e2))
* **components:** add API endpoint invitation ([c6d0d94](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c6d0d94))
* **components:** add API endpoint invitation ([16bf6a1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/16bf6a1))
* **components:** add API endpoint invitation ([d897187](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d897187))
* **components:** add API endpoint invitation ([19932d7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/19932d7))
* **components:** add API endpoint invitation ([3c5cbea](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3c5cbea))
* **components:** add API endpoint invitation ([8de6954](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8de6954))
* **components:** add API endpoint invitation ([9e9b4ce](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9e9b4ce))
* **components:** add API endpoint invitation ([daff65a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/daff65a))
* **components:** add API endpoint invitation ([d06ae4b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d06ae4b))
* **components:** add API endpoint invitation ([0ca4cfa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0ca4cfa))
* **components:** add API endpoint invitation ([ae7d9aa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ae7d9aa))
* **components:** add API endpoint invitation ([d6bb84a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d6bb84a))
* **components:** add API endpoint invitation ([3fcc322](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3fcc322))
* **components:** add API endpoint invitation ([db805c4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/db805c4))
* **components:** add API endpoint invitation ([48e8e12](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/48e8e12))
* **components:** add API endpoint invitation ([abdf121](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/abdf121))
* **components:** create invite reviewer endpoints ([17fdfdc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/17fdfdc))
* **components:** create invite reviewer endpoints ([9e3fdef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9e3fdef))
* **components:** create invite reviewer endpoints ([794918c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/794918c))
* **components:** create invite reviewer endpoints ([7c35ccc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c35ccc))
* **components:** create invite reviewer endpoints ([c603b77](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c603b77))
* **components:** create invite reviewer endpoints ([b2f627f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b2f627f))
* **components:** create invite reviewer endpoints ([fc6cad4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc6cad4))
* **components:** create invite reviewer endpoints ([1f57c82](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1f57c82))
* **components:** create invite reviewer endpoints ([8774faa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8774faa))
* **components:** create invite reviewer endpoints ([a47ddf4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a47ddf4))
* **components:** create invite reviewer endpoints ([4b21241](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4b21241))
* **components:** create invite reviewer endpoints ([75e89c8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/75e89c8))
* **components:** create invite reviewer endpoints ([27ec4f8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/27ec4f8))
* **components:** create invite reviewer endpoints ([cfcc711](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cfcc711))
* **components:** create invite reviewer endpoints ([cd83ae9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cd83ae9))
* **components:** create invite reviewer endpoints ([42d65cc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/42d65cc))
* **components:** create invite reviewer endpoints ([442c191](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/442c191))
* **components:** create invite reviewer endpoints ([ea8a42e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ea8a42e))
* **components:** create invite reviewer endpoints ([19a48be](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/19a48be))
* **components:** create invite reviewer endpoints ([74b1ebc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/74b1ebc))
* **components:** create invite reviewer endpoints ([f8e53c7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f8e53c7))
* **components:** create invite reviewer endpoints ([4269fbe](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4269fbe))
* **components:** create invite reviewer endpoints ([4c10e2a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4c10e2a))
* **components:** create invite reviewer endpoints ([e3919ce](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e3919ce))
* **components:** create invite reviewer endpoints ([304ff02](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/304ff02))
* **components:** create invite reviewer endpoints ([f7d7ec2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f7d7ec2))
* **components:** create invite reviewer endpoints ([1b29a5c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1b29a5c))
* **components:** create invite reviewer endpoints ([0e72b91](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0e72b91))
* **components:** create invite reviewer endpoints ([c1d487f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c1d487f))
* **components:** create invite reviewer endpoints ([df75c8f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/df75c8f))
* **components:** create invite reviewer endpoints ([20d456b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/20d456b))
* **components:** create invite reviewer endpoints ([f464beb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f464beb))
* **components:** fix correct update of reviewer ([c1b734e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c1b734e))
* **components:** fix correct update of reviewer ([2476402](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2476402))
* **components:** fix correct update of reviewer ([5988b36](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5988b36))
* **components:** fix correct update of reviewer ([dcd2f94](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/dcd2f94))
* **components:** fix correct update of reviewer ([895bc73](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/895bc73))
* **components:** fix correct update of reviewer ([d7553ef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d7553ef))
* **components:** fix correct update of reviewer ([1b449ab](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1b449ab))
* **components:** fix correct update of reviewer ([3d2d412](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3d2d412))
* **components:** fix correct update of reviewer ([358a8f6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/358a8f6))
* **components:** fix correct update of reviewer ([45b7375](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/45b7375))
* **components:** fix correct update of reviewer ([11c44ae](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/11c44ae))
* **components:** fix correct update of reviewer ([ec31850](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ec31850))
* **components:** fix correct update of reviewer ([b22a250](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b22a250))
* **components:** fix correct update of reviewer ([46fdc54](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/46fdc54))
* **components:** fix correct update of reviewer ([6a423e4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6a423e4))
* **components:** fix correct update of reviewer ([ee775be](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee775be))
* **components:** fix correct update of reviewer ([c030cce](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c030cce))
* **components:** fix correct update of reviewer ([30559e0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/30559e0))
* **components:** fix correct update of reviewer ([acd3a2d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/acd3a2d))
* **components:** fix correct update of reviewer ([b937db4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b937db4))
* **components:** fix correct update of reviewer ([48a70a8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/48a70a8))
* **components:** fix correct update of reviewer ([d5de1d0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d5de1d0))
* **components:** fix correct update of reviewer ([b42550f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b42550f))
* **components:** fix correct update of reviewer ([fe67780](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fe67780))
* **components:** fix correct update of reviewer ([b4ac0ec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b4ac0ec))
* **components:** fix correct update of reviewer ([4a26556](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4a26556))
* **components:** fix correct update of reviewer ([bc8ef13](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bc8ef13))
* **components:** fix correct update of reviewer ([a30f25e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a30f25e))
* **components:** fix correct update of reviewer ([fb692e9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fb692e9))
* **components:** fix correct update of reviewer ([be3ce7b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/be3ce7b))
* **components:** fix correct update of reviewer ([b700d30](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b700d30))
* **components:** fix correct update of reviewer ([4c9a7d9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4c9a7d9))
* **components:** invitation email ([2c3e61d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2c3e61d))
* **components:** invitation email ([b479847](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b479847))
* **components:** invitation email ([77a0ae4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/77a0ae4))
* **components:** invitation email ([f252b17](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f252b17))
* **components:** invitation email ([1ca6d60](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1ca6d60))
* **components:** invitation email ([e55a10a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e55a10a))
* **components:** invitation email ([3aab5d1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3aab5d1))
* **components:** invitation email ([ae51c4c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ae51c4c))
* **components:** invitation email ([f8bea7f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f8bea7f))
* **components:** invitation email ([b27816d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b27816d))
* **components:** invitation email ([74720ee](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/74720ee))
* **components:** invitation email ([da5d78d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/da5d78d))
* **components:** invitation email ([c2ef155](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c2ef155))
* **components:** invitation email ([af6f384](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/af6f384))
* **components:** invitation email ([c2ebb60](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c2ebb60))
* **components:** invitation email ([f557112](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f557112))
* **components:** invitation email ([8afcd9c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8afcd9c))
* **components:** invitation email ([f6d93cf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f6d93cf))
* **components:** invitation email ([860f233](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/860f233))
* **components:** invitation email ([087d151](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/087d151))
* **components:** invitation email ([75d3ac1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/75d3ac1))
* **components:** invitation email ([1e4bc4f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1e4bc4f))
* **components:** invitation email ([5d4d10e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5d4d10e))
* **components:** invitation email ([34d3054](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/34d3054))
* **components:** invitation email ([3d6b89b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3d6b89b))
* **components:** invitation email ([43a53a9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/43a53a9))
* **components:** invitation email ([fbac60d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fbac60d))
* **components:** invitation email ([d0d30af](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d0d30af))
* **components:** invitation email ([0da74f6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0da74f6))
* **components:** invitation email ([6ee4a13](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6ee4a13))
* **components:** invitation email ([de5f871](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/de5f871))
* **components:** invitation email ([b8c9d1d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b8c9d1d))
* **components:** remove console ([ca53a45](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ca53a45))
* **components:** remove console ([ddfb7bc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ddfb7bc))
* **components:** remove console ([9653464](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9653464))
* **components:** remove console ([ff1da0e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ff1da0e))
* **components:** remove console ([36143dc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/36143dc))
* **components:** remove console ([4701387](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4701387))
* **components:** remove console ([69f0d81](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/69f0d81))
* **components:** remove console ([f118e50](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f118e50))
* **components:** remove console ([c3d6adb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c3d6adb))
* **components:** remove console ([5fd5969](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5fd5969))
* **components:** remove console ([ee993c6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee993c6))
* **components:** remove console ([32bcb22](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32bcb22))
* **components:** remove console ([4394268](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4394268))
* **components:** remove console ([4b14588](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4b14588))
* **components:** remove console ([ce03041](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ce03041))
* **components:** remove console ([f639d2c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f639d2c))
* **components:** remove console ([9413dcf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9413dcf))
* **components:** remove console ([cfde302](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cfde302))
* **components:** remove console ([aaf36d2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/aaf36d2))
* **components:** remove console ([29841d9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/29841d9))
* **components:** remove console ([842e654](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/842e654))
* **components:** remove console ([8eca1a1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8eca1a1))
* **components:** remove console ([f3cf5a0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f3cf5a0))
* **components:** remove console ([88c5b82](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/88c5b82))
* **components:** remove console ([7517e78](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7517e78))
* **components:** remove console ([050607f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/050607f))
* **components:** remove console ([20093f8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/20093f8))
* **components:** remove console ([ad079d5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ad079d5))
* **components:** remove console ([d0d32f4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d0d32f4))
* **components:** remove console ([ec4c2cb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ec4c2cb))
* **components:** remove console ([b04eb5d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b04eb5d))
* **components:** remove console ([fb5e7c2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fb5e7c2))
* **components:** write test for api/make-invitation ([a8ba38e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a8ba38e))
* **components:** write test for api/make-invitation ([c03f745](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c03f745))
* **xpub-submit:** move GraphQL functionality into separate component ([cfb2a81](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cfb2a81))




<a name="5.2.0"></a>
# [5.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-components@5.1.0...pubsweet-components@5.2.0) (2018-04-11)


### Bug Fixes

* **components:** change title styling ([3c154ba](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3c154ba))
* bump standard dependency ([0c599db](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0c599db))


### Features

* **components:** add Link to control panel ([85458b9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/85458b9))
* **components:** fix import add link ([dfe4818](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/dfe4818))




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
