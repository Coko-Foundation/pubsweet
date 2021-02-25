# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.9...@pubsweet/model-user@6.0.10) (2021-02-25)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.8...@pubsweet/model-user@6.0.9) (2021-02-23)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.7...@pubsweet/model-user@6.0.8) (2021-02-23)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.6...@pubsweet/model-user@6.0.7) (2020-12-21)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.5...@pubsweet/model-user@6.0.6) (2020-11-19)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.4...@pubsweet/model-user@6.0.5) (2020-11-18)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.3...@pubsweet/model-user@6.0.4) (2020-11-16)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.2...@pubsweet/model-user@6.0.3) (2020-07-17)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.1...@pubsweet/model-user@6.0.2) (2020-05-13)

**Note:** Version bump only for package @pubsweet/model-user





## [6.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@6.0.0...@pubsweet/model-user@6.0.1) (2020-04-24)

**Note:** Version bump only for package @pubsweet/model-user





# [6.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.12...@pubsweet/model-user@6.0.0) (2020-04-06)


### Bug Fixes

* **model-user:** expose email on the user type too ([f792c77](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f792c777b9b45954624feb44573ac54f5ef29e7c))
* **model-user:** re-add admin property in schema ([91bed5b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/91bed5b3a02902951bb3e670a0e23a1c5625edaa))


### Code Refactoring

* **model-user:** drops the framents & collections columns on user ([c8521d3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c8521d327c02e79a1484b03218f87673de5d1af9))


### Features

* **model-user:** add identity table and basic model ([d5347a0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d5347a075fa89958fd31c1102efe087df75bff2f))
* **model-user:** add user to default identity migration ([ab4e32f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ab4e32ff7b76c5258902755c385ae09c5480dd42))
* **model-user:** allow multiple identities with isDefault false ([543b4cd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/543b4cdf076df2e0826c6b553e24ea466a7d99d8))
* **model-user:** change user model to account for identities ([8ae24e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8ae24e81127abdffe217b77a3339b4a7522910ed))
* **model-user:** handle password check if password hash does not exist ([55cc082](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/55cc0828de09aa223a7a4eb031341ab280c4a73d))
* **model-user:** use defaultIdentityId on user for default identity ([90504d8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/90504d88b6467cababbd238b6f459c632453fb20))


### BREAKING CHANGES

* **model-user:** If you were depending on the fragments and collections array/column on the User
model itself (vs. custom models with foreign key relationships), then this is a breaking change and
you need to write a migration.
* **model-user:** This migrates the users table in a destructive way (the data is transferred to the
new table, but no longer exists on the users table). Be careful!
* **model-user:** The user model is advancing into the next stage of its life. It no longer has
collections or fragments arrays, and some crucial pieces of functionality are being moved into the
Identity model. As such, this is a SEVERELY BREAKING CHANGE, you have been warned. It's still
possible this is not a breaking change in some specific circumstances, and we will try to maximize
those by providing sensible migrations, but it is very unlikely nonetheless. Please let us know if
you have any questions when/if you decide to migrate.





## [5.1.12](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.11...@pubsweet/model-user@5.1.12) (2020-03-16)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.11](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.10...@pubsweet/model-user@5.1.11) (2020-03-04)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.9...@pubsweet/model-user@5.1.10) (2020-02-28)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.8...@pubsweet/model-user@5.1.9) (2020-02-26)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.7...@pubsweet/model-user@5.1.8) (2020-01-29)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.6...@pubsweet/model-user@5.1.7) (2020-01-23)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.5...@pubsweet/model-user@5.1.6) (2019-12-11)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.4...@pubsweet/model-user@5.1.5) (2019-11-11)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.3...@pubsweet/model-user@5.1.4) (2019-09-11)


### Bug Fixes

* **models:** do not use hardcoded paths in relation mappings ([0cd9e3c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0cd9e3c))





## [5.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.2...@pubsweet/model-user@5.1.3) (2019-09-04)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.1...@pubsweet/model-user@5.1.2) (2019-08-30)

**Note:** Version bump only for package @pubsweet/model-user





## [5.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.1.0...@pubsweet/model-user@5.1.1) (2019-08-08)

**Note:** Version bump only for package @pubsweet/model-user





# [5.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.0.5...@pubsweet/model-user@5.1.0) (2019-08-05)


### Features

* **loaders:** add dataloaders to context by default ([c4c2255](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c4c2255))





## [5.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.0.4...@pubsweet/model-user@5.0.5) (2019-07-12)

**Note:** Version bump only for package @pubsweet/model-user





## [5.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.0.3...@pubsweet/model-user@5.0.4) (2019-07-09)


### Bug Fixes

* **model-user:** make sure teams are returned with current user ([f1049d2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f1049d2))





## [5.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.0.2...@pubsweet/model-user@5.0.3) (2019-07-03)

**Note:** Version bump only for package @pubsweet/model-user





## [5.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.0.1...@pubsweet/model-user@5.0.2) (2019-06-28)


### Bug Fixes

* **model-user:** make user.teams nullable ([e3fe2da](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e3fe2da))





## [5.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@5.0.0...@pubsweet/model-user@5.0.1) (2019-06-24)

**Note:** Version bump only for package @pubsweet/model-user





# [5.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.10...@pubsweet/model-user@5.0.0) (2019-06-21)


### Features

* **model-user:** move unique constraints verification into db ([38a941b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/38a941b))


### BREAKING CHANGES

* **model-user:** Moves unique constraints from save()/isUniq() to database-native checks.





## [4.0.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.9...@pubsweet/model-user@4.0.10) (2019-06-13)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.8...@pubsweet/model-user@4.0.9) (2019-06-12)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.7...@pubsweet/model-user@4.0.8) (2019-05-27)

**Note:** Version bump only for package @pubsweet/model-user





## [4.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-user@4.0.6...@pubsweet/model-user@4.0.7) (2019-04-25)

**Note:** Version bump only for package @pubsweet/model-user





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
