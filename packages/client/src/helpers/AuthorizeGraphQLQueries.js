import gql from '@apollo/client'

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      admin
      id
      username
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      admin
      teams {
        id
        role
        global
        object {
          objectId
          objectType
        }
      }
    }
  }
`

export const GET_COLLECTION = gql`
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

export const GET_FRAGMENT = gql`
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

export const GET_TEAM = gql`
  query GetTeam($id: ID) {
    team(id: $id) {
      id
      members {
        id
      }
      role
      object {
        objectId
        objectType
      }
      name
      global
    }
  }
`
