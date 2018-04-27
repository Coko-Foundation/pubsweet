import React from 'react'
import HtmlViewer from '../HtmlViewer'
import makeConfig from './config'

const ConfigurableViewer = ({ className, value, ...features }) => (
  <HtmlViewer
    className={className}
    options={makeConfig(features)}
    value={value}
  />
)

export default ConfigurableViewer
