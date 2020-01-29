# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [12.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@12.2.0...@pubsweet/ui@12.2.1) (2020-01-29)

**Note:** Version bump only for package @pubsweet/ui





# [12.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@12.1.1...@pubsweet/ui@12.2.0) (2020-01-23)


### Features

* added ability to override icon via theme ([b6195f6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b6195f6a5b68c263170904034f8268bc10669394))





## [12.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@12.1.0...@pubsweet/ui@12.1.1) (2019-12-11)

**Note:** Version bump only for package @pubsweet/ui





# [12.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@12.0.1...@pubsweet/ui@12.1.0) (2019-11-11)


### Bug Fixes

* **ui:** make the deprecated Title work again ([5d58ee9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5d58ee96aae2f780c108bffc5bb80f49e97abaf2))


### Features

* **ui:** set a key for Menu items ([1f6c4e7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1f6c4e724dc6dca2212fcbb50f85277baf3abae0))
* **ui:** use SSR-friendly UID generation in TextArea ([d5c4dcf](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d5c4dcfedf58c3005bcc4e6836617e211d136d62))
* **ui:** use SSR-friendly UID generation in TextField ([471fa6d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/471fa6dde1e415628d4421f6c2e1474fcf866ae3))
* **xpub:** bring back xpub components ([fb69994](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fb69994098b4e2dbcca75b4786ebb1335af730b9))





## [12.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@12.0.0...@pubsweet/ui@12.0.1) (2019-09-11)

**Note:** Version bump only for package @pubsweet/ui





# [12.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@11.0.0...@pubsweet/ui@12.0.0) (2019-09-04)


### Bug Fixes

* **modal:** added unit test for modal content using hooks ([0fcdc54](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0fcdc54))
* **modal:** allow usage of hooks inside modal components ([ee71614](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee71614))
* **modal:** fixed type error ([30b7ae4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/30b7ae4))


### Code Refactoring

* **ui:** deprecate Title ([0f0353f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0f0353f))


### Features

* **modal:** provided posibility to specify modal position ([9fdb42c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9fdb42c))
* **ui:** remove FilePicker div, add aria role ([14b9028](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/14b9028))
* **ui:** replace div - UploadButton ([aca5c59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/aca5c59))


### BREAKING CHANGES

* **ui:** Anyone applying styles using a div css selector will have to change to using an
h-level css selecto
* **ui:** Those importing and styling FilePicker may be expecting the div; FilePicker is no
longer a block element by default
* **ui:** Div removed - anyone importing and styling the component may expect the div to be
present





# [11.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.10...@pubsweet/ui@11.0.0) (2019-08-30)


### Code Refactoring

* **apollo:** update react-dom version ([e001d01](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e001d01))


### BREAKING CHANGES

* **apollo:** The minimum supported React version by @apollo is now 16.8





## [10.3.10](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.9...@pubsweet/ui@10.3.10) (2019-08-08)

**Note:** Version bump only for package @pubsweet/ui





## [10.3.9](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.8...@pubsweet/ui@10.3.9) (2019-08-05)

**Note:** Version bump only for package @pubsweet/ui





## [10.3.8](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.7...@pubsweet/ui@10.3.8) (2019-07-12)


### Bug Fixes

* **ui:** un-hardcode button attrs ([70dd5dc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/70dd5dc))





## [10.3.7](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.6...@pubsweet/ui@10.3.7) (2019-07-09)


### Bug Fixes

* **ui:** remove attrs as objects deprecation warning ([19b20bc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/19b20bc))





## [10.3.6](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.5...@pubsweet/ui@10.3.6) (2019-07-03)

**Note:** Version bump only for package @pubsweet/ui





## [10.3.5](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.4...@pubsweet/ui@10.3.5) (2019-06-28)

**Note:** Version bump only for package @pubsweet/ui





## [10.3.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.3...@pubsweet/ui@10.3.4) (2019-06-24)

**Note:** Version bump only for package @pubsweet/ui





## [10.3.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.2...@pubsweet/ui@10.3.3) (2019-06-21)

**Note:** Version bump only for package @pubsweet/ui





## [10.3.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.1...@pubsweet/ui@10.3.2) (2019-06-13)

**Note:** Version bump only for package @pubsweet/ui





## [10.3.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.3.0...@pubsweet/ui@10.3.1) (2019-06-12)

**Note:** Version bump only for package @pubsweet/ui





# [10.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.2.1...@pubsweet/ui@10.3.0) (2019-05-27)


### Bug Fixes

* **peoplepicker:** fixed styling of InputWithAddons ([b60a728](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b60a728))
* check for correct new two column layout prop value ([b59b8a9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b59b8a9))
* fix default theme styling of Searchbox ([34e0426](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/34e0426))
* input with addons border thinkness, default input height ([aac9263](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/aac9263))
* remove use of space variable in peoplepicker styling ([53354df](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/53354df))
* tests for TwoColumnLayout ([8ceba26](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8ceba26))


### Features

* **peoplepicker:** wip ([5564271](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5564271))
* **ui:** add modal ([a44e5c3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a44e5c3))
* add new input box with addons ([bd4fd81](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bd4fd81))
* fix alignment of search box and person pod button ([3e5659e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3e5659e))
* further tests of TwoColumnLayout component ([fefcf6f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fefcf6f))
* **ui:** add pagination component ([c493203](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c493203))
* merge commit ([7797a83](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7797a83))
* merge commit from master ([b1e1e06](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b1e1e06))
* merge commit, fix styling on icons and fonts ([33e5e80](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/33e5e80))
* re-add the modal using new pubsweet version ([fdc7101](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fdc7101))





## [10.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.2.0...@pubsweet/ui@10.2.1) (2019-04-25)

**Note:** Version bump only for package @pubsweet/ui





# [10.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.1.0...@pubsweet/ui@10.2.0) (2019-04-18)


### Bug Fixes

* **ui:** remove text-decoration none from Link ([3b3c660](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3b3c660))


### Features

* **ui:** improve Link to accept external URLs ([322d6a9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/322d6a9))





# [10.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.0.4...@pubsweet/ui@10.1.0) (2019-04-09)


### Features

* **docs:** working styleguide ([12cd248](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/12cd248))





## [10.0.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.0.3...@pubsweet/ui@10.0.4) (2019-03-06)

**Note:** Version bump only for package @pubsweet/ui





## [10.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.0.2...@pubsweet/ui@10.0.3) (2019-03-05)

**Note:** Version bump only for package @pubsweet/ui





## [10.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.0.1...@pubsweet/ui@10.0.2) (2019-02-19)

**Note:** Version bump only for package @pubsweet/ui





## [10.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@10.0.0...@pubsweet/ui@10.0.1) (2019-02-19)


### Bug Fixes

* **menu:** pass validation status to the Menu default opener ([8f51dbc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8f51dbc))
* **ui:** add class name & remove redundant prop type ([f90593c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f90593c))





# [10.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.1.3...@pubsweet/ui@10.0.0) (2019-02-01)


### Bug Fixes

* **ui:** fix title misalignment on UI/Steps in IE11 ([2f94f75](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2f94f75)), closes [#438](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/438)


### Code Refactoring

* temporarily remove unmigrated components ([32db6ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32db6ad))


### BREAKING CHANGES

* A lot of unmigrated (not yet moved from REST/Redux to GraphQL/Apollo system) bits
have changed. There might be some breaking changes as a result. This is a big migration involving
big changes - if you encounter anything weird, please contact us on GitLab or on Mattermost.





## [9.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.1.2...@pubsweet/ui@9.1.3) (2019-01-16)

**Note:** Version bump only for package @pubsweet/ui





## [9.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.1.1...@pubsweet/ui@9.1.2) (2019-01-14)

**Note:** Version bump only for package @pubsweet/ui





## [9.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.1.0...@pubsweet/ui@9.1.1) (2019-01-13)

**Note:** Version bump only for package @pubsweet/ui





# [9.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.0.3...@pubsweet/ui@9.1.0) (2019-01-09)


### Features

* introduce [@pubsweet](https://gitlab.coko.foundation/pubsweet)/models package ([7c1a364](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c1a364))





## [9.0.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.0.2...@pubsweet/ui@9.0.3) (2018-12-12)

**Note:** Version bump only for package @pubsweet/ui





## [9.0.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.0.1...@pubsweet/ui@9.0.2) (2018-12-04)

**Note:** Version bump only for package @pubsweet/ui





## [9.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@9.0.0...@pubsweet/ui@9.0.1) (2018-11-30)


### Bug Fixes

* **ui:** add missing override for GlobalStyle ([e5d48eb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e5d48eb))





# [9.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.8.0...@pubsweet/ui@9.0.0) (2018-11-29)


### Features

* **ui:** upgrade styled-components ([6122502](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6122502))
* **various:** update styled-components ([5c51466](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5c51466))


### BREAKING CHANGES

* **various:** Replace all styled-components .extend with styled()
* **ui:** Replace styled-components injectGlobal with new createGlobalStyle





  <a name="8.8.0"></a>
# [8.8.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.7.1...@pubsweet/ui@8.8.0) (2018-11-05)


### Features

* GraphQL Login component ([70df3de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/70df3de))
* GraphQL Xpub submit component ([ba07060](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ba07060))




  <a name="8.7.1"></a>
## [8.7.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.7.0...@pubsweet/ui@8.7.1) (2018-10-08)


### Bug Fixes

* add .babelrc to ui package's files ([9373b95](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9373b95))




<a name="8.7.0"></a>
# [8.7.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.6.2...@pubsweet/ui@8.7.0) (2018-09-27)


### Features

* **ui:** can now disable a single radio in a group ([026202c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/026202c))




<a name="8.6.2"></a>
## [8.6.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.6.1...@pubsweet/ui@8.6.2) (2018-09-19)


### Bug Fixes

* **ui:** make sure action group does not render empty elements ([d310cdc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d310cdc))




<a name="8.6.1"></a>
## [8.6.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.6.0...@pubsweet/ui@8.6.1) (2018-09-06)


### Bug Fixes

* **ui:** add classname to appbar so that styles can be extended ([6b66bb3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6b66bb3))




<a name="8.6.0"></a>
# [8.6.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.5.0...@pubsweet/ui@8.6.0) (2018-09-04)


### Bug Fixes

* **test:** add data-test-id to tabs ([e8a42cb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e8a42cb))


### Features

* **date-parser:** add humanize threshold ([42be337](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/42be337))
* **formbuilder:** add forms layout ([0cd6b9d](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0cd6b9d))
* **formbuilder:** add validation for elements ([882935a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/882935a))
* **submit:** import dynamically the form template ([ac4649e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ac4649e))




<a name="8.5.0"></a>
# [8.5.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.4.0...@pubsweet/ui@8.5.0) (2018-08-20)


### Bug Fixes

* **ui:** rename jsx file to js ([c5d218a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c5d218a))


### Features

* **ui:** add TextArea component ([8bf12cb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8bf12cb))




<a name="8.4.0"></a>
# [8.4.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.3.0...@pubsweet/ui@8.4.0) (2018-08-17)


### Bug Fixes

* **actions:** active on css prop ([5e6c737](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5e6c737))
* **revert:** valildateStatus ([5d6f53e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5d6f53e))
* **styleguide:** pass correct property ([287aa00](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/287aa00))
* **ui:** update checkboxgroup snapshot ([ff9644a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ff9644a))
* **warnings:** naming changes ([e4727ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4727ad))
* **warnings:** naming problems ([917cee8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/917cee8))


### Features

* **accordion-component:** ui accordion component ([10ad7c3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/10ad7c3))
* **list-component:** a component that renders items in a list ([78490e0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/78490e0))
* **list-component:** remove children as list items; pass data test id ([de3d919](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/de3d919))
* **list-component:** remove classname from styled component ([7c2a417](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7c2a417))
* **ui:** give readonly option to radio and checkbox ([fecfe69](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fecfe69))




<a name="8.3.0"></a>
# [8.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.2.0...@pubsweet/ui@8.3.0) (2018-08-02)


### Features

* **ui-toolkit:** add borderColor function to theme helper ([0ed3fc1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0ed3fc1))




<a name="8.2.0"></a>
# [8.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.1.0...@pubsweet/ui@8.2.0) (2018-07-27)


### Features

* add Attachments pubsweet comp for image upload ([a2dc8ca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a2dc8ca))




<a name="8.1.0"></a>
# [8.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.0.1...@pubsweet/ui@8.1.0) (2018-07-12)


### Bug Fixes

* **ui:** add classname prop to textfield ([841782e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/841782e))


### Features

* **ui:** add inner ref prop to textfield ([b5136dc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b5136dc))
* **ui:** add override for all ui.Label ([7d2a9f5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7d2a9f5))




<a name="8.0.1"></a>
## [8.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@8.0.0...@pubsweet/ui@8.0.1) (2018-07-09)


### Bug Fixes

* **component:** remove comment ([a9b956e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a9b956e))
* **components:** button to styledButton ([0404203](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0404203))
* **menu:** reset function ([2961a85](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2961a85))
* **snapshot:** test recreate ([bb11b8f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb11b8f))
* **teammanager:** test fix failing ([c559488](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c559488))
* **teammanager:** update styles component ([c92bbd5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c92bbd5))
* **test:** update snapshot ([b8e4a51](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b8e4a51))
* **test:** update snapshot ([8cd93a4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8cd93a4))
* **xpub-team-manager:** move files to components ([4421a68](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4421a68))




<a name="8.0.0"></a>
# [8.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@7.0.0...@pubsweet/ui@8.0.0) (2018-07-03)


### Features

* **ui:** modify the progress indicator to help with theming ([40113d0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/40113d0))


### BREAKING CHANGES

* **ui:** Removed style  left:-45px. Removed numbering of steps - to be done by caller. Removed the tick from Success component - to be supplied by caller.




<a name="7.0.0"></a>
# [7.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@6.0.1...@pubsweet/ui@7.0.0) (2018-07-02)


### Features

* **ui:** introduce more line height variables ([85c24e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/85c24e2))


### BREAKING CHANGES

* **ui:** the existing fontLineHeight variable is gone and replaced by multiple new variables




<a name="6.0.1"></a>
## [6.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@6.0.0...@pubsweet/ui@6.0.1) (2018-06-28)


### Bug Fixes

* **ui:** allow css overrides for ui.TextField.Input again ([f3715d3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f3715d3))




<a name="6.0.0"></a>
# [6.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@5.0.1...@pubsweet/ui@6.0.0) (2018-06-28)


### Bug Fixes

* **ui:** change override to exported component ([534bcd6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/534bcd6))
* **ui:** fix bad value in darken ([2c05b2b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2c05b2b))
* **ui:** update cssOverrides to override ([b877af9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b877af9))
* **ui:** use override instead of th for styling TextField ([89ba87a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/89ba87a))


### Code Refactoring

* **ui:** add package namespacing to css overrides ([d68ef7e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d68ef7e)), closes [#342](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/342)
* **ui:** replace current gridunit variables with one small value ([cf48f29](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cf48f29))


### Features

* **ui:** add css overrides to TextField.Root and TextField.Label ([c5a4fa7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c5a4fa7))
* **ui:** add css overrides to ui components ([11a1481](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/11a1481))
* **ui:** add css overrides to ui molecules ([e9ad6c5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e9ad6c5))
* **ui:** reintroduce warning color ([27943ad](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/27943ad))
* **ui:** scope Button overrides with ui package ([69e84e2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/69e84e2))
* **ui:** scope TextField css overrides to ui package ([e3ecc3b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e3ecc3b))
* add CSS override hooks to Menu ([9a6c445](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9a6c445))
* make headings more reusable ([f24530a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f24530a))


### BREAKING CHANGES

* remove margin bottom from component
Change overflow property to auto to hide empty scroll bar
* **ui:** Your ui components will now be multiplying a much smaller value so they need to be
adjusted
* **ui:** Themes may have to be updated to use package namespacing for css overrides
*   * remove margins




<a name="5.0.1"></a>
## [5.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@5.0.0...@pubsweet/ui@5.0.1) (2018-06-19)




**Note:** Version bump only for package @pubsweet/ui

<a name="5.0.0"></a>
# [5.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@4.1.3...@pubsweet/ui@5.0.0) (2018-06-01)


### Bug Fixes

* **ui:** fix stacking of Radio components ([0cbab86](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0cbab86))
* **ui:** remove max-width from TextField ([34bbe01](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/34bbe01))


### Features

* **date-parser:** add new ui component that parses timestamps ([9b8f7a4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9b8f7a4))
* **ui:** add darken-lighten functions to toolkit ([ba8ab1b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ba8ab1b))
* **ui:** add override shorthand for styled components ([88c4f48](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/88c4f48))
* **ui:** start ui-toolkit module ([2083b9c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2083b9c))


### BREAKING CHANGES

* **ui:** th now comes from the toolkit, so all th imports from ui are now broken




<a name="4.1.3"></a>
## [4.1.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@4.1.2...@pubsweet/ui@4.1.3) (2018-05-21)




**Note:** Version bump only for package @pubsweet/ui

<a name="4.1.2"></a>
## [4.1.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@4.1.1...@pubsweet/ui@4.1.2) (2018-05-18)


### Bug Fixes

* use MIT on all package.json files ([4558ae4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4558ae4))




<a name="4.1.1"></a>
## [4.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@4.1.0...@pubsweet/ui@4.1.1) (2018-05-10)




**Note:** Version bump only for package @pubsweet/ui

<a name="4.1.0"></a>
# [4.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@4.0.0...@pubsweet/ui@4.1.0) (2018-05-09)


### Bug Fixes

* **ui:** fix th import ([2bf7bd9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2bf7bd9))


### Features

* **ui:** copy Tabs molecule and Tab atom from xpub-review component ([719d2fc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/719d2fc))




<a name="4.0.0"></a>
# [4.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.3.4...@pubsweet/ui@4.0.0) (2018-05-03)


### Bug Fixes

* **theme:** remove warning color ([c0897c8](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c0897c8))
* **theme:** simplify transitions ([90c72ff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/90c72ff))
* **ui:** align logo with links in appbar ([c35aeb1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c35aeb1))
* **ui:** export action element ([bb9e7d3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb9e7d3))


### Features

* **theme:** coko theme is in place ([731f501](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/731f501))
* **ui:** add action element ([301d800](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/301d800))
* **ui:** add action group ([32b9555](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32b9555))


### BREAKING CHANGES

* **theme:** transitions might not work for components that used the Xs, S and M values
* **theme:** might break components that used the warning colors




<a name="3.3.4"></a>
## [3.3.4](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.3.3...@pubsweet/ui@3.3.4) (2018-04-24)


### Bug Fixes

* **ui:** allow Steps molecule container to be styled with a className ([087d320](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/087d320))




<a name="3.3.3"></a>
## [3.3.3](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.3.2...@pubsweet/ui@3.3.3) (2018-04-11)




**Note:** Version bump only for package @pubsweet/ui

<a name="3.3.2"></a>
## [3.3.2](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.3.1...@pubsweet/ui@3.3.2) (2018-03-30)




**Note:** Version bump only for package @pubsweet/ui

<a name="3.3.1"></a>
## [3.3.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.3.0...@pubsweet/ui@3.3.1) (2018-03-28)


### Bug Fixes

* **ui:** check that value is an array ([081d2a4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/081d2a4))
* **ui:** update CheckboxGroup rendering if props change ([a58e0d6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a58e0d6))




<a name="3.3.0"></a>
# [3.3.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.2.1...@pubsweet/ui@3.3.0) (2018-03-27)


### Bug Fixes

* **ui:** improve accessibility of atoms ([0b709d0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0b709d0))
* resolve remaining jsx-a11y lint issues ([a75c0de](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/a75c0de))


### Features

* **appbar:** add render prop for the right component of the appbar ([fe2f531](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fe2f531)), closes [#335](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/335)
* **styleguide:** add theme picker to styleguide ([27b3b05](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/27b3b05)), closes [#346](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/346)
* **styleguide:** page per section ([0bf0836](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0bf0836))




<a name="3.2.1"></a>
## [3.2.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.2.0...@pubsweet/ui@3.2.1) (2018-03-19)


### Bug Fixes

* **styleguide:** fix File component ([1acbca6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/1acbca6))




<a name="3.2.0"></a>
# [3.2.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.1.0...@pubsweet/ui@3.2.0) (2018-03-15)


### Bug Fixes

* **menu:** update snapshot tests ([ec9af16](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ec9af16))


### Features

* **menu:** add renderOption prop and update docs ([fe769d4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/fe769d4)), closes [#335](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/335)




<a name="3.1.0"></a>

# [3.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.0.1...@pubsweet/ui@3.1.0) (2018-03-09)

### Bug Fixes

* **ui:** apply height to any brand element passed to AppBar ([b6cd888](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b6cd888))
* **ui:** fix Icon prop types ([ce7889b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ce7889b))

### Features

* **ui:** wrap spinners in colorize ([b42b0e5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b42b0e5)), closes [#343](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/343)

<a name="3.0.1"></a>

## [3.0.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@3.0.0...@pubsweet/ui@3.0.1) (2018-03-06)

### Bug Fixes

* **ui:** fix mutation in checkbox group list ([6a6388a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6a6388a)), closes [#313](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/313)
* **ui:** stop spinner from moving around when rotating ([e8e395e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e8e395e)), closes [#330](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/330)

<a name="3.0.0"></a>

# [3.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@2.1.1...@pubsweet/ui@3.0.0) (2018-03-05)

### Bug Fixes

* update snapshot tests to use theming ([8ffd0e7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8ffd0e7))
* **ui:** color and font display in styleguide ([d20affd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d20affd))
* **ui:** eslint error ([080db31](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/080db31))
* **ui:** regularise color and spacing of ValidatedField ([4e6ce57](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4e6ce57))
* **ui:** tests for YesOrNo ([2ba7d6a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/2ba7d6a))
* **ui:** update snapshot ([827406e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/827406e))
* **ui:** update snapshots ([79fca90](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/79fca90))
* **ui:** update snapshots ([616ca7e](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/616ca7e))
* **ui:** variable names in colors.md and fonts.md ([6347b04](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6347b04))

### Code Refactoring

* **ui:** refactor file and files components ([8e76691](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8e76691))
* **ui:** tidy AppBar ([09751b6](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/09751b6))
* **ui:** wrap Icon with Colorize ([68ad6cd](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/68ad6cd))

### Features

* **default-theme:** add variables to default theme ([ba121b0](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ba121b0))
* **normalize:** add normalize css ([9eb24e5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9eb24e5))
* **ui:** add theming to Attachments ([8324704](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/8324704))
* **ui:** add theming to Radio ([d97596f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/d97596f))
* **ui:** add theming to StateItem ([b5868d5](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/b5868d5))
* **ui:** add theming to Tags ([ee959d2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ee959d2))
* **ui:** add theming to UploadingFile ([c589f4f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c589f4f))
* **ui:** add theming to ValidatedField ([c2a1d54](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c2a1d54))

### BREAKING CHANGES

* **ui:** \* Icon takes semantic color props instead of a color name
* **ui:** \* navLinks prop is now navLinkComponents and expects an array of
elements
* **ui:** \* `Files` (renamed to `FileUploadList`) takes a single component that will receive `uploaded` prop
when upload is complete
* `Attachment` has default and uploaded state
* `UploadingFile` has default and uploaded state (`File` is deprecated)
* `UploadingFile`, `File`, `Files`, `Supplementary`, and `Attachments` takes `files` prop instead of `values`
* `Icon` size prop is now a multiplier for sub-grid-unit

Other changes:

* Theming and grid-spacing applied to all touched components

<a name="2.1.1"></a>

## [2.1.1](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@2.1.0...@pubsweet/ui@2.1.1) (2018-02-23)

### Bug Fixes

* **ui:** add spinner in index.js ([84ecec1](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/84ecec1))

<a name="2.1.0"></a>

# [2.1.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@2.0.0...@pubsweet/ui@2.1.0) (2018-02-16)

### Features

* **component:** add file picker component ([4fcb74f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/4fcb74f))
* **component:** add progress steps component ([e4b77c4](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/e4b77c4))
* **component:** add spinner component ([3a4ae9a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3a4ae9a))

<a name="2.0.0"></a>

# [2.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@1.0.0...@pubsweet/ui@2.0.0) (2018-02-08)

### Bug Fixes

* **ui:** fix bug in Menu (not yet converted to styled component) ([5183438](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/5183438))
* **ui:** fixes to Radio, pre-conversion ([7b9239b](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7b9239b))

### Features

* **ui:** convert AlignmentBox to a styled component ([7241128](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/7241128))
* **ui:** convert AlignmentBoxWithLabel, AlignmentTool to styled-comp ([ecb50ff](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ecb50ff))
* **ui:** convert AppBar to a styled component ([6527724](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6527724))
* **ui:** convert Attachment to a styled component ([0cd5f39](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/0cd5f39))
* **ui:** convert Attachments to a styled component ([f90d98c](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f90d98c))
* **ui:** convert Avatar to a styled component ([cc97cba](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/cc97cba))
* **ui:** convert Badge to a styled component ([ec720c2](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ec720c2))
* **ui:** convert Button to a styled component ([9c84dc9](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9c84dc9))
* **ui:** convert Checkbox to a styled component ([3cebeec](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/3cebeec))
* **ui:** convert File to a styled component ([bb339ca](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/bb339ca))
* **ui:** convert Files to a styled component ([c8a3b39](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/c8a3b39))
* **ui:** convert Icon to a styled component ([f6afa82](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/f6afa82))
* **ui:** convert Menu to a styled component ([411d3e3](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/411d3e3))
* **ui:** convert Radio to styled component ([6928c31](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/6928c31))
* **ui:** convert StateItem to styled component ([90b882f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/90b882f))
* **ui:** convert StateList to a styled component ([00d800a](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/00d800a))
* **ui:** convert Tags to a styled component ([ca4b180](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ca4b180))
* **ui:** convert TextField to a styled component ([31066fb](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/31066fb))
* **ui:** convert UploadingFile to a styled component ([9bc81f7](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/9bc81f7))
* **ui:** give unselected menu items a different colour ([087013f](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/087013f))
* **ui:** remove name prop and refactor ([32d5d69](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/32d5d69))
* **ui:** use styled-components 2 for jest-styled-components compat ([ca281cc](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/ca281cc))

### BREAKING CHANGES

* **ui:** StateItem doesn't accept the 'name' prop anymore, as it wasn't used.

<a name="1.0.0"></a>

# [1.0.0](https://gitlab.coko.foundation/pubsweet/pubsweet/compare/@pubsweet/ui@0.2.3...@pubsweet/ui@1.0.0) (2018-02-02)

### Features

* **client:** upgrade React to version 16 ([626cf59](https://gitlab.coko.foundation/pubsweet/pubsweet/commit/626cf59)), closes [#65](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/65)

### BREAKING CHANGES

* **client:** Upgrade React to version 16
