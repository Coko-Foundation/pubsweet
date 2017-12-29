import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import UniversalModal from './components/Modal'
import FooterModal from './components/FooterModal'

class Wrapper extends Component {
  componentDidMount() {
    const layout = {
      body: this.props.Component,
      header: this.props.Header,
      footer: this.props.Footer,
    }
    UniversalModal.addComponent(this.props.name, layout)
  }

  render() {
    return this.props.children
  }
}

export default connect(
  state => ({
    modal: state.modal,
  }),
  {
    toggleModal: dispatch => ({
      toggleModal: modalProps => dispatch(actions.toggleModal(modalProps)),
    }),
  },
)(Wrapper)
