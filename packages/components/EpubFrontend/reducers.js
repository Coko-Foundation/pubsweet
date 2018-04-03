import {
  HTML_TO_EPUB_CONV_REQUEST,
  HTML_TO_EPUB_CONV_SUCCESS,
  HTML_TO_EPUB_CONV_FAILURE,
} from './types'

export default function htmlToEpub(
  state = {
    isFetching: false,
    extractedEpubPath: '',
  },
  action,
) {
  switch (action.type) {
    case HTML_TO_EPUB_CONV_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case HTML_TO_EPUB_CONV_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        extractedEpubPath: action.extractedEpubPath,
      })
    case HTML_TO_EPUB_CONV_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    default:
      return state
  }
}
