import React from 'react'
import styled from 'styled-components'
import { th, override, validationColor } from '@pubsweet/ui-toolkit'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props =>
    props.inline ? '0' : `calc(${props.theme.gridUnit} * 3)`};
  ${override('ui.TextField')};
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
  ${override('ui.Label')};
  ${override('ui.TextField.Label')};
`

const TextArea = styled.textarea`
  border: ${th('borderWidth')} ${th('borderStyle')} ${validationColor};

  border-radius: ${th('borderRadius')};

  font-family: inherit;
  font-size: inherit;

  padding: ${th('gridUnit')};
  /* height: calc(${th('gridUnit')} * 6); */

  &::placeholder {
    color: ${th('colorTextPlaceholder')};
  }

  ${override('ui.TextField.Input')};
  height: auto;
  resize: none;
`

class ExpandingTextField extends React.Component {
  componentWillMount() {
    // generate a unique ID to link the label to the input
    // note this may not play well with server rendering
    this.inputId = `textfield-${Math.round(Math.random() * 1e12).toString(36)}`
  }
  componentWillUpdate() {
    // TODO: Use the component ref instead of getElementById

    const { lineHeight } = window.getComputedStyle(
      document.getElementById(this.inputId),
    )
    const intLineHeight = parseInt(lineHeight, 10)
    const { scrollHeight } = document.getElementById(this.inputId)

    this.lines = Math.round(scrollHeight / intLineHeight - 1)
    // It'll expand, but it won't shrink
  }

  render() {
    const {
      innerRefProp,
      className,
      label,
      type = 'text',
      value = '',
      readonly,
      inline,
      ...props
    } = this.props

    // TODO: Calculate the line height

    return (
      <Root className={className} inline={inline}>
        {label && <Label htmlFor={this.inputId}>{label}</Label>}
        <TextArea
          id={this.inputId}
          readOnly={readonly}
          ref={innerRefProp}
          rows={this.lines || 1}
          type={type}
          value={value}
          wrap="hard"
          {...props}
        />
      </Root>
    )
  }
}

export default ExpandingTextField
