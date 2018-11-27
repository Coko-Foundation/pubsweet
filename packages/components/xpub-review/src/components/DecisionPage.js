import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withFormik } from 'formik'
import { withLoader } from 'pubsweet-client'
import { getCommentContent } from './review/util'

import DecisionLayout from './decision/DecisionLayout'

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
  isDecision
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
      user
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

const updateReviewMutation = gql`
  mutation($id: ID, $input: ReviewInput) {
    updateReview(id: $id, input: $input) {
      ${reviewFields}
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
  graphql(uploadReviewFilesMutation, { name: 'uploadReviewFilesMutation' }),
  graphql(updateReviewMutation, { name: 'updateReviewMutation' }),
  graphql(createFileMutation, {
    props: ({ mutate, ownProps: { match } }) => ({
      createFile: file => {
        mutate({
          variables: {
            file,
          },
          update: (proxy, { data: { createFile } }) => {
            const data = proxy.readQuery({
              query,
              variables: {
                id: match.params.version,
              },
            })

            data.manuscript.reviews.map(review => {
              if (review.id === file.objectId) {
                review.comments.map(comment => {
                  if (comment.type === createFile.fileType) {
                    comment.files = [createFile]
                  }
                  return comment
                })
              }
              return review
            })

            proxy.writeQuery({ query, data })
          },
        })
      },
    }),
  }),
  graphql(submitMutation, {
    props: ({ mutate, ownProps }) => ({
      completeDecision: ({ manuscript, review }, { history }) => {
        mutate({
          variables: {
            id: manuscript.id,
            input: JSON.stringify({
              decision: review.recommendation,
            }),
          },
        }).then(() => {
          history.push('/')
        })
      },
    }),
  }),
  withLoader(),
  withProps(
    ({
      currentUser,
      manuscript,
      createFile,
      updateReviewMutation,
      uploadReviewFilesMutation,
      match: {
        params: { journal },
      },
    }) => ({
      review:
        (manuscript.reviews || []).filter(
          review => review.user.id === currentUser.id,
        ) || [],
      journal: { id: journal },
      updateReview: (review, file) => {
        ;(review.comments || []).map(comment => {
          delete comment.files
          delete comment.__typename
          return comment
        })

        const reviewData = {
          recommendation: review.recommendation,
          comments: review.comments,
          isDecision: true,
          manuscriptId: manuscript.id,
        }

        return updateReviewMutation({
          variables: {
            id: review.id || undefined,
            input: reviewData,
          },
          update: (proxy, { data: { updateReview } }) => {
            const data = proxy.readQuery({
              query,
              variables: {
                id: manuscript.id,
              },
            })
            const reviewIndex = data.manuscript.reviews.findIndex(
              review => review.id === updateReview.id,
            )
            if (reviewIndex < 0) {
              data.manuscript.reviews.push(updateReview)
            } else {
              data.manuscript.reviews[reviewIndex] = updateReview
            }
            proxy.writeQuery({ query, data })
          },
        })
      },
      uploadFile: (file, updateReview, type) =>
        uploadReviewFilesMutation({
          variables: {
            file,
          },
        }).then(({ data }) => {
          const newFile = {
            url: data.upload.url,
            filename: file.name,
            size: file.size,
            object: 'Review',
            objectId: updateReview.id,
            fileType: type,
          }
          createFile(newFile)
        }),
    }),
  ),
  withFormik({
    isInitialValid: ({ review }) => {
      const rv = review.find(review => review.isDecision) || {}
      const isRecommendation = rv.recommendation != null
      const isCommented = getCommentContent(rv, 'note') !== ''

      return isCommented && isRecommendation
    },
    displayName: 'decision',
    handleSubmit: (props, { props: { completeDecision, history } }) =>
      completeDecision(props, { history }),
  }),
)(DecisionLayout)
