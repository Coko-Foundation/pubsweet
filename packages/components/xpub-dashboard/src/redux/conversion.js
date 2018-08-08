import { actions } from 'pubsweet-client'
import { ink } from 'pubsweet-component-ink-frontend/actions'
import uploadFile from 'xpub-upload'
import { generateTitle, extractTitle } from '../lib/title'

/* constants */

export const UPLOAD_MANUSCRIPT_REQUEST = 'UPLOAD_MANUSCRIPT_REQUEST'
export const UPLOAD_MANUSCRIPT_SUCCESS = 'UPLOAD_MANUSCRIPT_SUCCESS'
export const UPLOAD_MANUSCRIPT_FAILURE = 'UPLOAD_MANUSCRIPT_FAILURE'

/* actions */

export const uploadManuscriptRequest = () => ({
  type: UPLOAD_MANUSCRIPT_REQUEST,
})

export const uploadManuscriptSuccess = (collection, fragment) => ({
  collection,
  fragment,
  type: UPLOAD_MANUSCRIPT_SUCCESS,
})

export const uploadManuscriptFailure = error => ({
  error,
  type: UPLOAD_MANUSCRIPT_FAILURE,
})

export const uploadManuscriptNoConversion = (
  acceptedFiles,
  history,
) => dispatch => {
  if (acceptedFiles.length > 1) {
    throw new Error('Only one manuscript file can be uploaded')
  }

  const inputFile = acceptedFiles[0]

  dispatch(uploadManuscriptRequest())
  startUploadFile(inputFile, dispatch, request => {
    const fileURL = request.responseText
    return createFragmentVersion(
      dispatch,
      inputFile,
      fileURL,
      { converted: '' },
      history,
    )
  })
}

const startUploadFile = (file, dispatch, load) => {
  const request = dispatch(uploadFile(file))

  request.addEventListener('load', event => {
    if (request.status >= 400) {
      dispatch(
        uploadManuscriptFailure({
          message: 'There was an error uploading the file',
        }),
      )
      throw new Error('There was an error uploading the file')
    }
    load(request)
  })
}

const createFragmentVersion = (
  dispatch,
  inputFile,
  fileURL,
  response,
  history,
) => {
  const source = response.converted
  const title = extractTitle(source) || generateTitle(inputFile.name)

  dispatch(actions.createCollection({ title })).then(({ collection }) => {
    if (!collection.id) {
      throw new Error('Failed to create a project')
    }

    // TODO: rethrow errors so they can be caught here
    return dispatch(
      actions.createFragment(collection, {
        created: new Date(), // TODO: set on server
        collections: [collection.id],
        files: {
          manuscript: {
            name: inputFile.name,
            url: fileURL,
            type: inputFile.type,
          },
          supplementary: [],
        },
        fragmentType: 'version',
        metadata: {
          title,
        },
        source,
        version: 1,
      }),
    ).then(({ fragment }) => {
      dispatch(uploadManuscriptSuccess(collection, fragment))
      const route = `/projects/${collection.id}/versions/${fragment.id}/submit`
      // redirect after a short delay
      window.setTimeout(() => {
        history.push(route)
      }, 2000)
    })
  })
}

export const uploadManuscript = (acceptedFiles, history) => dispatch => {
  if (acceptedFiles.length > 1) {
    throw new Error('Only one manuscript file can be uploaded')
  }

  const inputFile = acceptedFiles[0]

  dispatch(uploadManuscriptRequest())

  startUploadFile(inputFile, dispatch, request => {
    const fileURL = request.responseText
    dispatch(ink(inputFile, { recipe: 'editoria-typescript' }))
      .then(response => {
        if (!response.converted) {
          throw new Error('The file was not converted')
        }

        return createFragmentVersion(
          dispatch,
          inputFile,
          fileURL,
          response,
          history,
        )
      })
      .catch(error => {
        dispatch(uploadManuscriptFailure(error))
        throw error // rethrow
      })
  })
}

/* reducer */

const initialState = {
  converting: false,
  error: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_MANUSCRIPT_REQUEST:
      return {
        converting: true,
        error: undefined,
      }

    case UPLOAD_MANUSCRIPT_SUCCESS:
      return {
        converting: false,
        error: undefined,
      }

    case UPLOAD_MANUSCRIPT_FAILURE:
      return {
        converting: false,
        error: action.error,
      }

    default:
      return state
  }
}
