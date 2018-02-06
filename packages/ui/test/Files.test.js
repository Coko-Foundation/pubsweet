import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Files from '../src/molecules/Files'

const value = [
  {
    name: 'IMG_4346.JPG',
    type: 'JPG',
    size: 4346,
  },
]

describe('Files', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Files
        buttonText="↑ Choose a file to upload"
        uploadedFile={value => <div key={value.name}>{value.name}</div>}
        uploadFile={file => new XMLHttpRequest()}
        uploadingFile={({ file, progress, error }) => (
          <div style={{ color: 'gray' }}>{file.name}</div>
        )}
        value={value}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
