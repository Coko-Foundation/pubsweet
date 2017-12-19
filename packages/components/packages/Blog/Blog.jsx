import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'

import 'pubsweet-component-manage/Manage.scss'
import styles from './Blog.local.scss'

import Summary from './Summary'

export default class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.props.actions
      .getCollections()
      .then(result => this.props.actions.getFragments(result.collections[0]))
  }

  render() {
    let posts = this.props.posts
      .filter(post => post.published)
      .map(post => <Summary fragment={post} key={post.id} />)

    if (posts.length === 0 && this.props.blog) {
      posts = (
        <Row>
          <Col md={8} mdOffset={2}>
            <p>
              No blogpost has been published on {this.props.blog.title} yet.
            </p>
          </Col>
        </Row>
      )
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
          <div className={styles.blogContainer}>{posts}</div>
          <Row className={styles.blogFooter}>
            <Col md={8} mdOffset={2}>
              <p>
                Powered by{' '}
                <a href="https://gitlab.coko.foundation/pubsweet">PubSweet</a>
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Blog.propTypes = {
  // Data
  blog: PropTypes.object,
  posts: PropTypes.array,
  // Injected by React Redux
  // errorMessage: PropTypes.string,
  // Injected by React Router
  actions: PropTypes.object.isRequired,
}
