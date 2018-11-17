// import { debounce } from 'lodash'
import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withFormik } from 'formik'
import { withLoader } from 'pubsweet-client'
// import uploadFile from 'xpub-upload'
import ReviewLayout from '../components/review/ReviewLayout'

const reviewFields = `
  id
  created
  updated
  comments {
    type
    content
    files {
      id
      created
      label
      filename
      fileType
      mimeType
      size
      url
    }
  }
  recommendation
  user {
    id
    username
  }
`

const fragmentFields = `
  id
  created
  files {
    id
    created
    label
    filename
    fileType
    mimeType
    size
    url
  }
  reviews {
    ${reviewFields}
  }
  decision
  teams {
    id
    name
    teamType
    object {
      objectId
      objectType
    }
    objectType
    members {
      id
      username
    }
    status {
      id
      status
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

const updateReviewMutation = gql`
  mutation($id: ID!, $input: ReviewInput) {
    updateReview(id: $id, input: $input) {
      ${reviewFields}
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

const uploadReviewFilesMutation = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      url
    }
  }
`

const createFileMutation = gql`
  mutation($file: Upload!) {
    createFile(file: $file) {
      id
      created
      label
      filename
      fileType
      mimeType
      size
      url
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
  graphql(createFileMutation, {
    props: ({ mutate, ownProps }) => ({
      createFile: file => {
        mutate({
          variables: {
            file,
          },
        })
      },
    }),
  }),
  graphql(uploadReviewFilesMutation, {
    props: ({ mutate, ownProps }) => ({
      uploadFile: file =>
        mutate({
          variables: {
            file,
          },
        }),
    }),
  }),
  graphql(updateReviewMutation, { name: 'updateReviewMutation' }),
  withLoader(),
  withProps(
    ({
      manuscript,
      currentUser,
      match: {
        params: { journal },
      },
      updateReviewMutation,
      uploadFile,
      createFile,
    }) => ({
      journal: { id: journal },
      review:
        manuscript.reviews.find(review => review.user.id === currentUser.id) ||
        {},
      status: manuscript.teams
        .find(team => team.teamType === 'reviewerEditor')
        .status.find(status => status.id === currentUser.id).status,
      updateReview: (review, file) => {
        if (review) {
          review.manuscript_id = manuscript.id
          review.user_id = currentUser.id
          updateReviewMutation({
            variables: {
              id: this.review.id || null,
              input: review,
            },
          }).then(review => {
            if (file) {
              uploadFile(file).then(data => {
                const newFile = {
                  url: data.upload.url,
                  filename: file.name,
                  mimeType: file.type,
                  size: file.size,
                  object: 'Review',
                  object_id: review.id,
                  fileType: file.type,
                }
                createFile(newFile)
              })
            }
          })
        }
      },
    }),
  ),
  withFormik({
    initialValues: {},
    mapPropsToValues: ({ manuscript, currentUser }) =>
      manuscript.reviews.find(review => review.user.id === currentUser.id),
    displayName: 'review',
    handleSubmit: (props, { props: { onSubmit, history } }) =>
      onSubmit(props, { history }),
  }),
)(ReviewLayout)
