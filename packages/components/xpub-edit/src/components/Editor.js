import React from 'react'
import classnames from 'classnames'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import baseClasses from 'prosemirror-view/style/prosemirror.css'

import MenuBar from './MenuBar'
import decorations from '../decorations'
import { withEditorStyle } from './withStyles'
import placeholderPlugin from './configurable/config/PlaceHolderPlugin'

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

  uploadImage = file => {
    const { state } = this.state
    const { fileUpload } = this.props

    // A fresh object to act as the ID for this upload
    const id = {}

    // Replace the selection with a placeholder
    const { tr } = state
    if (!tr.selection.empty) tr.deleteSelection()

    tr.setMeta(placeholderPlugin, {
      add: { id, pos: tr.selection.from },
    })
    this.view.dispatch(tr)

    fileUpload(file).then(
      url => {
        const pos = this.findPlaceholder(this.view.state, id)
        // If the content around the placeholder has been deleted, drop
        // the image
        if (pos == null) {
          return
        }
        // Otherwise, insert it at the placeholder's position, and remove
        // the placeholder
        this.view.dispatch(
          state.tr
            .replaceWith(
              pos,
              pos,
              state.config.schema.nodes.image.create({
                src: url.file,
              }),
            )
            .setMeta(placeholderPlugin, { remove: { id } }),
        )
      },
      () => {
        // On failure, just clean up the placeholder
        this.view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }))
      },
    )
  }

  findPlaceholder = (state, id) => {
    const decos = placeholderPlugin.getState(state)
    const found = decos.find(null, null, spec => spec.id === id)
    return found.length ? found[0].from : null
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
      // placeholder,
      placeholderClassName,
      title,
      readonly,
      fileUpload,
      ...remainingProps
    } = this.props
    const { state } = this.state
    const menu = readonly ? null : options.menu

    return (
      <div>
        {menu && (
          <MenuBar
            dispatch={this.dispatchTransaction}
            fileUpload={this.uploadImage}
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
