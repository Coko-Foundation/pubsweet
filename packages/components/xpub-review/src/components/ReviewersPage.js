import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'

import Reviewers from '../components/reviewers/Reviewers'
import ReviewerFormContainer from '../components/reviewers/ReviewerFormContainer'
import ReviewerContainer from '../components/reviewers/ReviewerContainer'

const fragmentFields = `
  id
  created
  files {
    id
    created
    label
    filename
    mimeType
    type
    size
    url
  }
  reviews {
    open
    recommendation
    created
    comments {
      type
      content
      files {
        type
        id
        label
        url
        filename
      }
    }
    user {
      id
      username
    }
  }
  decision {
    status
    created
    comments {
      type
      content
      files {
        type
        id
        label
        url
        filename
      }
    }
    user {
      id
      username
    }
  }
  teams {
    id
    role
    object {
      id
    }
    objectType
    members {
      status
      user {
        id
        username
      }
    }
  }
  status
  meta {
    title
    abstract
    declarations {
      openData
      openPeerReview
      preregistered
      previouslySubmitted
      researchNexus
      streamlinedReview
    }
    articleSections
    articleType
    history {
      type
      date
    }
    notes {
      id
      created
      notesType
      content
    }
    keywords
  }
  suggestions {
    reviewers {
      opposed
      suggested
    }
    editors {
      opposed
      suggested
    }
  }
`

const teamFields = `
  id
  role
  name
  object {
    id
  }
  objectType
  members {
    status
    user {
      id
      username
    }
  }
`

const query = gql`
  query($id: ID!) {
    currentUser {
      id
      username
      admin
    }

    users {
      id
      username
      admin
    }

    teams {
      ${teamFields}
    }

    manuscript(id: $id) {
      ${fragmentFields}
    }
  }
`

export default compose(
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        id: match.params.version,
      },
    }),
  }),
  withLoader(),
  withProps(({ manuscript, teams, users, match: { params: { journal } } }) => {
    const reviewerTeams =
      manuscript.teams.find(
        team =>
          team.role === 'reviewerEditor' &&
          team.object.id === manuscript.id &&
          team.objectType === 'manuscript',
      ) || {}

    return {
      reviewers: reviewerTeams.members || [],
      journal: { id: journal },
      reviewerUsers: users,
      Reviewer: ReviewerContainer,
      ReviewerForm: ReviewerFormContainer,
    }
  }),
)(Reviewers)
