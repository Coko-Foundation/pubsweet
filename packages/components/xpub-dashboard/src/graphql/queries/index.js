import gql from 'graphql-tag'

export default {
  dashboard: gql`
    {
      currentUser {
        id
        username
        admin
      }

      journals {
        id
        title
        manuscripts {
          id
          manuscriptVersions {
            id
          }
          reviews {
            open
            recommendation
            created
            isDecision
            user {
              id
              username
            }
          }
          teams {
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
          status
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
          }
        }
      }
    }
  `,
  getUser: gql`
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        username
        admin
        teams {
          id
        }
      }
    }
  `,
}
