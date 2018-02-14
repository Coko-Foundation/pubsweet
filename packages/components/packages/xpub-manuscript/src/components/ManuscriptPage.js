import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'

import Manuscript from './Manuscript'

const query = gql`
  query($id: ID) {
    version: fragment(id: $id) {
      id
      source
      submitted
      rev
    }
    currentUser {
      user {
        id
        username
        admin
      }
    }
  }
`

const updateFragmentMutation = gql`
  mutation($id: ID, $input: String) {
    updateFragment(id: $id, input: $input) {
      id
      source
    }
  }
`

const fileUploadMutation = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      file: url
    }
  }
`

export default compose(
  graphql(query, {
    options: ({ match }) => ({
      variables: { id: match.params.version },
    }),
  }),
  withLoader(),
  graphql(updateFragmentMutation, {
    props: ({ mutate, ownProps: { version } }) => ({
      updateManuscript: data =>
        mutate({
          variables: {
            id: version.id,
            input: JSON.stringify({ ...data, rev: version.rev }),
          },
        }),
    }),
  }),
  graphql(fileUploadMutation, {
    props: ({ mutate }) => ({
      fileUpload: file =>
        mutate({ variables: { file } }).then(res => res.data.upload),
    }),
  }),
  // TODO: load source from a file
  withProps(({ version }) => ({ content: version.source })),
)(Manuscript)
