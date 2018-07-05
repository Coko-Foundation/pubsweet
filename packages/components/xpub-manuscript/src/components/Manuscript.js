import React from 'react'
import { withRouter } from 'react-router-dom'
import { MainEditor } from 'xpub-edit'

const Manuscript = ({
  content,
  currentUser,
  fileUpload,
  history,
  updateManuscript,
  version,
}) => <MainEditor onChange={values => true} value={content} />

export default withRouter(Manuscript)
