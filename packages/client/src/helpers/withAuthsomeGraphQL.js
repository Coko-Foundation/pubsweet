import Authsome from 'authsome'
import config from 'config'
import React from 'react'
import { ApolloConsumer } from 'react-apollo'

// import {
//   selectCollection,
//   selectFragment,
//   selectTeam,
//   selectUser,
// } from '../selectors'

import {
  // CURRENT_USER,
  GET_USER,
  GET_COLLECTION,
  GET_FRAGMENT,
  GET_TEAM,
} from './AuthorizeGraphQLQueries'

const getDataFromQuery = async (client, query, field) => {
  const { data } = await client.query(query)
  return data[field]
}

// higher order component to inject authsome into a component
function withAuthsomeGraphQL(props) {
  const authsome = new Authsome(
    { ...config.authsome, mode: require(config.authsome.mode) },
    {},
  )

  authsome.context = {
    models: {
      User: {
        find: async id =>
          getDataFromQuery(
            props.client,
            {
              query: GET_USER,
              variables: { id },
            },
            'user',
          ),
      },
      Collection: {
        find: async id =>
          getDataFromQuery(
            props.client,
            {
              query: GET_COLLECTION,
              variables: { id },
            },
            'collection',
          ),
      },
      Team: {
        find: async id =>
          getDataFromQuery(
            props.client,
            {
              query: GET_TEAM,
              variables: { id },
            },
            'team',
          ),
      },
      Fragment: {
        find: async id =>
          getDataFromQuery(
            props.client,
            {
              query: GET_FRAGMENT,
              variables: { id },
            },
            'fragment',
          ),
      },
    },
  }

  return { authsome }
}

export default props => (
  <ApolloConsumer>
    {client => <withAuthsomeGraphQL {...props} client={client} />}
  </ApolloConsumer>
)
