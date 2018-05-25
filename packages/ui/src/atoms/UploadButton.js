import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const Button = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${th('borderWidth')} dashed ${th('colorBorder')};
  height: ${th('gridUnit')};
  cursor: pointer;
  margin-bottom: ${th('gridUnit')};
  padding: ${th('subGridUnit')};
`

const UploadButton = ({ name, buttonText, onChange }) => {
  let fileInput
  return (
    <div>
      <Button onClick={() => fileInput.click()}>{buttonText}</Button>

      <input
        multiple
        name={name}
        onChange={onChange}
        ref={input => (fileInput = input)}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  )
}

export default UploadButton
