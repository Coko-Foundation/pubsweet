import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { withLoader } from 'pubsweet-client'
import queries from './queries/'
// import mutations from './mutations/'
import Dashboard from '../components/Dashboard'
import upload from '../lib/upload'

export default compose(
  graphql(queries.myManuscripts, {
    options: { context: { online: false } },
  }),
  // graphql(mutations.deleteProjectMutation, {
  //   props: ({ mutate }) => ({
  //     deleteProject: project => mutate({ variables: { id: project.id } }),
  //   }),
  //   options: {
  //     update: (
  //       proxy,
  //       {
  //         data: {
  //           deleteCollection: { id },
  //         },
  //       },
  //     ) => {
  //       const data = proxy.readQuery({ query })
  //       const collectionIndex = data.collections.findIndex(col => col.id === id)
  //       if (collectionIndex > -1) {
  //         data.collections.splice(collectionIndex, 1)
  //         proxy.writeQuery({ query, data })
  //       }
  //     },
  //   },
  // }),
  withLoader(),
  withProps(({ manuscripts: { manuscripts }, currentUser }) => ({
    dashboard: manuscripts,
    currentUser,
  })),
  upload,
)(Dashboard)
