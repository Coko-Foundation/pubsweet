import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { th } from '@pubsweet/ui'

const ErrorMessage = styled.div`
  color: ${th('colorError')};
`

const LoadingMessage = styled.div.attrs({
  children: 'loading…',
})`
  display: flex;
  justify-content: center;
`

const ConnectPage = requirements => WrappedComponent => {
  class ConnectedComponent extends React.Component {
    state = {
      complete: false,
      error: null,
      fetching: false,
    }

    componentDidMount = () => {
      this.fetch()
    }

    componentWillReceiveProps = nextProps => {
      // this.fetch(nextProps)
    }

    fetch() {
      if (this.state.fetching) {
        return
      }

      this.setState({
        fetching: true,
        complete: false,
      })

      const requests = requirements(this.props).map(this.props.dispatch)

      Promise.all(requests)
        .then(() => {
          this.setState({
            fetching: false,
            complete: true,
          })
        })
        .catch(error => {
          console.error(error)

          this.setState({
            error: error.message,
          })

          throw error // rethrow
        })
    }

    render() {
      const { complete, error } = this.state

      if (error) return <ErrorMessage>{error}</ErrorMessage>

      if (!complete) return <LoadingMessage />

      if (!this.props.isAuthenticated) return <div>Not authenticated</div>

      return <WrappedComponent {...this.props} />
    }
  }

  return compose(
    withRouter,
    connect(state => ({
      isAuthenticated: state.currentUser.isAuthenticated,
    })),
  )(ConnectedComponent)
}

export default ConnectPage
