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

ConfigurableEditor.propTypes = {
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  superscript: PropTypes.bool,
  subscript: PropTypes.bool,
  smallcaps: PropTypes.bool,
  link: PropTypes.bool,
  heading: PropTypes.bool,
  undo: PropTypes.bool,
  redo: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default ConfigurableEditor
