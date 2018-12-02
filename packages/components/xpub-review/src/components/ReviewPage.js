// import { debounce } from 'lodash'
import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withFormik } from 'formik'
import { withLoader } from 'pubsweet-client'
// import uploadFile from 'xpub-upload'
import ReviewLayout from '../components/review/ReviewLayout'

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

const submitReviewMutation = gql`
  mutation($id: ID!, $input: String) {
    updateManuscript(id: $id, input: $input) {
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
        form: 'submit',
      },
    }),
  }),
  graphql(submitReviewMutation, {
    props: ({ mutate, ownProps: { data } }) => ({
      onSubmit: (review, { history }) => {
        mutate({
          variables: {
            id: data.manuscript.id,
            input: JSON.stringify(review),
          },
        }).then(() => {
          history.push('/')
        })
      },
    }),
  }),
  withLoader(),
  withProps(({ manuscript, currentUser, match: { params: { journal } } }) => ({
    journal: { id: journal },
    review: manuscript.reviews.find(
      review => review.user.id === currentUser.id,
    ),
    status: manuscript.teams
      .find(team => team.role === 'reviewerEditor')
      .members.find(member => member.user.id === currentUser.id).status,
  })),
  withFormik({
    initialValues: {},
    mapPropsToValues: ({ manuscript, currentUser }) =>
      manuscript.reviews.find(review => review.user.id === currentUser.id),
    displayName: 'review',
    handleSubmit: (props, { props: { onSubmit, history } }) =>
      onSubmit(props, { history }),
  }),
)(ReviewLayout)
