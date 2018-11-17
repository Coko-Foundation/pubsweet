import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'
import { cloneDeep } from 'lodash'

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
    fileType
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
        fileType
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
  decision
  teams {
    id
    name
    teamType
    object {
      objectId
      objectType
    }
    objectType
    members {
      id
      username
    }
    status {
      id
      status
    }
  }
  status
`

const teamFields = `
  id
  role
  teamType
  name
  object {
    objectId
  }
  objectType
  members {
    id
    username
  }
  status {
    id
    status
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
          team.teamType === 'reviewerEditor' &&
          team.object.objectId === manuscript.id &&
          team.object.objectType === 'Manuscript',
      ) || {}

    // Temporary solution until new Team model is back
    const mem = cloneDeep(reviewerTeams.members)
    mem.map(member => {
      const status = reviewerTeams.status.find(
        status => status.id === member.id,
      )
      member.status = (status || {}).status
      return member
    })
    return {
      reviewers: mem || [],
      journal: { id: journal },
      reviewerUsers: users,
      Reviewer: ReviewerContainer,
      ReviewerForm: ReviewerFormContainer,
    }
  }),
)(Reviewers)
