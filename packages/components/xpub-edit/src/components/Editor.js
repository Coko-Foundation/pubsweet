import React from 'react'
import classnames from 'classnames'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
// import { Schema, DOMParser } from 'prosemirror-model'
// import { schema } from 'prosemirror-schema-basic'

// import { addListNodes } from 'prosemirror-schema-list'
import baseClasses from 'prosemirror-view/style/prosemirror.css'

import MenuBar from './MenuBar'
import decorations from '../decorations'
import { withEditorStyle } from './withStyles'

class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      state: EditorState.create(props.options),
    }
  }

  createEditorView = node => {
    const { state } = this.state
    const { autoFocus, className, readonly, onBlur } = this.props

    this.view = new EditorView(node, {
      state,
      editable: () => !readonly,
      dispatchTransaction: this.dispatchTransaction,
      decorations: decorations({
        props: this.props,
      }),
      attributes: {
        class: classnames(className, baseClasses.ProseMirror),
      },
      handleDOMEvents: {
        blur: onBlur
          ? view => {
              onBlur(view.state.doc.content)
            }
          : null,
      },
    })

    if (autoFocus) {
      this.view.focus()
    }
  }

  dispatchTransaction = transaction => {
    const state = this.view.state.apply(transaction)
    this.view.updateState(state)
    this.setState({ state })
    this.props.onChange(state.doc.content)
  }

  render() {
    const {
      autoFocus,
      basePlaceholderClassName,
      className,
      onBlur,
      options,
      placeholder,
      placeholderClassName,
      title,
      readonly,
      ...remainingProps
    } = this.props
    const { state } = this.state
    const menu = readonly ? {} : options.menu

    return (
      <div>
        {menu && (
          <MenuBar
            dispatch={this.dispatchTransaction}
            menu={menu}
            state={state}
            title={title}
          />
        )}

        <div ref={this.createEditorView} {...remainingProps} />
      </div>
    )
  }
}

export default withEditorStyle(Editor)
