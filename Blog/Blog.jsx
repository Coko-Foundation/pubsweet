import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'

import './Blog.scss'
import styles from './Blog.local.scss'

import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import { fragmentsOfCollection } from '../../helpers/Utils'
import BlogpostSummary from './Summary'

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.getCollections()
      .then(result => this.props.actions.getFragments(result.collections[0]))
  }

  render () {
    var posts = this.props.posts.map(blogpost => {
      if (blogpost.published === true) {
        return (<BlogpostSummary
          key={blogpost.id}
          fragment={blogpost}
        />)
      }
    }).filter(function (summary) {
      if (summary) return true
    })

    if (posts.length === 0 && this.props.blog) {
      posts = <Row>
        <Col md={8} mdOffset={2}>
          <p>No blogpost has been published on {this.props.blog.title} yet.</p>
        </Col>
      </Row>
    }

    return (
      <div className="bootstrap">
        <div className={styles.heroBackground}>
          <Grid>
            <Row className={styles.hero}>
              <Col md={8} mdOffset={2}>
                <h1>Welcome to {this.props.blog && this.props.blog.title}</h1>
                <label>Science for the Web</label>
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid>
          <div className={styles.blogContainer}>
          {posts}
          </div>
          <Row className={styles.blogFooter}>
            <Col md={8} mdOffset={2}>
              <p>Powered by <a href="https://gitlab.coko.foundation/pubsweet/core">Science Blogger</a></p>
            </Col>
          </Row>
        </Grid>
      </div>

    )
  }
}

Blog.propTypes = {
  // Data
  blog: React.PropTypes.object,
  posts: React.PropTypes.array,
  // Injected by React Redux
  errorMessage: React.PropTypes.string,
  // Injected by React Router
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  let posts = fragmentsOfCollection(state.collections[0], state.fragments)
  return {
    blog: state.collections[0],
    posts: posts,
    errorMessage: state.errorMessage
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
)(Blog)
