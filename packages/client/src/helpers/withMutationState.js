import React from 'react'

export default ({ name = 'mutate' } = {}) => WrappedComponent =>
  class extends React.Component {
    state = { loading: false, error: null, result: null }

    loadingProperty = `${name}Loading`
    errorProperty = `${name}Error`
    resultProperty = `${name}Result`

    executeMutation(options) {
      this.setState({
        loading: true,
        error: null,
        result: null,
      })
      return this.props[name](options)
        .then(result => {
          this.setState({
            loading: false,
            error: null,
            result,
          })
        })
        .catch(error => {
          this.setState({
            loading: false,
            error: error.message,
            result: null,
          })
        })
    }

    render() {
      const props = {
        ...this.props,
        [name]: this.executeMutation.bind(this),
        [this.loadingProperty]: this.state.loading,
        [this.errorProperty]: this.state.error,
        [this.resultProperty]: this.state.result,
      }
      return <WrappedComponent {...props} />
    }
  }
