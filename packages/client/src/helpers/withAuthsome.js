import Authsome from 'authsome'
import { connect } from 'react-redux'
import config from 'config'

const mode = require(config.authsome.mode)

// higher order component to inject authsome into a component
export default function withAuthsome() {
  const authsome = new Authsome({ ...config.authsome, mode }, {})

  function mapState(state) {
    authsome.context = {
      // fetch entities from store instead of database
      models: {
        Collection: {
          find: id =>
            state.collections.find(collection => collection.id === id),
        },
        Fragment: {
          find: id => state.fragments[id],
        },
        Team: {
          find: id => state.teams.find(team => team.id === id),
        },
        User: {
          find: id => {
            return state.users.users.find(user => user.id === id)
          },
        },
      },
    }

    return { authsome }
  }

  return connect(mapState)
}
