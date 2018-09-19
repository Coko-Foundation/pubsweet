import gql from 'graphql-tag'

export default {
  signupUser: gql`
    mutation($input: UserInput) {
      signupUser(input: $input) {
        identities {
          ...localFields
        }
      }
    }

    fragment localFields on Local {
      email
    }
  `,
}
