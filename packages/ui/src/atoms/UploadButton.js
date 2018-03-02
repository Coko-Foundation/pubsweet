import React from 'react'
import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

const Button = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${fromTheme('borderWidth')} dashed ${fromTheme('colorBorder')};
  height: ${fromTheme('gridUnit')};
  cursor: pointer;
  margin-bottom: ${fromTheme('gridUnit')};
  padding: ${fromTheme('subGridUnit')};
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
