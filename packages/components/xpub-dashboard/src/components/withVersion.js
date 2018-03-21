import { withProps } from 'recompose'
import { newestFirst } from 'xpub-selectors'

export default Component =>
  withProps(({ project }) => ({ version: newestFirst(project.fragments)[0] }))(
    Component,
  )
