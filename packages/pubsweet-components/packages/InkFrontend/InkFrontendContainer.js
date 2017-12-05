import { connect } from 'react-redux'
import { ink as convert } from './actions'
import InkFrontend from './InkFrontend'

export default connect(
  state => ({
    ink: state.ink
  }),
  {
    convert
  }
)(InkFrontend)
