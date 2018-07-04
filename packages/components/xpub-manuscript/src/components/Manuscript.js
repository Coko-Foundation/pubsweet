import React from 'react'
import { withRouter } from 'react-router-dom'
// import SimpleEditor from 'wax-editor-react'
import { NoteEditor } from 'xpub-edit'
// TODO: convert user teams to roles (see SimpleEditorWrapper)?

const Manuscript = ({
  content,
  currentUser,
  fileUpload,
  history,
  updateManuscript,
  version,
}) => (
  <NoteEditor joinaboveblock liftitem orderedlist redo undo value={content} />

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
)

export default withRouter(Manuscript)
