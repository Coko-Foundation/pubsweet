import { withProps } from 'recompose'
import { Layout } from './Layout'

const withSimpleForm = withProps(props => ({
  layout: Layout,
  // formElements,
}))

export default withSimpleForm
