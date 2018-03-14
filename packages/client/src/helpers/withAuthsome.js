import React from 'react'
import Authsome from 'authsome'
import { withApollo } from 'react-apollo'
import config from 'config'
import { gql } from 'apollo-client-preset'

const mode = require(config.authsome.mode)

// TODO these fragment queries will need fleshing out according to the needs of the mode
const collectionData = gql`
  fragment collectionData on Collection {
    id
  }
`
const fragmentData = gql`
  fragment fragmentData on Fragment {
    id
  }
`
const teamData = gql`
  fragment teamData on Team {
    id
  }
`
const userData = gql`
  fragment userData on User {
    id
    username
    email
    admin
    teams {
      id
    }
  }
`

// higher order component to inject authsome into a component
function withAuthsome() {
  const authsome = new Authsome({ ...config.authsome, mode }, {})

  return Component =>
    withApollo(({ client, ...props }) => {
      authsome.context = {
        // fetch entities from cache instead of database
        models: {
          Collection: {
            find: id =>
              client.readFragment({
                id: `Collection:${id}`,
                fragment: collectionData,
              }),
          },
          Fragment: {
            find: id =>
              client.readFragment({
                id: `Fragment:${id}`,
                fragment: fragmentData,
              }),
          },
          Team: {
            find: id =>
              client.readFragment({ id: `Team:${id}`, fragment: teamData }),
          },
          User: {
            find: id =>
              client.readFragment({ id: `User:${id}`, fragment: userData }),
          },
        },
      }

      return <Component authsome={authsome} {...props} />
    })
}

export default withAuthsome
