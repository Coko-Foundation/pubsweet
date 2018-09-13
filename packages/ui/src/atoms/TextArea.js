import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { th, override, validationColor } from '@pubsweet/ui-toolkit'

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

class TextArea extends React.Component {
  componentWillMount() {
    // generate a unique ID to link the label to the input
    // note this may not play well with server rendering
    this.inputId = `textarea-${Math.round(Math.random() * 1e12).toString(36)}`
  }
  render() {
    const { label, value = '', readonly, rows = 5, ...props } = this.props
    return (
      <Root>
        {label && <Label htmlFor={this.inputId}>{label}</Label>}
        <Area
          id={this.inputId}
          readOnly={readonly}
          rows={rows}
          value={value}
          {...props}
        />
      </Root>
    )
  }
}

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
}

export default TextArea