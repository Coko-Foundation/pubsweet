import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Wax } from 'wax-prose-mirror'

const ManuScript = styled.div`
  .wax-container {
    top: 10%;
    height: 90%;
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
  file,
  content,
  currentUser,
  fileUpload,
  history,
  updateManuscript,
}) =>
  file.mimeType ===
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
    <ManuScript>
      <Wax
        fileUpload={fileUpload}
        onChange={source => updateManuscript({ source })}
        value={content}
      />
    </ManuScript>
  ) : (
    <Info>No supported view of the file</Info>
  )

export default withRouter(Manuscript)
