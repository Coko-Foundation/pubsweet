import gql from 'graphql-tag'

const LOGIN_USER = gql`
  mutation($input: LoginUserInput) {
    loginUser(input: $input) {
      token
    }
  }
`

module.exports = {
  LOGIN_USER,
}
