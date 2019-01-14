import gql from 'graphql-tag'

const fragmentFields = `
  id
  created
  meta {
    title
  }
`

export default {
  teamManager: gql`
  query {
    teams {
      id
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
      }
    }

    users {
      id
      username
      admin
    }

    manuscripts {
      ${fragmentFields}
      manuscriptVersions {
        ${fragmentFields}
      }
    }
  }
  `,
}
