import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'

import { getDebugInfo } from '../actions'

class Debug extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.getDebugInfo()
  }
  render () {
    const debugs = this.props.debugs.map((debug, key) => {
      return (<pre><code>{JSON.stringify(debug, null, 4)}</code></pre>)
    })
    return (
      <div className='bootstrap'>
        <Grid>
          <Row>
            <Col xs={12}>
              {debugs}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Debug.propTypes = {
  debugs: PropTypes.object,
  actions: PropTypes.object
}

function mapState (state) {
  return {
    debugs: state.debug
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ getDebugInfo }, dispatch)
  }
}

export default connect(
  mapState,
  mapDispatch
)(Debug)

