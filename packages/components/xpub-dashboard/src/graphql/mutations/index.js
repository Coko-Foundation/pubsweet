import gql from 'graphql-tag'

export default {
  deleteProjectMutation: gql`
    mutation($id: ID) {
      deleteCollection(id: $id) {
        id
      }
    }
  `,
}
