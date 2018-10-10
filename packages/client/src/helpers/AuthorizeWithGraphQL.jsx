import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import Authsome from 'authsome'
import config from 'config'

import {
  CURRENT_USER,
  GET_USER,
  GET_COLLECTION,
  GET_FRAGMENT,
  GET_TEAM,
} from './AuthorizeGraphQLQueries'
import { Authorize } from './Authorize'

const getDataFromQuery = async (client, query, field) => {
  const { data } = await client.query(query)
  return data[field]
}

export class AuthorizeWithGraphQL extends Authorize {
  async checkAuth({ authsome, operation, object }) {
    authsome.context = {
      models: {
        User: {
          find: async id =>
            getDataFromQuery(
              this.props.client,
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
              this.props.client,
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
              this.props.client,
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
              this.props.client,
              {
                query: GET_FRAGMENT,
                variables: { id },
              },
              'fragment',
            ),
        },
      },
    }
    try {
      const currentUser = await getDataFromQuery(
        this.props.client,
        {
          query: CURRENT_USER,
        },
        'currentUser',
      )
      const authorized = await authsome.can(
        currentUser && currentUser.id,
        operation,
        object,
      )
      this.setState({
        authorized,
      })
    } catch (err) {
      console.error(err)
    }
  }
}

const AuthorizeWithGraphQLWrapper = props => {
  let authsome
  if (!props.authsome) {
    authsome = new Authsome(
      { ...config.authsome, mode: require(config.authsome.mode) },
      {},
    )
  }

  return (
    <ApolloConsumer>
      {client => (
        <AuthorizeWithGraphQL authsome={authsome} {...props} client={client} />
      )}
    </ApolloConsumer>
  )
}

export default AuthorizeWithGraphQLWrapper
