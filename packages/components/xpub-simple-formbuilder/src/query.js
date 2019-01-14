import gql from 'graphql-tag'

const query = gql`
  query {
    currentUser {
      id
      username
      admin
    }

    getForms
  }
`

return query
