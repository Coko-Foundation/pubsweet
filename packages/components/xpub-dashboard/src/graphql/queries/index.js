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
              identities {
                ... on Local {
                  name {
                    surname
                  }
                }
              }
            }
          }
          teams {
            role
            members {
              status
              user {
                id
                username
                identities {
                  ... on Local {
                    name {
                      surname
                    }
                  }
                }
              }
            }
          }
          status
          meta {
            title
            declarations
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
