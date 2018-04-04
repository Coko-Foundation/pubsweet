import React from 'react'

import Editor from '@atlaskit/editor-core/dist/es5/editor'

const EpistemeEditor = () => (
  <div>
    <p>
      The most basic editor possible. Editor you get by rendering {'<Editor/>'}{' '}
      component with no props.
    </p>
    <Editor appearance="message" />
  </div>
)
export default EpistemeEditor
