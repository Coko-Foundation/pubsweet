import { compose, withProps, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import request from 'pubsweet-client/src/helpers/api'
import queries from '../graphql/queries/'
import mutations from '../graphql/mutations/'
import { extractTitle, generateTitle } from './title'

export default compose(
  withApollo,
  withState('conversion', 'setConversionState', {}),
  withRouter,
  withProps(({ client, setConversionState, history }) => ({
    uploadManuscript: files => {
      const [file] = files
      let fileURL, title, source
      setConversionState({ converting: true })
      return Promise.resolve()
        .then(() => {
          if (files.length > 1) {
            throw new Error('Only one manuscript file can be uploaded')
          }

          return client.mutate({
            mutation: mutations.uploadManuscriptMutation,
            variables: { file },
          })
        })
        .then(({ data }) => {
          fileURL = data.upload.url

          const body = new FormData()
          body.append('file', file)

          const url = '/ink?recipe=editoria-typescript'

          return request(url, { method: 'POST', body })
        })
        .then(response => {
          if (!response.converted) {
            throw new Error('The file was not converted')
          }

          source = response.converted
          title = extractTitle(source) || generateTitle(file.name)

          const manuscript = {
            created: new Date(), // TODO: set on server
            files: {
              created: new Date(), // TODO: set on server
              type: 'manuscript',
              filename: file.name,
              url: fileURL,
              mimeType: file.type,
            },
            meta: {
              title,
              source,
            },
            status: 'new',
          }

          return client.mutate({
            mutation: mutations.createManuscriptMutation,
            variables: { input: manuscript },
            update: (
              proxy,
              {
                data: {
                  createManuscript: { id },
                },
              },
            ) => {
              const data = proxy.readQuery({ query: queries.myManuscripts })

              data.manuscripts.manuscripts.push(manuscript)
              proxy.writeQuery({ query: queries.myManuscripts, data })
            },
          })
        })
        .then(({ data }) => {
          setConversionState({ converting: false })
          // const route = `/projects/${data.createManuscript.id}/versions/${
          //   data.createCollection.fragments[0].id
          // }/submit`
          // // redirect after a short delay
          // window.setTimeout(() => {
          //   history.push(route)
          // }, 2000)
        })
        .catch(error => setConversionState({ error }))
    },
  })),
)
