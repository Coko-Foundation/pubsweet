import { connect } from 'react-redux'
import Modal from './Modal'

export default connect(state => ({
  modal: state.modal,
}))(Modal)
