import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { withLoader } from 'pubsweet-client'
import { connectToContext } from 'xpub-with-context'
import config from 'config'
import queries from './queries/'
import mutations from './mutations/'
import Dashboard from '../components/Dashboard'
import upload from '../lib/upload'

const { acceptUploadFiles } = config['pubsweet-component-xpub-dashboard'] || {}

const acceptFiles =
  acceptUploadFiles.length > 0
    ? acceptUploadFiles.join()
    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export default compose(
  connectToContext(),
  graphql(queries.dashboard, {
    options: { context: { online: false } },
    props: data => data,
  }),
  graphql(mutations.deleteManuscriptMutation, {
    props: ({ mutate }) => ({
      deleteManuscript: manuscript =>
        mutate({ variables: { id: manuscript.id } }),
    }),
    options: {
      update: (proxy, { data: { deleteManuscript: { id } } }) => {
        const data = proxy.readQuery({ query: queries.dashboard })
        const manuscriptIndex = data.journals.manuscripts.findIndex(
          manuscript => manuscript.id === id,
        )
        if (manuscriptIndex > -1) {
          data.journals.manuscripts.splice(manuscriptIndex, 1)
          proxy.writeQuery({ query: queries.dashboard, data })
        }
      },
    },
  }),
  withLoader(),
  withProps(({ journals, currentUser, ...rest }) => ({
    dashboard: journals.manuscripts,
    journals,
    currentUser,
    acceptFiles,
  })),
  upload,
)(Dashboard)
