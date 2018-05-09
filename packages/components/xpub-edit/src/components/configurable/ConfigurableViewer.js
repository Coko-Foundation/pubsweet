import React from 'react'
import PropTypes from 'prop-types'
import HtmlViewer from '../HtmlViewer'
import EditorOptions from './EditorOptions'

const ConfigurableViewer = props => (
  <EditorOptions {...props}>
    {(options, remainingProps) => (
      <HtmlViewer options={options} {...remainingProps} />
    )}
  </EditorOptions>
)

ConfigurableViewer.propTypes = {
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
}

export default ConfigurableViewer
