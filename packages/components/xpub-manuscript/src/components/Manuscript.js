import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { MainEditor } from 'xpub-edit'

const MainEditorStyled = styled(MainEditor)`
  border: none;
  margin: 0 200px 50px 40px;
  height: 800px;
  overflow-y: scroll;
  table {
    width: 100%;
    border-spacing: 0px !important;
    tr {
      height: 50px;
    }
    td {
      width: 50%;
      &.selectedCell {
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }
    }
  }
  &.resize-cursor {
    cursor: col-resize;
  }
`

const Info = styled.span`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
`

const Manuscript = ({
  content,
  currentUser,
  fileUpload,
  history,
  updateManuscript,
  version,
}) =>
  version.files.manuscript.type ===
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
    <MainEditorStyled
      fileUpload={fileUpload}
      onChange={source => updateManuscript({ source })}
      value={content}
    />
  ) : (
    <Info>No supported view of the file</Info>
  )

export default withRouter(Manuscript)
