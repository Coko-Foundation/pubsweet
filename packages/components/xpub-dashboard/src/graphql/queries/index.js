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
          reviews {
            open
            recommendation
            created
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
}
