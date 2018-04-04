import React from 'react'
import PropTypes from 'prop-types'

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
        <p>No blogpost has been published on {this.props.blog.title} yet.</p>
      )
    }

    return (
      <div>
        <h1>Welcome to {this.props.blog && this.props.blog.title}</h1>
        <p>Science for the Web</p>
        <div>{posts}</div>
        <p>
          Powered by{' '}
          <a href="https://gitlab.coko.foundation/pubsweet">PubSweet</a>
        </p>
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
