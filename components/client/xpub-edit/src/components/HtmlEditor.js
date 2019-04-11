import React from 'react'
import debounce from 'lodash/debounce'
import { DOMParser, DOMSerializer } from 'prosemirror-model'

import Editor from './Editor'

const parser = schema => {
  const parser = DOMParser.fromSchema(schema)

  return content => {
    const container = document.createElement('article')
    container.innerHTML = content
    return parser.parse(container)
  }
}

const serializer = schema => {
  const serializer = DOMSerializer.fromSchema(schema)

  return content => {
    const container = document.createElement('article')
    container.appendChild(serializer.serializeFragment(content))
    return container.innerHTML
  }
}

class HtmlEditor extends React.Component {
  componentWillMount() {
    const {
      debounceDelay = 1000,
      value,
      onChange = () => true,
      onBlur,
      options,
    } = this.props
    const { schema } = options

    const parse = parser(schema)
    const serialize = serializer(schema)

    options.doc = parse(value)

    const handleChange = value => {
      onChange(serialize(value))
    }
    this.onChange = debounceDelay
      ? debounce(handleChange, debounceDelay, { maxWait: 5000 })
      : handleChange

    this.onBlur = value => {
      onBlur(serialize(value))
    }
  }

  render() {
    const { value, onChange, onBlur, fileUpload, ...passedProps } = this.props

    return (
      <Editor
        fileUpload={fileUpload}
        onBlur={this.onBlur}
        onChange={this.onChange}
        {...passedProps}
      />
    )
  }
}

export default HtmlEditor
