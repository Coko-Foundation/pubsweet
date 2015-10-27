import React from 'react'
import { Grid } from 'react-bootstrap'
import BlogpostList from '../components/BlogpostList'
import BlogpostCreator from '../components/BlogpostCreator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../scss/components/_manage'
import * as Actions from '../actions'

class BlogManager extends React.Component {
  render () {
    const { blog, blogposts, actions } = this.props
    return (
      <Grid>
        <div blog={blog} className={styles.vote}>
          <BlogpostCreator create={actions.createFragment} />
          <BlogpostList actions={actions} blogposts={blogposts} />
        </div>
      </Grid>
    )
  }
}

BlogManager.propTypes = {
  blog: React.PropTypes.object.isRequired,
  blogposts: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    blog: state.collections[0],
    blogposts: state.fragments
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
)(BlogManager)
