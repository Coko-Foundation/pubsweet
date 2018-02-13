import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import withLoader from 'pubsweet-client/src/helpers/withLoader'

import HTML from './HTML'

const query = gql`
  query($id: ID!) {
    fragment(id: $id) {
      id
      presentation
    }
  }
`
export default compose(
  graphql(query, {
    options: ({ match }) => ({ variables: { id: match.params.id } }),
  }),
  withLoader(),
)(HTML)
