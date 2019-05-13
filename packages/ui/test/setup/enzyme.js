import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'react-testing-library'

Enzyme.configure({ adapter: new Adapter() })
configure({
  testIdAttribute: 'data-test-id',
})
