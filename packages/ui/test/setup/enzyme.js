import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from '@testing-library/react'

Enzyme.configure({ adapter: new Adapter() })
configure({
  testIdAttribute: 'data-test-id',
})
