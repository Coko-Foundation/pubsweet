import { compose, withProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import request from 'pubsweet-client/src/helpers/api'
import queries from '../graphql/queries/'
import mutations from '../graphql/mutations/'
import { extractTitle, generateTitle } from './title'

const uploadPromise = (files, client) => () => {
  const [file] = files
  if (files.length > 1) {
    throw new Error('Only one manuscript file can be uploaded')
  }

  return client.mutate({
    mutation: mutations.uploadManuscriptMutation,
    variables: { file },
  })
}

const inkConvertPromise = file => ({ data }) => {
  const body = new FormData()
  body.append('file', file)

  const url = '/ink?recipe=editoria-typescript'

  return request(url, { method: 'POST', body }).then(response =>
    Promise.resolve({
      fileURL: data.upload.url,
      response,
    }),
  )
}

const createManuscriptPromise = (file, client) => ({ fileURL, response }) => {
  if (!response.converted) {
    throw new Error('The file was not converted')
  }

  const source = response.converted
  const title = extractTitle(source) || generateTitle(file.name)

  const manuscript = {
    created: new Date(), // TODO: set on server
    files: [
      {
        created: new Date(), // TODO: set on server
        type: 'manuscript',
        filename: file.name,
        url: fileURL,
        mimeType: file.type,
      },
    ],
    meta: {
      title,
      source,
    },
    status: 'new',
  }

  return client.mutate({
    mutation: mutations.createManuscriptMutation,
    variables: { input: manuscript },
    update: (proxy, { data: { createManuscript } }) => {
      const data = proxy.readQuery({ query: queries.dashboard })
      data.journals.manuscripts.push(createManuscript)
      proxy.writeQuery({ query: queries.dashboard, data })
    },
  })
}

const redirectPromise = (setConversionState, journals, history) => ({
  data,
}) => {
  setConversionState(() => ({ converting: false }))
  const route = `/journals/${journals.id}/versions/${
    data.createManuscript.id
  }/submit`
  // redirect after a short delay
  window.setTimeout(() => {
    history.push(route)
  }, 2000)
}

const skipInkConversion = file =>
  !(
    file.type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )

export default compose(
  withApollo,
  withRouter,
  withProps(({ client, setConversionState, history, journals }) => ({
    uploadManuscript: files => {
      const [file] = files
      setConversionState(() => ({ converting: true }))
      return Promise.resolve()
        .then(uploadPromise(files, client))
        .then(
          skipInkConversion(file)
            ? ({ data }) =>
                Promise.resolve({
                  fileURL: data.upload.url,
                  response: { converted: true },
                })
            : inkConvertPromise(file),
        )
        .then(createManuscriptPromise(file, client))
        .then(redirectPromise(setConversionState, journals, history))
        .catch(error => setConversionState(() => ({ error })))
    },
  })),
)
