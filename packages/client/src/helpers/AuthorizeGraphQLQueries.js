import gql from 'graphql-tag'

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      username
      admin
      teams
    }
  }
`

const GET_COLLECTION = gql`
  query($id: ID) {
    collection(id: $id) {
      id
      fragments
      owners
    }
  }
`

const GET_FRAGMENT = gql`
  query($id: ID) {
    fragment(id: $id) {
      id
      fragmentType
      owners
    }
  }
`

const GET_TEAM = gql`
  query($id: ID) {
    team(id: $id) {
      id
      members
      teamType
      object
      name
    }
  }
`

module.exports = {
  GET_USER,
  GET_COLLECTION,
  GET_FRAGMENT,
  GET_TEAM,
}
