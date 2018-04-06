import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'
import { newestFirst } from 'xpub-selectors'
import { cloneDeep } from 'lodash'
import Dashboard from '../Dashboard'
import upload from '../../lib/upload'

const query = gql`
  {
    collections {
      id
      rev
      type
      created
      title
      status
      owners {
        id
        username
      }
      reviewers {
        id
        user
      }
      fragments {
        id
        rev
        created
        source
        type
        version
        submitted
        metadata {
          title
          abstract
          articleType
          articleSection
          authors
        }
        reviewers {
          id
          reviewer
          status
          _reviewer {
            id
            user
          }
          _user {
            id
          }
        }
        declarations {
          openPeerReview
        }
      }
    }
    currentUser {
      user {
        id
        username
        admin
      }
    }
  }
`

const deleteProjectMutation = gql`
  mutation($id: ID) {
    deleteCollection(id: $id) {
      id
    }
  }
`

const updateReviewerMutation = gql`
  mutation($id: ID, $input: String) {
    updateFragment(id: $id, input: $input) {
      id
      reviewers {
        id
        reviewer
        status
        _reviewer {
          id
          user
        }
        _user {
          id
        }
      }
    }
  }
`

export default compose(
  graphql(query),
  graphql(deleteProjectMutation, {
    props: ({ mutate }) => ({
      deleteProject: project => mutate({ variables: { id: project.id } }),
    }),
    options: {
      update: (
        proxy,
        {
          data: {
            deleteCollection: { id },
          },
        },
      ) => {
        const data = proxy.readQuery({ query })
        const collectionIndex = data.collections.findIndex(col => col.id === id)
        if (collectionIndex > -1) {
          data.collections.splice(collectionIndex, 1)
          proxy.writeQuery({ query, data })
        }
      },
    },
  }),
  graphql(updateReviewerMutation, {
    props: ({ mutate }) => ({
      reviewerResponse: (version, reviewId, status) => {
        const reviewers = cloneDeep(version.reviewers)
        const reviewer = reviewers.find(reviewer => reviewer.id === reviewId)
        reviewer.status = status
        return mutate({
          variables: {
            id: version.id,
            input: JSON.stringify({ reviewers, rev: version.rev }),
          },
        })
      },
    }),
  }),
  withLoader(),
  withProps(({ collections, currentUser }) => {
    const sortedCollections = newestFirst(collections)

    const dashboard = {
      editor: sortedCollections.filter(
        collection =>
          collection.status === 'submitted' || collection.status === 'revising',
      ),
      owner: sortedCollections.filter(
        collection =>
          currentUser &&
          collection.owners &&
          collection.owners.some(owner => owner.id === currentUser.user.id),
      ),
      reviewer: sortedCollections.filter(
        collection =>
          currentUser &&
          collection.reviewers &&
          collection.reviewers.some(
            reviewer => reviewer && reviewer.user === currentUser.user.id,
          ),
      ),
    }

    return {
      currentUser: currentUser.user,
      dashboard,
    }
  }),
  upload,
)(Dashboard)
