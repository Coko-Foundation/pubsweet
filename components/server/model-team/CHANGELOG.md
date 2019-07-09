# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.15](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.14...@pubsweet/model-team@2.0.15) (2019-07-09)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.14](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.13...@pubsweet/model-team@2.0.14) (2019-07-03)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.13](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.12...@pubsweet/model-team@2.0.13) (2019-06-28)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.12](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.11...@pubsweet/model-team@2.0.12) (2019-06-24)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.11](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.10...@pubsweet/model-team@2.0.11) (2019-06-21)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.9...@pubsweet/model-team@2.0.10) (2019-06-13)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.8...@pubsweet/model-team@2.0.9) (2019-06-12)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.7...@pubsweet/model-team@2.0.8) (2019-05-27)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.6...@pubsweet/model-team@2.0.7) (2019-04-25)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.5...@pubsweet/model-team@2.0.6) (2019-04-18)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.4...@pubsweet/model-team@2.0.5) (2019-04-09)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.3...@pubsweet/model-team@2.0.4) (2019-03-06)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.2...@pubsweet/model-team@2.0.3) (2019-03-05)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.1...@pubsweet/model-team@2.0.2) (2019-02-19)

**Note:** Version bump only for package @pubsweet/model-team





## [2.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@2.0.0...@pubsweet/model-team@2.0.1) (2019-02-19)

**Note:** Version bump only for package @pubsweet/model-team





# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@1.0.4...@pubsweet/model-team@2.0.0) (2019-02-01)


### Bug Fixes

* **model-team:** fix membership update query ([918da4e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/918da4e))
* **model-team:** use model (not db) identifiers ([6535ca3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6535ca3))


### Features

* add team relationship to user and test it ([a10e81c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a10e81c))
* **model-team:** add addMember, removeMember, improve fetching ([9c48f2c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9c48f2c))
* **model-team:** introduce TeamMember model ([dfb2cce](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/dfb2cce))
* remove REST endpoints ([585881b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/585881b))
* **model-team:** migrate team members ([9dd8943](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9dd8943))
* **model-team:** simplify objectId and objectType storage ([665cf85](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/665cf85))
* **model-team:** simplify team and members into one component ([3cc9e8a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3cc9e8a))
* **model-team:** use authorization helpers available from context ([6a4be16](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6a4be16))
* **teams:** add alias and team member management ([bb2efb4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb2efb4))
* very basic backend/working users manager ([b3c06b6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b3c06b6))


### BREAKING CHANGES

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





## [1.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@1.0.3...@pubsweet/model-team@1.0.4) (2019-01-16)

**Note:** Version bump only for package @pubsweet/model-team





## [1.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@1.0.2...@pubsweet/model-team@1.0.3) (2019-01-14)

**Note:** Version bump only for package @pubsweet/model-team





## [1.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@1.0.1...@pubsweet/model-team@1.0.2) (2019-01-13)

**Note:** Version bump only for package @pubsweet/model-team





## [1.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/model-team@1.0.1-alpha.0...@pubsweet/model-team@1.0.1) (2019-01-09)

**Note:** Version bump only for package @pubsweet/model-team





## 1.0.1-alpha.0 (2018-11-23)


### Bug Fixes

* **model-team:** use correct dependencies ([21552e1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/21552e1))


### Features

* migrate team to BaseModel ([512a562](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/512a562))
