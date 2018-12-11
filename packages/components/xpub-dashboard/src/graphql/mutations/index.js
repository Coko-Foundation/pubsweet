import gql from 'graphql-tag'

export default {
  deleteManuscriptMutation: gql`
    mutation($id: ID!) {
      deleteManuscript(id: $id)
    }
  `,
  reviewerResponseMutation: gql`
    mutation($currentUserId: ID!, $action: String, $teamId: ID!) {
      reviewerResponse(
        currentUserId: $currentUserId
        action: $action
        teamId: $teamId
      ) {
        id
        role
        teamType
        name
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
        manuscriptVersions {
          id
        }
        teams {
          id
          role
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
