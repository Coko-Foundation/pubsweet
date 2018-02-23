import React from 'react'
import styled from 'styled-components'
import theme from '../helpers/theme'

const Button = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${theme.borderWidth} dashed ${theme.colorBorder};
  height: ${theme.gridUnit};
  cursor: pointer;
  margin-bottom: ${theme.gridUnit};
  padding: ${theme.subGridUnit};
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
