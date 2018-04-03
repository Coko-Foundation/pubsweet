import Authsome from 'authsome'
import { connect } from 'react-redux'
import config from 'config'
import {
  selectCollection,
  selectFragment,
  selectTeam,
  selectUser,
} from '../selectors'

// higher order component to inject authsome into a component
export default function withAuthsome() {
  const authsome = new Authsome(
    { ...config.authsome, mode: require(config.authsome.mode) },
    {},
  )

  function mapState(state) {
    authsome.context = {
      // fetch entities from store instead of database
      models: {
        Collection: { find: id => selectCollection(state, { id }) },
        Fragment: { find: id => selectFragment(state, { id }) },
        Team: { find: id => selectTeam(state, { id }) },
        User: { find: id => selectUser(state, { id }) },
      },
    }

    return { authsome }
  }

  return connect(mapState)
}
