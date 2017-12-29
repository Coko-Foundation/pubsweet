import { connect } from 'react-redux'
import Modal from './components/Modal'

export default connect(state => ({
  modal: state.modal,
}))(Modal)
