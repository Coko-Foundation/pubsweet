import React from 'react'
import HtmlEditor from '../HtmlEditor'

// TODO: only allow a single line of text (no line-breaks)
// TODO: ensure that content is saved when component is unmounted or blurred

import * as options from './config'

const TextEditor = ({
  className,
  onBlur,
  onChange,
  placeholder,
  placeholderClassName,
  readonly,
  title,
  value,
}) => (
  <HtmlEditor
    className={className}
    onBlur={onBlur}
    onChange={onChange}
    options={options}
    placeholder={placeholder}
    placeholderClassName={placeholderClassName}
    readonly={readonly}
    title={title}
    value={value}
  />
)

export default TextEditor
