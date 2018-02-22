import React from 'react'
import styled from 'styled-components'

const Button = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${props => props.theme.borderWidth} dashed
    ${props => props.theme.colorBorder};
  height: ${props => props.theme.gridUnit};
  cursor: pointer;
  margin-bottom: ${props => props.theme.gridUnit};
  padding: ${props => props.theme.subGridUnit};
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
