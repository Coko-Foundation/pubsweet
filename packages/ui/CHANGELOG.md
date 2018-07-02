# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
