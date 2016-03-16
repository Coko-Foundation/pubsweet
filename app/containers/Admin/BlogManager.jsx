import React from 'react'
import { Grid, Alert } from 'react-bootstrap'
import BlogpostList from '../../components/Admin/BlogpostList'
import BlogpostCreator from '../../components/Admin/BlogpostCreator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../../scss/components/_manage'
import * as Actions from '../../actions'

class BlogManager extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { blog, blogposts, actions, error } = this.props
    return (
      <div className='bootstrap'>
        <Grid>
          { error ? <Alert bsStyle='warning'>{error}</Alert> : null}
          <div blog={blog} className={styles.vote}>
            <BlogpostList
              update={actions.updateFragment}
              delete={actions.deleteFragment}
              blogposts={blogposts} />
            <BlogpostCreator create={actions.createSubstanceDocument} />
          </div>
        </Grid>
      </div>
    )
  }
}

BlogManager.propTypes = {
  blog: React.PropTypes.object.isRequired,
  blogposts: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  error: React.PropTypes.object
}

function mapStateToProps (state) {
  return {
    blog: state.collections[0],
    blogposts: state.fragments,
    error: state.error
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
