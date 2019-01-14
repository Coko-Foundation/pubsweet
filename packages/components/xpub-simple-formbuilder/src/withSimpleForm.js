import { withProps, compose } from 'recompose'
import { graphql } from 'react-apollo'

import query from './query'

import { Layout } from './Layout'

const withSimpleForm = layout =>
  compose(
    graphql(query),
    withProps(props => ({
      Layout: layout || Layout,
    })),
  )

export default withSimpleForm
