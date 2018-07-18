import React from 'react'
import { withRouter } from 'react-router-dom'
// import styled from 'styled-components'

import SimpleEditor from 'wax-editor-react'

// Change to main Editor when everything is done
// import { MainEditor } from 'xpub-edit'

// const MainEditorStyled = styled(MainEditor)`
//   border: none;
//   margin: 0 200px 50px 40px;
//   height: 800px;
//   overflow-y: scroll;
//   table {
//     width: 100%;
//     border-spacing: 0px !important;
//     tr {
//       height: 50px;
//     }
//     td {
//       width: 50%;
//       &.selectedCell {
//         background: rgba(200, 200, 255, 0.4);
//         pointer-events: none;
//       }
//     }
//   }
//   &.resize-cursor {
//     cursor: col-resize;
//   }
// `

const Manuscript = ({
  content,
  currentUser,
  fileUpload,
  history,
  updateManuscript,
  version,
}) => (
  <SimpleEditor
    content={content}
    fileUpload={fileUpload}
    history={history}
    onSave={source => updateManuscript({ source })}
    readOnly={version.submitted}
    trackChanges={false}
    update={data => updateManuscript(data)}
    user={currentUser}
  />

  //  <MainEditorStyled
  //  onChange={source => updateManuscript({ source })}
  //  value={content}
  //  />
)

export default withRouter(Manuscript)
