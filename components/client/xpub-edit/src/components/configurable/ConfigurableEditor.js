import React from 'react'
import PropTypes from 'prop-types'
import HtmlEditor from '../HtmlEditor'
import EditorOptions from './EditorOptions'

const ConfigurableEditor = props => (
  <EditorOptions {...props}>
    {(options, passedProps) => (
      <HtmlEditor options={options} {...passedProps} />
    )}
  </EditorOptions>
)

const optionPropType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.shape({ icon: PropTypes.node }),
])

ConfigurableEditor.propTypes = {
  bold: optionPropType,
  italic: optionPropType,
  underline: optionPropType,
  superscript: optionPropType,
  subscript: optionPropType,
  smallcaps: optionPropType,
  link: optionPropType,
  heading: optionPropType,
  undo: optionPropType,
  redo: optionPropType,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  debounceDelay: PropTypes.number,
}

export default ConfigurableEditor
