import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import withLoader from 'pubsweet-client/src/helpers/withLoader'

import Blog from './Blog'

const query = gql`
  query {
    blogs: collections {
      title
    }
    posts: fragments {
      id
      title
      published_at
      published
      owners {
        username
      }
    }
  }
`

export default compose(graphql(query), withLoader())(Blog)
