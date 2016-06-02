import React from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { Grid, Row, Col } from 'react-bootstrap'

import '../scss/main'
import styles from '../scss/components/Blog.local.scss'

import * as Actions from '../actions'
import { bindActionCreators } from 'redux'

import BlogpostSummary from '../registry/Substance/Summary'

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.hydrate()
  }

  render () {
    var fragments = this.props.fragments.map(function (blogpost) {
      if (blogpost.published === true) {
        return (<BlogpostSummary
          key={blogpost.id}
          fragment={blogpost}
        />)
      }
    }).filter(function (summary) {
      if (summary) return true
    })

    if (fragments.length === 0 && this.props.collection) {
      fragments = <Row>
        <Col md={8} mdOffset={2}>
          <p>No blogpost has been published on {this.props.collection.title} yet.</p>
        </Col>
      </Row>
    }

    return (
      <div className='bootstrap'>
        <div className={styles.heroBackground}>
        <Grid>
        <Row className={styles.hero}>
          <Col md={8} mdOffset={2}>
            <h1>Welcome to {this.props.collection && this.props.collection.title}</h1>
            <label>Science for the Web</label>
          </Col>
        </Row>
        </Grid>
        </div>
        <Grid>
        <div className={styles.blogContainer}>
        {fragments}
        </div>
        <Row className={styles.blogFooter}>
          <Col md={8} mdOffset={2}>
            <p>Powered by <a href='https://gitlab.coko.foundation/pubsweet/core'>Science Blogger</a></p>
          </Col>
        </Row>
        </Grid>
      </div>

    )
  }
}

Blog.propTypes = {
  // Data
  collection: React.PropTypes.object,
  fragments: React.PropTypes.array,
  // Injected by React Redux
  errorMessage: React.PropTypes.string,
  pushState: React.PropTypes.func.isRequired,
  inputValue: React.PropTypes.string.isRequired,
  // Injected by React Router
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    collection: state.collections[0],
    fragments: state.fragments,
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushState: pushState,
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
