import React from 'react'
import pick from 'lodash/pick'
import makeConfig from './config'

const FEATURES_WHITELIST = [
  'undo',
  'redo',
  'bold',
  'italic',
  'underline',
  'superscript',
  'subscript',
  'smallcaps',
  'link',
  'heading',
  'bulletlist',
  'orderedlist',
  'joinaboveblock',
  'liftitem',
  'createtable',
  'table',
  'insertimage',
]

class ConfigurableEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const features = pick(nextProps, FEATURES_WHITELIST)

    if (prevState.options) {
      // updating options on an existing editor is deliberately disabled
      // as it causes menu buttons to forget their selected state
      return null
    }

    return {
      options: makeConfig(features),
    }
  }

  render() {
    // only pass through unrecognised props
    const remainingProps = Object.keys(this.props)
      .filter(key => !FEATURES_WHITELIST.includes(key) && key !== 'children')
      .reduce((props, key) => ({ ...props, [key]: this.props[key] }), {})

    return this.props.children(this.state.options, remainingProps)
  }
}

export default ConfigurableEditor
