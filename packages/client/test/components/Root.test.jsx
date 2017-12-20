import React from 'react'
import { shallow } from 'enzyme'
import { themr } from 'react-css-themr'
import createHistory from 'history/createBrowserHistory'

global.PUBSWEET_COMPONENTS = []

const Root = require('../../src/components/Root').default
const configureStore = require('../../src/store/configureStore')

const history = createHistory()
const store = configureStore(history, {})

const themeObj = { ThemedComponent: { testClass: 'mappedClassName' } }

const ThemedComponent = themr('ThemedComponent')(({ theme }) => (
  <div className={theme.testClass} />
))

function makeWrapper(props = {}) {
  return shallow(
    <Root
      history={history}
      routes={<ThemedComponent />}
      store={store}
      theme={themeObj}
      {...props}
    />,
  )
}

describe('<Root/>', () => {
  it('Adds a theme to context', async () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toBe('<div class="mappedClassName"></div>')
  })
})
