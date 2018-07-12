import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

// import SimpleEditor from 'wax-editor-react'

// Change to main Editor when everything is done
import { MainEditor } from 'xpub-edit'

const MainEditorStyled = styled(MainEditor)`
  table {
    width: 100%;
    border-spacing: 0px !important;
    /*background-color: red;*/
  }
`
const Manuscript = ({
  content,
  currentUser,
  fileUpload,
  history,
  updateManuscript,
  version,
}) => (
  // <SimpleEditor
  //   content={content}
  //   fileUpload={fileUpload}
  //   history={history}
  //   onSave={source => updateManuscript({ source })}
  //   readOnly={version.submitted}
  //   trackChanges={false}
  //   update={data => updateManuscript(data)}
  //   user={currentUser}
  // />

  <MainEditorStyled onChange={values => true} value={content} />
)

export default withRouter(Manuscript)
