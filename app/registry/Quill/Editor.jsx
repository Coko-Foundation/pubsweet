import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import _ from 'lodash'

import React from 'react'
import ReactQuill from 'react-quill'

// if(THEME === 'default') { //eslint-disable-line
//   require(defaultTheme)
// } else {
//   try {
//     require(theme)
//   } catch (err) {
//     console.error(err, 'Theme not found for', theme)
//     require(defaultTheme)
//   }
// }

import './styles/Editor.scss'

// var defaultTheme = './styles/Editor.scss'
// var theme = './styles/Editor-' + THEME + '.scss' //eslint-disable-line

// fs.stat(theme, function (err) { //eslint-disable-line
//   err && require('./styles/Editor.scss') || require(defaultTheme)
// })

// switch (THEME) { //eslint-disable-line
//   case 'dark':

//     break
//   default:
// }

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)
  }

  _onChange (content) {
    let fragment = Object.assign(this.props.fragment, {
      source: content,
      presentation: content
    })
    this.props.actions.updateFragment(fragment)
  }

  render () {
    let editor
    if (this.props.fragment) {
      editor = <ReactQuill theme='snow'
        value={this.props.fragment.source}
        onChange={this._onChange}
      />
    } else {
      editor = <p>Loading</p>
    }

    return (
      <div>
        {editor}
      </div>
    )
  }
}

Editor.propTypes = {
  fragment: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapStateToProps (state) {
  console.log(state)
  return {
    fragment: _.find(state.fragments, function (f) {
      return f._id === state.router.params.id
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
