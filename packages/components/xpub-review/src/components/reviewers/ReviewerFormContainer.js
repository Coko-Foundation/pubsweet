import { compose, withHandlers } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import ReviewerForm from './ReviewerForm'

const fragmentFields = `
  created
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
`

const updateMutation = gql`
  mutation($id: ID!, $input: String) {
    updateManuscript(id: $id, input: $input) {
      id
      ${fragmentFields}
    }
  }
`

const handleSubmit = (manuscript, { props }) => {
  props.updateMutation({
    variables: {
      id: manuscript.id,
      input: JSON.stringify(manuscript),
    },
  })
}

const loadOptions = props => input => {
  const options = props.reviewerUsers

  return Promise.resolve({ options })
}

export default compose(
  graphql(updateMutation, { name: 'updateMutation' }),
  withHandlers({
    loadOptions: props => loadOptions(props),
  }),
  withFormik({
    initialValues: {},
    mapPropsToValues: ({ manuscript }) => manuscript,
    displayName: 'reviewers',
    handleSubmit,
  }),
)(ReviewerForm)
