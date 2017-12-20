import React from 'react'
import PropTypes from 'prop-types'

import './HTML.scss'

export default class HTML extends React.Component {
  constructor(props) {
    super(props)
    this.props.actions.getCollections().then(result =>
      this.props.actions.getFragment(result.collections[0], {
        id: this.props.id,
      }),
    )
  }

  render() {
    const { fragment } = this.props

    if (fragment) {
      return (
        <div
          className="fragment"
          dangerouslySetInnerHTML={{ __html: fragment.presentation }}
        />
      )
    }
    return <div>No fragment found</div>
  }
}

HTML.propTypes = {
  // Data
  fragment: PropTypes.object,
  id: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
}
