import React from 'react'
import { Grid, Alert } from 'react-bootstrap'
import BlogpostList from '../components/BlogpostList'
import BlogpostCreator from '../components/BlogpostCreator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../scss/components/_manage'
import * as Actions from '../actions'

class PostsManager extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { blog, blogposts, actions, error } = this.props
    return (
      <div className='bootstrap'>
        <Grid>
          { error ? <Alert bsStyle='warning'>{error}</Alert> : null}
          <h3 className={styles['header']}>{blog && blog.title} blog posts</h3>
          <BlogpostList
            update={actions.updateFragment}
            delete={actions.deleteFragment}
            blogposts={blogposts} />
          <BlogpostCreator create={actions.createFragment} />
        </Grid>
      </div>
    )
  }
}

PostsManager.propTypes = {
  blog: React.PropTypes.object.isRequired,
  blogposts: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  error: React.PropTypes.object
}

function mapState (state) {
  return {
    blog: state.collections[0],
    blogposts: state.fragments,
    error: state.error
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapState,
  mapDispatch
)(PostsManager)
