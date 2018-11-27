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
    fileType
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
  withLoader(),
  withProps(({ data }) => ({
    content: data ? data.manuscript.meta.title : '',
    file: data ? data.files.filter(file => file.fileType === 'manuscript') : {},
  })),
)(Manuscript)
