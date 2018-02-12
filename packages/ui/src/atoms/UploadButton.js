import React from 'react'
import styled from 'styled-components'

const Button = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: var(--border-width) dashed var(--color-border);
  height: var(--grid-unit);
  cursor: pointer;
  margin-bottom: var(--grid-unit);
  padding: var(--sub-grid-unit);
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
