import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'

import Manuscript from './Manuscript'

const fragmentFields = `
  id
  created
  status
  files {
    id
    type
    mimeType
  }
  meta {
    title
    source
  }
`

const query = gql`
  query($id: ID!) {
    currentUser {
      id
      username
      admin
    }

    manuscript(id: $id) {
      ${fragmentFields}
    }
  }
`

export default compose(
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        id: match.params.version,
      },
    }),
  }),
  withProps(({ data: { manuscript = {} } }) => ({
    content: '',
    file: (manuscript.files || []).filter(file => file.type === 'manuscript'),
  })),
  withLoader(),
)(Manuscript)
