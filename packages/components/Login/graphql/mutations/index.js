import gql from 'graphql-tag'

export default {
  loginUser: gql`
    mutation($input: LoginUserInput) {
      loginUser(input: $input) {
        token
      }
    }
  `,
}
