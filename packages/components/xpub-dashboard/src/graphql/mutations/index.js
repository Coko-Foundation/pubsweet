import gql from 'graphql-tag'

export default {
  deleteManuscriptMutation: gql`
    mutation($id: ID) {
      deleteManuscript(id: $id) {
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
          members {
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
            status
          }
          role
        }
        status
        reviews {
          id
        }
        meta {
          title
          declarations
          articleSections
          articleType
          history
        }
      }
    }
  `,
  updateJournalMutation: gql`
    mutation($input: JournalInput) {
      updateJournal(input: $input) {
        id
        manuscripts {
          id
        }
      }
    }
  `,
}
