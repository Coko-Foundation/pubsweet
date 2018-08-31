import gql from 'graphql-tag'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      admin
      teams {
        id
      }
    }
  }
`

const GET_COLLECTION = gql`
  query GetCollection($id: ID) {
    collection(id: $id) {
      id
      fragments {
        id
      }
      owners {
        id
      }
    }
  }
`

const GET_FRAGMENT = gql`
  query GetFragment($id: ID) {
    fragment(id: $id) {
      id
      fragmentType
      owners {
        id
      }
    }
  }
`

const GET_TEAM = gql`
  query GetTeam($id: ID) {
    team(id: $id) {
      id
      members {
        id
      }
      teamType
      object {
        objectId
        objectType
      }
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
