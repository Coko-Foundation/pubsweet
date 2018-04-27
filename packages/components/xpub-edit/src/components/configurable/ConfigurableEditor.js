import React from 'react'
import HtmlEditor from '../HtmlEditor'
import makeConfig from './config'

const ConfigurableEditor = ({
  className,
  value,
  placeholder,
  placeholderClassName,
  title,
  onBlur,
  onChange,
  readonly,
  ...features
}) => (
  <HtmlEditor
    className={className}
    onBlur={onBlur}
    onChange={onChange}
    options={makeConfig(features)}
    placeholder={placeholder}
    placeholderClassName={placeholderClassName}
    readonly={readonly}
    title={title}
    value={value}
  />
)

export default ConfigurableEditor
