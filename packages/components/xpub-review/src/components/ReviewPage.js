import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withFormik } from 'formik'
import { withLoader } from 'pubsweet-client'
import { cloneDeep } from 'lodash'
import { getCommentContent } from './review/util'
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

const teamFields = `
  id
  name
  teamType
  object {
    objectId
    objectType
  }
  members {
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

const updateTeam = gql`
  mutation($id: ID!, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      ${teamFields}
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
  graphql(updateTeam, { name: 'updateTeam' }),
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
  withLoader(),
  withProps(
    ({
      manuscript,
      currentUser,
      match: {
        params: { journal },
      },
      updateReviewMutation,
      uploadReviewFilesMutation,
      updateTeam,
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
        ;(review.comments || []).map(comment => {
          delete comment.files
          delete comment.__typename
          return comment
        })

        const reviewData = {
          recommendation: review.recommendation,
          comments: review.comments,
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
            let reviewIndex = data.manuscript.reviews.findIndex(
              review => review.id === updateReview.id,
            )
            reviewIndex = reviewIndex < 0 ? 0 : reviewIndex
            data.manuscript.reviews[reviewIndex] = updateReview
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
            mimeType: file.type,
            size: file.size,
            object: 'Review',
            objectId: updateReview.id,
            fileType: type,
          }
          createFile(newFile)
        }),
      completeReview: () => {
        const team = cloneDeep(manuscript.teams).find(
          team => team.teamType === 'reviewerEditor',
        )

        team.status.map(status => {
          if (status.id === currentUser.id) {
            status.status = 'completed'
          }
          delete status.__typename
          return status
        })
        updateTeam({
          variables: {
            id: team.id,
            input: {
              status: team.status,
            },
          },
        })
      },
    }),
  ),
  withFormik({
    isInitialValid: ({ review }) => {
      let isValid = review.recommendation != null
      isValid =
        getCommentContent(review, 'note') === '' || !isValid ? false : isValid
      return isValid
    },
    displayName: 'review',
    handleSubmit: (props, { props: { completeReview, history } }) =>
      completeReview(),
  }),
)(ReviewLayout)
