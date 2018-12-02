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
        journalTitle
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
            role
            name
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
