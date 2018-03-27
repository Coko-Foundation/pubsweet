import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { JournalProvider } from 'xpub-journal'
import * as journal from 'xpub-styleguide/src/config/journal'
import styled, { ThemeProvider } from 'styled-components'
import ErrorBoundary from './ErrorBoundary'
import { currentTheme, themes, componentStore } from './StyleGuideRenderer'

const rootReducer = combineReducers({
  form: formReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const Root = styled.div``

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      themeName: currentTheme.name,
    }
  }
  componentDidMount() {
    componentStore.addComponent(this)
  }
  componentWillUnmount() {
    componentStore.removeComponent(this)
  }
  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider theme={themes[this.state.themeName]}>
            <JournalProvider journal={journal}>
              <Router>
                <Root>{this.props.children}</Root>
              </Router>
            </JournalProvider>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    )
  }
}

export default Wrapper
