import gql from 'graphql-tag'

export default {
  deleteManuscriptMutation: gql`
    mutation($id: ID) {
      deleteManuscript(id: $id) {
        id
      }
    }
  `,
  reviewerResponseMutation: gql`
    mutation($id: ID!, $response: String) {
      reviewerResponse(id: $id, response: $response) {
        id
      }
    }
  `,
  uploadManuscriptMutation: gql`
    mutation($file: Upload!) {
      upload(file: $file) {
        url
      }
    }
  `,
  createManuscriptMutation: gql`
    mutation($input: ManuscriptInput) {
      createManuscript(input: $input) {
        id
        created
        teams {
          name
          object {
            id
          }
          objectType
          members {
            user {
              id
              username
            }
            status
          }
          role
        }
        status
        reviews {
          open
          recommendation
          created
          user {
            id
            username
          }
        }
        meta {
          title
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
        }
      }
    }
  `,
}
