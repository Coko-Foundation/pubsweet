import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const ImageUpload = styled.div`
  color: #777;
  cursor: pointer;
  display: inline-flex;

  &:hover {
    border-bottom: 2px solid ${th('colorPrimary')};
    color: ${th('colorPrimary')};
  }
  input {
    display: none;
  }
`
const UploadImage = ({ item, state, handle, fileUpload }) => (
  <ImageUpload>
    <label className="custom-file-upload" htmlFor="file-upload">
      upload image
      <input
        id="file-upload"
        onChange={e => fileUpload(e.target.files[0])}
        type="file"
      />
    </label>
  </ImageUpload>
)
export default UploadImage
