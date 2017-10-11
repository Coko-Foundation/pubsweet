import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'

let initialState = {}
const store = createStore(
    state => state,
    initialState,
    applyMiddleware(thunk)
)

const Wrapper = ({children}) => (
    <BrowserRouter>
      <Provider store={store}>
        {children}
      </Provider>
    </BrowserRouter>
)

Wrapper.propTypes = {
  children: PropTypes.node
}

export default Wrapper
