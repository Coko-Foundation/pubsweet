import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { th, override, validationColor } from '@pubsweet/ui-toolkit'
import { useUID } from 'react-uid'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  ${override('ui.TextArea')};
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
  ${override('ui.Label')};
  ${override('ui.TextArea.Label')};
`
const Area = styled.textarea`
  border: ${th('borderWidth')} ${th('borderStyle')} ${validationColor};
  border-radius: ${th('borderRadius')};
  font-family: ${th('fontWriting')};
  font-size: ${th('fontSizeBase')};
  padding: calc(${th('gridUnit')} * 1.5) ${th('gridUnit')};
  line-height: ${th('lineHeightBase')};
  box-sizing: border-box;
  max-width: 100%;
  &::placeholder {
    color: ${th('colorTextPlaceholder')};
  }

  ${override('ui.TextArea.Area')};
`

const TextArea = props => {
  const uid = useUID()
  const { label, value = '', readonly, rows = 5, ...rest } = props

  return (
    <Root>
      {label && <Label htmlFor={uid}>{label}</Label>}
      <Area id={uid} readOnly={readonly} rows={rows} value={value} {...rest} />
    </Root>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
}

export default TextArea
