import gql from 'graphql-tag'

export const SIGNUP_USER = gql`
  mutation($input: UserInput) {
    createUser(input: $input) {
      id
      type
      username
      email
    }
  }
`
