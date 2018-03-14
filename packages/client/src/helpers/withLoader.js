import React from 'react'
import PropTypes from 'prop-types'

export default () => WrappedComponent => {
  const Wrapper = ({
    data: { loading, error, ...apolloProps },
    ...parentProps
  }) => {
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    return <WrappedComponent {...parentProps} {...apolloProps} />
  }

  Wrapper.propTypes = {
    data: PropTypes.object,
  }

  return Wrapper
}
