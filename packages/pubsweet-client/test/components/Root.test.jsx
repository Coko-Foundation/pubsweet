import React from 'react'
import { shallow } from 'enzyme'
import { themr } from 'react-css-themr'
import createHistory from 'history/createBrowserHistory'

global.PUBSWEET_COMPONENTS = []

const Root = require('../../src/components/Root').default
const configureStore = require('../../src/store/configureStore')

const history = createHistory()
const store = configureStore(history, {})

const theme = { ThemedComponent: {testClass: 'mappedClassName'} }

const ThemedComponent = themr('ThemedComponent')(({ theme }) => (
  <div className={theme.testClass}></div>
))

function makeWrapper(props = {}) {
  return shallow(
    <Root
      store={store}
      history={history}
      routes={<ThemedComponent />}
      theme={theme}
      {...props}
    />
  )
}

describe('<Root/>', () => {
  it('Adds a theme to context', async () => {
    const wrapper = makeWrapper({ theme })
    expect(wrapper.html()).toBe('<div class="mappedClassName"></div>')
  })
})
