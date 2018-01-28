import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import path from 'path'

Enzyme.configure({ adapter: new Adapter() })

process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '..', 'config')
