import React from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Summary from './Summary'

const GET_POSTS = gql`
  {
    collections {
      title
      fragments {
        id
        title
        source
        published
        created
        owners {
          id
          username
        }
      }
    }
  }
`

const Blog = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      // Only works in the simplest case of 1 collection
      const collection = data.collections[0]

      let posts = collection.fragments
        .filter(post => post.published)
        .map(post => <Summary fragment={post} key={post.id} />)

      if (posts.length === 0 && this.props.blog) {
        posts = (
          <p>No blogpost has been published on {this.props.blog.title} yet.</p>
        )
      }

      return (
        <div>
          <h1>Welcome to {collection.title}</h1>
          <p>Science for the Web</p>
          {posts}
          Powered by{' '}
          <a href="https://gitlab.coko.foundation/pubsweet">PubSweet</a>
        </div>
      )
    }}
  </Query>
)

export default Blog
