import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withFormik } from 'formik'
import { withLoader } from 'pubsweet-client'

import uploadFile from 'xpub-upload'
import DecisionLayout from './decision/DecisionLayout'

const fragmentFields = `
  id
  created
  files {
    id
    created
    label
    filename
    mimeType
    type
    size
    url
  }
  reviews {
    open
    recommendation
    created
    comments {
      type
      content
      files {
        type
        id
        label
        url
        filename
      }
    }
    user {
      id
      username
    }
  }
  decision {
    status
    created
    comments {
      type
      content
      files {
        type
        id
        label
        url
        filename
      }
    }
    user {
      id
      username
    }
  }
  teams {
    id
    role
    object {
      id
    }
    objectType
    members {
      status
      user {
        id
        username
      }
    }
  }
  status
  meta {
    title
    abstract
    declarations {
      openData
      openPeerReview
      preregistered
      previouslySubmitted
      researchNexus
      streamlinedReview
    }
    articleSections
    articleType
    history {
      type
      date
    }
    notes {
      id
      created
      notesType
      content
    }
    keywords
  }
  suggestions {
    reviewers {
      opposed
      suggested
    }
    editors {
      opposed
      suggested
    }
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
      manuscriptVersions {
        ${fragmentFields}
      }
    }
  }
`

const submitMutation = gql`
  mutation($id: ID!, $input: String) {
    submitManuscript(id: $id, input: $input) {
      id
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
  graphql(submitMutation, {
    props: ({ mutate, ownProps }) => ({
      onSubmit: (manuscript, { history }) => {
        mutate({
          variables: {
            id: manuscript.id,
            input: JSON.stringify({ decision: manuscript.decision }),
          },
        }).then(() => {
          history.push('/')
        })
      },
    }),
  }),
  withLoader(),
  withProps(({ getFile, manuscript, match: { params: { journal } } }) => ({
    journal: { id: journal },
    uploadFile,
  })),
  withFormik({
    initialValues: {},
    mapPropsToValues: ({ manuscript }) => manuscript,
    displayName: 'decision',
    handleSubmit: (props, { props: { onSubmit, history } }) =>
      onSubmit(props, { history }),
  }),
)(DecisionLayout)
