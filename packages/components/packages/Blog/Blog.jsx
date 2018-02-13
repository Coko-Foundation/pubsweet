import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'

import 'pubsweet-component-manage/Manage.scss'
import styles from './Blog.local.scss'

import Summary from './Summary'

const Blog = ({ blogs: [blog], posts }) => {
  let displayPosts = posts
    .filter(fragment => fragment.published)
    .map(fragment => <Summary fragment={fragment} key={fragment.id} />)

  if (displayPosts.length === 0 && blog) {
    displayPosts = (
      <Row>
        <Col md={8} mdOffset={2}>
          <p>No blogpost has been published on {blog.title} yet.</p>
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
              <h1>Welcome to {blog && blog.title}</h1>
              <label>Science for the Web</label>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <div className={styles.blogContainer}>{displayPosts}</div>
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

Blog.propTypes = {
  blogs: PropTypes.array,
  posts: PropTypes.array,
}

export default Blog
