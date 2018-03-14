import { compose, withProps, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { gql } from 'apollo-client-preset'
import { withApollo } from 'react-apollo'
import request from 'pubsweet-client/src/helpers/api'
import { extractTitle, generateTitle } from './title'

const uploadManuscriptMutation = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      url
    }
  }
`

const createFragmentMutation = gql`
  mutation($input: String) {
    createFragment(input: $input) {
      id
    }
  }
`

const createCollectionMutation = gql`
  mutation($input: String) {
    createCollection(input: $input) {
      id
      fragments {
        id
      }
    }
  }
`

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
            mutation: uploadManuscriptMutation,
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

          const fragment = {
            created: new Date(), // TODO: set on server
            files: {
              manuscript: {
                name: file.name,
                url: fileURL,
              },
              supplementary: [],
            },
            fragmentType: 'version',
            metadata: {
              title,
            },
            source,
            version: 1,
          }
          return client.mutate({
            mutation: createFragmentMutation,
            variables: { input: JSON.stringify(fragment) },
          })
        })
        .then(({ data }) => {
          const collection = { title, fragments: [data.createFragment.id] }
          return client.mutate({
            mutation: createCollectionMutation,
            variables: { input: JSON.stringify(collection) },
          })
        })
        .then(({ data }) => {
          setConversionState({ converting: false })
          const route = `/projects/${data.createCollection.id}/versions/${
            data.createCollection.fragments[0].id
          }/submit`
          // redirect after a short delay
          window.setTimeout(() => {
            history.push(route)
          }, 2000)
        })
        .catch(error => setConversionState({ error }))
    },
  })),
)
