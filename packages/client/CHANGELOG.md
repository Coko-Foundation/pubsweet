# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [11.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/client@11.0.1...@pubsweet/client@11.0.2) (2020-11-19)


### Bug Fixes

* **client:** allow client env variables to work for graphql and websockets ([66e5903](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/66e590371f05404c2e2839cb1ade949397d9af88))





## [11.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/client@11.0.0...@pubsweet/client@11.0.1) (2020-11-18)


### Bug Fixes

* **client:** fix gql import ([f99e2ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f99e2ad4698407577d5fcd6d789d2153a0437e38))





# 11.0.0 (2020-11-18)


### Bug Fixes

* **authenticated-component:** redirect to next path ([fbde445](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fbde445d13f00fe7c0ece323b3ff43238c70f698))
* **authorize:** change teamType to role ([f1a83f2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f1a83f238fc035a78b2ef777a07cf09b7b28f89b))
* **authorize:** fix test for role ([10a8aea](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/10a8aeaafef326da2e16c78ea834bb44b132d3f5))
* **client:** add missing devDependencies ([d0cb380](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d0cb3808973a3c249ef1c41e963d61489fbaed1e))
* **client:** add tests to graphql HOCs ([440bb4b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/440bb4b805abccbf9a259d6bb178b59e5ceb63d1))
* **client:** cover case of no content-type ([71ffb5a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/71ffb5a78bb4918f86e3274759356dbf1462e320))
* **client:** create a new authsome instance if not supplied ([fcc5423](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fcc54233f0ce7bbeee54cdc6279346f518328ba4))
* **client:** fix graphql queries ([3003c50](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3003c50fa5df669e36b78cf5d83e217e5aff8828))
* **client:** improve stripTypenames for null variables ([eb9e42b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/eb9e42b8b4699f90e6568307f4be3032da08c7ae))
* **styleguide:** temporarily disable styleguide ([e519ed1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e519ed146da1e134c0a0c5f126a261d658b27888))
* get current user in authorize component ([ae773fa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ae773fa51eb2a7a5f0737dd510aa85301e47f339))
* test fixes ([651a697](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/651a69747b77c0ea08294d5ff2c324f0381e3089))
* upgrade styled-normalize ([98f2e4c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98f2e4c97ae36d7cdf53d1dfe8fc9de8c325ec81))
* **authorize:** fix for correct props propagation ([5de8ea8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5de8ea883fc4584b400de16fe653150a83582c3c))
* **subscriptions:** get token from local storage on each reconnect ([68dabdc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/68dabdcad2ade8b45f169c8322727b4f8fe1cd5b))
* use named graphql queries ([03e5656](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/03e56567d9696ae5bb9ff96615793b0978be4133))
* **authorize:** render function component ([cebdaa3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cebdaa372e3c0fd910f731bdce49fc153991456d))
* **client:** initialize an authsome mode from config if not supplied ([e0b7416](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e0b7416240ae62da75f4101f1196185cf8eb052c))
* fixed minor mistake ([cbe6d75](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cbe6d750f3cde0a3463167c796e39446f99a2270))
* fixed websocket protocol over https ([2235990](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2235990450c04b74c16a67fd262cd6bf324b4a3d))
* **authsome:** change names to tests and function ([3f3559c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3f3559c42448acde4b02b961056c740c4e9ba9c8))
* **client:** add ui dependency ([cc1a8ae](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cc1a8aed959087069822979dc8c408fcb221c038))
* **client:** remove unused dependency on login component ([6c5dd97](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6c5dd97e351c4626182168c115528e9be3fe329b))
* **graphql:** disable authentication for websocket link ([06305c7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/06305c7b813400d2b9086b08c04dfc4543ba49f2))
* **pubsweet-ui:** tests are failing ([0e57798](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0e57798410dd1792df5a468fc3da18aebd4f8918))
* **server:** use the existing http server for subscriptions ([c5d1362](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c5d1362bb7a0ed1a86c140af83f3a1c84bcebb3d))
* **test:** fix Root test in client ([c6ed350](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c6ed350b05afcffd96e7ce3f2649157d00dcd4f6))
* **warnings:** naming changes ([e4727ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4727ad505f7987673b0b40bbd528dcc6b977c41))
* downgrade styled-components dependency in pubsweet-client ([718558e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/718558e8b17d3cd703a9364b99ad1d960080c2f8))
* update Root to use new StyleRoot component ([9d4c0ef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9d4c0ef6da0ea2a2ddf5775edf87f1ba41088ef7))
* use one file at monorepo root ([456f49b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/456f49bdfc3fedbc9bd012592ba0ee19465f9efb))


### Code Refactoring

* **apollo:** update react-dom version ([e001d01](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e001d013b4c7d912c4ae309c505b870794d5a46c))
* temporarily remove unmigrated components ([32db6ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32db6ad5de4c8a7a1e423c72ec328d7946fc6c51))


### Features

* **authorize:** add more team fields on GetUser ([eab6257](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/eab6257c3fd37f50f07814e9d36f4019b538c136))
* **client:** add AuthorizeWithGraphQL ([57eca9a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/57eca9aab14053d6f0b6e5b73fd84bb3944fe12a))
* **client:** add env variable to set server url ([1daaf97](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1daaf97ae8693595aed99f558ff9390b4ae84475))
* **client:** add scope to pubsweet client package name ([e9c62e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e9c62e885c6c21c31e33e27cef1fc0fed4035396))
* **client:** automatically remove __typename from mutation inputs ([25ba9ec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/25ba9ec2fae45f550f346e59a943e349f967875f))
* **client:** remove export of validations.js ([1fc94fe](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1fc94fee3f3dc1831259658216e16b38ae542ed6))
* **client:** upgrade client to apollo client 3 & add playground ([a2033b8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a2033b891d20c399dba96af9eb05cb7b89d6ea49))
* **client:** use dist as main ([e1da289](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e1da289f87589afd254bd8974e5513767e12b5e8))
* **component-login:** upgrade to latest apollo client ([fe9abcf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fe9abcf7799c0ea39336c9246688b5d82ecb73b8))
* **docs:** working styleguide ([12cd248](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/12cd24839103cf23791ac188d826571c8fee1f1a))
* add base-model package for standalone data models ([fc446e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc446e85190ac313ea7b5803f71bad9c1d793599)), closes [#395](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/395)
* add global property to team ([81b2a7b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/81b2a7b047a3aa93d0675080005fc092360e418b)), closes [#424](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/424)
* GraphQL Login component ([70df3de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/70df3de484955bb5277cb0a826f08066b51977d0))
* remove redux ([4217850](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4217850602d4738993e9dc0f363acface171a89b))
* remove REST endpoints ([585881b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/585881b3c3e80696dfae1d4cc5911503ae5833e0))
* **client:** add Apollo Client ([2fe9d93](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2fe9d939c97a57dc46533aedd0b901a11b77915f))
* **client:** add styled components ([43ab2c5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/43ab2c5a480cd1eada7619ffe70bf53d1f6e4e75))
* **client:** add support for Team SSE ([429d113](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/429d1137be26879e08c0cd7f8c7dbcaf768ee40a))
* **client:** upgrade React to version 16 ([626cf59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/626cf5901d9f5dedf06960f4fe5e1bcbffd86044)), closes [#65](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/65)
* **graphql:** add subscription support to graphql ([d71b0c6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d71b0c69bb2a60dda3612590e3b834611f864a22))
* **graphql:** enable authentication over the websocket ([98c9e6d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98c9e6d7657cc434f91abf3213907d7ac38cf622))
* **graphql:** get hostname from variables ([64b7c4f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/64b7c4f0c240f208cd5e7ca3ecc045569b96b4d2))
* **graphql:** make connection to websocket optional ([695f1bb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/695f1bb4da9d9b805fcdbc869d0a001b5a20587a))
* **normalize:** add normalize css ([9eb24e5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9eb24e5acc44798446840de5b8f0a3db0f4b92a3))
* **pubsweet-client:** upgrade styled-components ([04e9061](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/04e9061d1016ff202548e8584d9aa8a055cb6ec7))
* **ui:** add theming to Tags ([ee959d2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee959d264bb50654c6c2a0f93347d2cb0920afd3))
* **ui:** introduce more line height variables ([85c24e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/85c24e275027c2b9c1ab607cb17d4715b5711413))
* **ui:** start ui-toolkit module ([2083b9c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2083b9c9b792c32ad75fd3e9f19f7934d328e456))
* enable the Apollo client to be customised ([0546acc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0546acc086dd92fb1ea62440c5a6fca3420238b9))


### BREAKING CHANGES

* **component-login:** Major apollo client version changed
* **client:** Package name has changed for pubsweet-client
* **client:** Major version of apollo client has changed
* **apollo:** The minimum supported React version by @apollo is now 16.8
* A lot of unmigrated (not yet moved from REST/Redux to GraphQL/Apollo system) bits
have changed. There might be some breaking changes as a result. This is a big migration involving
big changes - if you encounter anything weird, please contact us on GitLab or on Mattermost.
* This removes all previous /api endpoints, with the exception of file upload.
* All components that rely on Redux's actions and reducers will cease to work in this
version. Migrating to GraphQL and Apollo on the client and server is advised.
* **client:** pubsweet-client no longer exports validations
* **pubsweet-client:** Replace styled-components injectGlobal with new createGlobalStyle
* Teams now have a built-in global property meant to distinguish between object-based
teams and global teams. Previously a global team was defined as a team missing its object, but since
that is ambiguous, i.e. an object can be missing for several reasons - a global property is much
more straight-forward. If you were already using a .global property on Team in your app, your app
will break as the GraphQL schema will conflict.
* In PubSweet server, the exported thing is no longer startServer directly, but it's
now part of the exported object. This will break applications that use the equivalent of const
startServer = require('pubsweet-server'). The new method for getting a startServer is const {
startServer } = require('pubsweet-server').
* **ui:** the existing fontLineHeight variable is gone and replaced by multiple new variables
* **ui:** th now comes from the toolkit, so all th imports from ui are now broken
* **client:** Upgrade React to version 16





# [10.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.2.5...pubsweet-client@10.3.0) (2020-11-16)


### Features

* **client:** add env variable to set server url ([1daaf97](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1daaf97ae8693595aed99f558ff9390b4ae84475))





## [10.2.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.2.4...pubsweet-client@10.2.5) (2020-07-17)

**Note:** Version bump only for package pubsweet-client





## [10.2.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.2.3...pubsweet-client@10.2.4) (2020-05-13)

**Note:** Version bump only for package pubsweet-client





## [10.2.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.2.2...pubsweet-client@10.2.3) (2020-04-24)

**Note:** Version bump only for package pubsweet-client





## [10.2.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.2.1...pubsweet-client@10.2.2) (2020-04-06)

**Note:** Version bump only for package pubsweet-client





## [10.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.2.0...pubsweet-client@10.2.1) (2020-03-16)

**Note:** Version bump only for package pubsweet-client





# [10.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.1.5...pubsweet-client@10.2.0) (2020-03-04)


### Features

* **client:** use dist as main ([e1da289](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e1da289f87589afd254bd8974e5513767e12b5e8))





## [10.1.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.1.4...pubsweet-client@10.1.5) (2020-02-28)


### Bug Fixes

* **client:** improve stripTypenames for null variables ([eb9e42b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/eb9e42b8b4699f90e6568307f4be3032da08c7ae))





## [10.1.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.1.3...pubsweet-client@10.1.4) (2020-02-26)

**Note:** Version bump only for package pubsweet-client





## [10.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.1.2...pubsweet-client@10.1.3) (2020-01-29)

**Note:** Version bump only for package pubsweet-client





## [10.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.1.1...pubsweet-client@10.1.2) (2020-01-23)

**Note:** Version bump only for package pubsweet-client





## [10.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.1.0...pubsweet-client@10.1.1) (2019-12-11)

**Note:** Version bump only for package pubsweet-client





# [10.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.0.2...pubsweet-client@10.1.0) (2019-11-11)


### Features

* **client:** automatically remove __typename from mutation inputs ([25ba9ec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/25ba9ec2fae45f550f346e59a943e349f967875f))





## [10.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.0.1...pubsweet-client@10.0.2) (2019-09-11)

**Note:** Version bump only for package pubsweet-client





## [10.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@10.0.0...pubsweet-client@10.0.1) (2019-09-04)

**Note:** Version bump only for package pubsweet-client





# [10.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.13...pubsweet-client@10.0.0) (2019-08-30)


### Code Refactoring

* **apollo:** update react-dom version ([e001d01](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e001d01))


### BREAKING CHANGES

* **apollo:** The minimum supported React version by @apollo is now 16.8





## [9.2.13](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.12...pubsweet-client@9.2.13) (2019-08-08)

**Note:** Version bump only for package pubsweet-client





## [9.2.12](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.11...pubsweet-client@9.2.12) (2019-08-05)

**Note:** Version bump only for package pubsweet-client





## [9.2.11](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.10...pubsweet-client@9.2.11) (2019-07-12)

**Note:** Version bump only for package pubsweet-client





## [9.2.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.9...pubsweet-client@9.2.10) (2019-07-09)

**Note:** Version bump only for package pubsweet-client





## [9.2.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.8...pubsweet-client@9.2.9) (2019-07-03)

**Note:** Version bump only for package pubsweet-client





## [9.2.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.7...pubsweet-client@9.2.8) (2019-06-28)

**Note:** Version bump only for package pubsweet-client





## [9.2.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.6...pubsweet-client@9.2.7) (2019-06-24)

**Note:** Version bump only for package pubsweet-client





## [9.2.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.5...pubsweet-client@9.2.6) (2019-06-21)

**Note:** Version bump only for package pubsweet-client





## [9.2.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.4...pubsweet-client@9.2.5) (2019-06-13)

**Note:** Version bump only for package pubsweet-client





## [9.2.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.3...pubsweet-client@9.2.4) (2019-06-12)

**Note:** Version bump only for package pubsweet-client





## [9.2.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.2...pubsweet-client@9.2.3) (2019-05-27)

**Note:** Version bump only for package pubsweet-client





## [9.2.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.1...pubsweet-client@9.2.2) (2019-04-25)

**Note:** Version bump only for package pubsweet-client





## [9.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.2.0...pubsweet-client@9.2.1) (2019-04-18)

**Note:** Version bump only for package pubsweet-client





# [9.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.1.0...pubsweet-client@9.2.0) (2019-04-09)


### Features

* **docs:** working styleguide ([12cd248](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/12cd248))





# [9.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.0.3...pubsweet-client@9.1.0) (2019-03-06)


### Bug Fixes

* **authorize:** change teamType to role ([f1a83f2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f1a83f2))
* **authorize:** fix test for role ([10a8aea](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/10a8aea))


### Features

* **authorize:** add more team fields on GetUser ([eab6257](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/eab6257))





## [9.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.0.2...pubsweet-client@9.0.3) (2019-03-05)

**Note:** Version bump only for package pubsweet-client





## [9.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.0.1...pubsweet-client@9.0.2) (2019-02-19)

**Note:** Version bump only for package pubsweet-client





## [9.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@9.0.0...pubsweet-client@9.0.1) (2019-02-19)

**Note:** Version bump only for package pubsweet-client





# [9.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@8.0.4...pubsweet-client@9.0.0) (2019-02-01)


### Bug Fixes

* **styleguide:** temporarily disable styleguide ([e519ed1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e519ed1))


### Code Refactoring

* temporarily remove unmigrated components ([32db6ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32db6ad))


### Features

* remove redux ([4217850](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4217850))
* remove REST endpoints ([585881b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/585881b))


### BREAKING CHANGES

* A lot of unmigrated (not yet moved from REST/Redux to GraphQL/Apollo system) bits
have changed. There might be some breaking changes as a result. This is a big migration involving
big changes - if you encounter anything weird, please contact us on GitLab or on Mattermost.
* This removes all previous /api endpoints, with the exception of file upload.
* All components that rely on Redux's actions and reducers will cease to work in this
version. Migrating to GraphQL and Apollo on the client and server is advised.





## [8.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@8.0.3...pubsweet-client@8.0.4) (2019-01-16)

**Note:** Version bump only for package pubsweet-client





## [8.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@8.0.2...pubsweet-client@8.0.3) (2019-01-14)

**Note:** Version bump only for package pubsweet-client





## [8.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@8.0.1...pubsweet-client@8.0.2) (2019-01-13)

**Note:** Version bump only for package pubsweet-client





## [8.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@8.0.0...pubsweet-client@8.0.1) (2019-01-09)


### Bug Fixes

* **client:** cover case of no content-type ([71ffb5a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/71ffb5a))





# [8.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@7.0.2...pubsweet-client@8.0.0) (2018-12-12)


### Features

* **client:** remove export of validations.js ([1fc94fe](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1fc94fe))


### BREAKING CHANGES

* **client:** pubsweet-client no longer exports validations





## [7.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@7.0.1...pubsweet-client@7.0.2) (2018-12-04)

**Note:** Version bump only for package pubsweet-client





## [7.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@7.0.0...pubsweet-client@7.0.1) (2018-11-30)

**Note:** Version bump only for package pubsweet-client





# [7.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@6.1.0...pubsweet-client@7.0.0) (2018-11-29)


### Bug Fixes

* test fixes ([651a697](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/651a697))
* upgrade styled-normalize ([98f2e4c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98f2e4c))


### Features

* **pubsweet-client:** upgrade styled-components ([04e9061](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/04e9061))


### BREAKING CHANGES

* **pubsweet-client:** Replace styled-components injectGlobal with new createGlobalStyle





<a name="6.1.0"></a>
# [6.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@6.0.1...pubsweet-client@6.1.0) (2018-11-05)


### Features

* GraphQL Login component ([70df3de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/70df3de))




<a name="6.0.1"></a>
## [6.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@6.0.0...pubsweet-client@6.0.1) (2018-10-08)




**Note:** Version bump only for package pubsweet-client

<a name="6.0.0"></a>
# [6.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@5.0.2...pubsweet-client@6.0.0) (2018-09-29)


### Features

* add global property to team ([81b2a7b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/81b2a7b)), closes [#424](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/424)


### BREAKING CHANGES

* Teams now have a built-in global property meant to distinguish between object-based
teams and global teams. Previously a global team was defined as a team missing its object, but since
that is ambiguous, i.e. an object can be missing for several reasons - a global property is much
more straight-forward. If you were already using a .global property on Team in your app, your app
will break as the GraphQL schema will conflict.




<a name="5.0.2"></a>
## [5.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@5.0.1...pubsweet-client@5.0.2) (2018-09-27)




**Note:** Version bump only for package pubsweet-client

<a name="5.0.1"></a>
## [5.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@5.0.0...pubsweet-client@5.0.1) (2018-09-25)




**Note:** Version bump only for package pubsweet-client

<a name="5.0.0"></a>
# [5.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.2.2...pubsweet-client@5.0.0) (2018-09-20)


### Features

* add base-model package for standalone data models ([fc446e8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fc446e8)), closes [#395](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/395)


### BREAKING CHANGES

* In PubSweet server, the exported thing is no longer startServer directly, but it's
now part of the exported object. This will break applications that use the equivalent of const
startServer = require('pubsweet-server'). The new method for getting a startServer is const {
startServer } = require('pubsweet-server').




<a name="4.2.2"></a>
## [4.2.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.2.1...pubsweet-client@4.2.2) (2018-09-19)


### Bug Fixes

* get current user in authorize component ([ae773fa](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ae773fa))




<a name="4.2.1"></a>
## [4.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.2.0...pubsweet-client@4.2.1) (2018-09-06)




**Note:** Version bump only for package pubsweet-client

<a name="4.2.0"></a>
# [4.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.3...pubsweet-client@4.2.0) (2018-09-04)


### Bug Fixes

* **client:** create a new authsome instance if not supplied ([fcc5423](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fcc5423))
* **client:** fix graphql queries ([3003c50](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3003c50))
* **client:** initialize an authsome mode from config if not supplied ([e0b7416](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e0b7416))
* use named graphql queries ([03e5656](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/03e5656))
* **subscriptions:** get token from local storage on each reconnect ([68dabdc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/68dabdc))


### Features

* **client:** add AuthorizeWithGraphQL ([57eca9a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/57eca9a))




<a name="4.1.3"></a>
## [4.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.2...pubsweet-client@4.1.3) (2018-08-23)


### Bug Fixes

* fixed minor mistake ([cbe6d75](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cbe6d75))




<a name="4.1.2"></a>
## [4.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.1...pubsweet-client@4.1.2) (2018-08-22)


### Bug Fixes

* fixed websocket protocol over https ([2235990](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2235990))




<a name="4.1.1"></a>
## [4.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.1.0...pubsweet-client@4.1.1) (2018-08-20)




**Note:** Version bump only for package pubsweet-client

<a name="4.1.0"></a>
# [4.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.5...pubsweet-client@4.1.0) (2018-08-17)


### Bug Fixes

* **authorize:** fix for correct props propagation ([5de8ea8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5de8ea8))
* **graphql:** disable authentication for websocket link ([06305c7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/06305c7))
* **server:** use the existing http server for subscriptions ([c5d1362](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c5d1362))
* **test:** fix Root test in client ([c6ed350](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c6ed350))
* **warnings:** naming changes ([e4727ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4727ad))


### Features

* **graphql:** add subscription support to graphql ([d71b0c6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d71b0c6))
* **graphql:** enable authentication over the websocket ([98c9e6d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/98c9e6d))
* **graphql:** get hostname from variables ([64b7c4f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/64b7c4f))
* **graphql:** make connection to websocket optional ([695f1bb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/695f1bb))




<a name="4.0.5"></a>
## [4.0.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.4...pubsweet-client@4.0.5) (2018-08-02)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.4"></a>
## [4.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.3...pubsweet-client@4.0.4) (2018-07-27)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.3"></a>
## [4.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.2...pubsweet-client@4.0.3) (2018-07-12)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.2"></a>
## [4.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.1...pubsweet-client@4.0.2) (2018-07-09)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.1"></a>
## [4.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@4.0.0...pubsweet-client@4.0.1) (2018-07-03)




**Note:** Version bump only for package pubsweet-client

<a name="4.0.0"></a>
# [4.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.3...pubsweet-client@4.0.0) (2018-07-02)


### Features

* **ui:** introduce more line height variables ([85c24e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/85c24e2))


### BREAKING CHANGES

* **ui:** the existing fontLineHeight variable is gone and replaced by multiple new variables




<a name="3.0.3"></a>
## [3.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.2...pubsweet-client@3.0.3) (2018-06-28)




**Note:** Version bump only for package pubsweet-client

<a name="3.0.2"></a>
## [3.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.1...pubsweet-client@3.0.2) (2018-06-28)


### Bug Fixes

* **authorize:** render function component ([cebdaa3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cebdaa3))
* **authsome:** change names to tests and function ([3f3559c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3f3559c))




<a name="3.0.1"></a>
## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@3.0.0...pubsweet-client@3.0.1) (2018-06-19)


### Bug Fixes

* **pubsweet-ui:** tests are failing ([0e57798](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0e57798))




<a name="3.0.0"></a>
# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.5...pubsweet-client@3.0.0) (2018-06-01)


### Features

* **ui:** start ui-toolkit module ([2083b9c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2083b9c))


### BREAKING CHANGES

* **ui:** th now comes from the toolkit, so all th imports from ui are now broken




<a name="2.5.5"></a>
## [2.5.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.4...pubsweet-client@2.5.5) (2018-05-21)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.4"></a>
## [2.5.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.3...pubsweet-client@2.5.4) (2018-05-18)


### Bug Fixes

* use one file at monorepo root ([456f49b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/456f49b))




<a name="2.5.3"></a>
## [2.5.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.2...pubsweet-client@2.5.3) (2018-05-10)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.2"></a>
## [2.5.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.1...pubsweet-client@2.5.2) (2018-05-09)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.1"></a>
## [2.5.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.5.0...pubsweet-client@2.5.1) (2018-05-03)




**Note:** Version bump only for package pubsweet-client

<a name="2.5.0"></a>
# [2.5.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.4.1...pubsweet-client@2.5.0) (2018-04-25)


### Features

* **client:** add support for Team SSE ([429d113](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/429d113))




<a name="2.4.1"></a>
## [2.4.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.4.0...pubsweet-client@2.4.1) (2018-04-24)


### Bug Fixes

* **authenticated-component:** redirect to next path ([fbde445](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fbde445))




<a name="2.4.0"></a>
# [2.4.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.3.1...pubsweet-client@2.4.0) (2018-04-11)


### Features

* enable the Apollo client to be customised ([0546acc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0546acc))




<a name="2.3.1"></a>
## [2.3.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.3.0...pubsweet-client@2.3.1) (2018-03-30)




**Note:** Version bump only for package pubsweet-client

<a name="2.3.0"></a>
# [2.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.6...pubsweet-client@2.3.0) (2018-03-28)


### Bug Fixes

* **client:** add tests to graphql HOCs ([440bb4b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/440bb4b))


### Features

* **client:** add Apollo Client ([2fe9d93](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2fe9d93))




<a name="2.2.6"></a>
## [2.2.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.5...pubsweet-client@2.2.6) (2018-03-28)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.5"></a>
## [2.2.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.4...pubsweet-client@2.2.5) (2018-03-27)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.4"></a>
## [2.2.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.3...pubsweet-client@2.2.4) (2018-03-19)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.3"></a>
## [2.2.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.2...pubsweet-client@2.2.3) (2018-03-15)




**Note:** Version bump only for package pubsweet-client

<a name="2.2.2"></a>

## [2.2.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.1...pubsweet-client@2.2.2) (2018-03-09)

**Note:** Version bump only for package pubsweet-client

<a name="2.2.1"></a>

## [2.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.2.0...pubsweet-client@2.2.1) (2018-03-06)

### Bug Fixes

* **client:** add ui dependency ([cc1a8ae](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cc1a8ae))

<a name="2.2.0"></a>

# [2.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.1.1...pubsweet-client@2.2.0) (2018-03-05)

### Bug Fixes

* downgrade styled-components dependency in pubsweet-client ([718558e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/718558e))
* update Root to use new StyleRoot component ([9d4c0ef](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9d4c0ef))

### Features

* **normalize:** add normalize css ([9eb24e5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9eb24e5))
* **ui:** add theming to Tags ([ee959d2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee959d2))

<a name="2.1.1"></a>

## [2.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.1.0...pubsweet-client@2.1.1) (2018-02-16)

### Bug Fixes

* **client:** remove unused dependency on login component ([6c5dd97](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6c5dd97))

<a name="2.1.0"></a>

# [2.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@2.0.0...pubsweet-client@2.1.0) (2018-02-08)

### Features

* **client:** add styled components ([43ab2c5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/43ab2c5))

<a name="2.0.0"></a>

# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/pubsweet-client@1.1.4...pubsweet-client@2.0.0) (2018-02-02)

### Features

* **client:** upgrade React to version 16 ([626cf59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/626cf59)), closes [#65](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/65)

### BREAKING CHANGES

* **client:** Upgrade React to version 16
