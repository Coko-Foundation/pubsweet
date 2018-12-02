import { throttle, cloneDeep, isEmpty } from 'lodash'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withFormik } from 'formik'
import { withLoader } from 'pubsweet-client'
import Submit from './Submit'

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
      content
    }
    user {
      identities {
        ... on Local {
          name {
            surname
          }
        }
      }
    }
  }
  teams {
    id
    role
    members {
      status
      user {
        id
        username
        identities {
          ... on Local {
            name {
              surname
            }
          }
        }
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
  authors {
    firstName
    lastName
    email
    affiliation
  }
`

const query = gql`
  query($id: ID!, $form: String!) {
    currentUser {
      id
      username
      admin
    }

    manuscript(id: $id) {
      ${fragmentFields}
      manuscriptVersions {
        ${fragmentFields}
      }
    }

    getFile(form: $form)
  }
`

const updateMutation = gql`
  mutation($id: ID!, $input: String) {
    updateManuscript(id: $id, input: $input) {
      id
      ${fragmentFields}
    }
  }
`

const uploadSuplementaryFilesMutation = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      id
      created
      filename
      label
      size
      mimeType
      url
    }
  }
`

const omitSpecialKeysDeep = object => {
  const output = {}

  Object.entries(object).forEach(([key, value]) => {
    if (!key.startsWith('_')) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        output[key] = omitSpecialKeysDeep(value)
      } else {
        output[key] = value
      }
    }
  })

  return output
}

const createObject = (key, value) => {
  const obj = {}
  const parts = key.split('.')
  if (parts.length === 1) {
    obj[parts[0]] = value
  } else if (parts.length > 1) {
    // concat all but the first part of the key
    const remainingParts = parts.slice(1, parts.length).join('.')
    obj[parts[0]] = createObject(remainingParts, value)
  }
  return obj
}

// const stripNullsDeep = object => {
//   const output = {}

//   Object.entries(object).forEach(([key, value]) => {
//     if (value !== null) {
//       if (typeof value === 'object' && !Array.isArray(value)) {
//         output[key] = stripNullsDeep(value)
//       } else {
//         output[key] = value
//       }
//     }
//   })

//   return output
// }

export default compose(
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        id: match.params.version,
        form: 'submit',
      },
    }),
    props: ({ data }) => ({ data }),
  }),
  graphql(uploadSuplementaryFilesMutation, {
    props: ({ mutate, ownProps }) => ({
      uploadFile: file => {
        mutate({
          variables: {
            file,
          },
          update: (proxy, { data: { upload } }) => {
            const { manuscript } = cloneDeep(ownProps.data)
            manuscript.files.push(
              Object.assign({}, { ...upload }, { type: 'supplementary' }),
            )
            proxy.writeQuery({
              query: gql`
              query($id: ID!) {
                manuscript(id: $id) {
                  ${fragmentFields}
                }
              }
              `,
              variables: {
                id: ownProps.match.params.version,
              },
              data: { manuscript },
            })
          },
        })
      },
    }),
  }),
  graphql(updateMutation, {
    props: ({ mutate, ownProps }) => {
      const updateManuscript = (value, path) => {
        mutate({
          variables: {
            id: ownProps.match.params.version,
            input: JSON.stringify(createObject(path, value)),
          },
          update: (proxy, { data: { updateManuscript } }) => {
            proxy.writeQuery({
              query: gql`
              query($id: ID!) {
                manuscript(id: $id) {
                  ${fragmentFields}
                }
              }
              `,
              variables: {
                id: ownProps.match.params.version,
              },
              data: { manuscript: updateManuscript },
            })
          },
        })
      }

      return {
        // TODO: do this on blur, rather than on every keystroke?
        onChange: throttle(updateManuscript, 1000, { trailing: false }),
      }
    },
  }),
  graphql(updateMutation, {
    props: ({ mutate, ownProps }) => ({
      onSubmit: (manuscript, { history }) => {
        const data = cloneDeep(manuscript)
        data.status = 'submitted'
        mutate({
          variables: {
            id: ownProps.match.params.version,
            input: JSON.stringify(data),
          },
          update: (proxy, { data: { updateManuscript } }) => {
            proxy.writeQuery({
              query: gql`
              query($id: ID!) {
                manuscript(id: $id) {
                  ${fragmentFields}
                }
              }
              `,
              variables: {
                id: ownProps.match.params.version,
              },
              data: { manuscript: data },
            })
          },
        }).then(() => {
          history.push('/')
        })
      },
    }),
  }),
  withLoader(),
  withProps(({ getFile, manuscript, match: { params: { journal } } }) => ({
    journal: { id: journal },
    forms: cloneDeep(getFile),
  })),
  withFormik({
    initialValues: {},
    mapPropsToValues: ({ manuscript }) => manuscript,
    displayName: 'submit',
    handleSubmit: (props, { props: { onSubmit, history } }) =>
      onSubmit(props, { history }),
  }),
  withState('confirming', 'setConfirming', false),
  withHandlers({
    toggleConfirming: ({ validateForm, setConfirming, handleSubmit }) => () => {
      validateForm().then(
        props =>
          isEmpty(props)
            ? setConfirming(confirming => !confirming)
            : handleSubmit(),
      )
    },
  }),
)(Submit)
