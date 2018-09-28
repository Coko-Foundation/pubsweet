import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { withLoader } from 'pubsweet-client'
import queries from './queries/'
import mutations from './mutations/'
import Dashboard from '../components/Dashboard'
import upload from '../lib/upload'

export default compose(
  graphql(queries.myManuscripts, {
    options: { context: { online: false } },
  }),
  graphql(mutations.deleteManuscriptMutation, {
    props: ({ mutate }) => ({
      deleteManuscript: manuscript =>
        mutate({ variables: { id: manuscript.id } }),
    }),
    options: {
      update: (
        proxy,
        {
          data: {
            deleteManuscript: { id },
          },
        },
      ) => {
        const data = proxy.readQuery({ query: queries.myManuscripts })
        const manuscriptIndex = data.manuscripts.manuscripts.findIndex(
          manuscript => manuscript.id === id,
        )
        if (manuscriptIndex > -1) {
          data.manuscripts.manuscripts.splice(manuscriptIndex, 1)
          proxy.writeQuery({ query: queries.myManuscripts, data })
        }
      },
    },
  }),
  withLoader(),
  withProps(({ manuscripts: { manuscripts }, currentUser }) => ({
    dashboard: manuscripts,
    currentUser,
  })),
  upload,
)(Dashboard)
