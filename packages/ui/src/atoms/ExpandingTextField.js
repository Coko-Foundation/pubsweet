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
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    // generate a unique ID to link the label to the input
    // note this may not play well with server rendering
    this.inputId = `textfield-${Math.round(Math.random() * 1e12).toString(36)}`
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: Use the component ref instead of getElementById
    // TODO: Use PropTypes
    //  {
    //    minRows?: number,
    //    maxRows?: number;
    //  }

    const { lineHeight } = window.getComputedStyle(
      document.getElementById(this.inputId),
    )
    const intLineHeight = parseInt(lineHeight, 10)
    const { scrollHeight, value } = document.getElementById(this.inputId)
    const lines = Math.round(scrollHeight / intLineHeight - 1)

    const constrainedLines = Math.min(lines, this.props.maxRows || lines)

    if (prevProps.value.length > value.length) {
      // This will force container size to be re-evaluated when the amount of
      // text is reduced
      this.setLines()
    } else if (this.state.lines !== constrainedLines) {
      this.setLines(constrainedLines)
    }
  }

  setLines(lines = this.props.minRows || 1) {
    this.setState({ lines })
  }

  render() {
    const {
      innerRefProp,
      className,
      label,
      type = 'text',
      value = '',
      minRows = 1,
      readonly,
      inline,
      ...props
    } = this.props

    return (
      <Root className={className} inline={inline}>
        {label && <Label htmlFor={this.inputId}>{label}</Label>}
        <TextArea
          id={this.inputId}
          readOnly={readonly}
          ref={innerRefProp}
          rows={this.state.lines || minRows}
          type={type}
          value={value}
          {...props}
        />
      </Root>
    )
  }
}

export default ExpandingTextField
