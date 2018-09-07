import gql from 'graphql-tag'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      admin
      id
      username
    }
  }
`

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
  CURRENT_USER,
  GET_USER,
  GET_COLLECTION,
  GET_FRAGMENT,
  GET_TEAM,
}
