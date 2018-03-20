import { pick, throttle, defaultsDeep } from 'lodash'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { reduxForm, SubmissionError } from 'redux-form'
import { withLoader } from 'pubsweet-client'
import uploadFile from 'xpub-upload'
import Submit from './Submit'

const fragmentFields = `
  id
  metadata {
    title
    abstract
    authors
    keywords
    articleType
    articleSection
  }
  declarations {
    openData
    previouslySubmitted
    openPeerReview
    streamlinedReview
    researchNexus
    preregistered
  }
  suggestions {
    reviewers {
      suggested
      opposed
    }
    editors {
      suggested
      opposed
    }
  }
  notes {
    fundingAcknowledgement
    specialInstructions
  }
  files {
    manuscript {
      name
      type
      size
      url
    }
    supplementary {
      name
      type
      size
      url
    }
  }
`

const query = gql`
  query($id: ID) {
    collection(id: $id) {
      id
      fragments {
        ${fragmentFields}
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

const updateMutation = gql`
  mutation($id: ID, $input: String) {
    updateFragment(id: $id, input: $input) {
      id
      ${fragmentFields}
    }
  }
`

const submitMutation = gql`
  mutation(
    $fragmentId: ID
    $fragmentInput: String
    $collectionId: ID
    $collectionInput: String
  ) {
    updateFragment(id: $fragmentId, input: $fragmentInput) {
      id
      submitted
    }

    updateCollection(id: $collectionId, input: $collectionInput) {
      id
      status
    }
  }
`

// TODO: deep-clone values instead of mutating it?
const prepareValuesForUpdate = values => {
  values.metadata.title = stripHtml(values.metadata.title)
  return values
}

// TODO: this is only here because prosemirror would save the title in the
// metadata as html instead of plain text. we need to maybe find a better
// position than here to perform this operation
const stripHtml = htmlString => {
  const temp = document.createElement('span')
  temp.innerHTML = htmlString
  return temp.textContent
}

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

const stripNullsDeep = object => {
  const output = {}

  Object.entries(object).forEach(([key, value]) => {
    if (value !== null) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        output[key] = stripNullsDeep(value)
      } else {
        output[key] = value
      }
    }
  })

  return output
}

export default compose(
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        id: match.params.project,
      },
    }),
  }),
  graphql(updateMutation, {
    props: ({ mutate, ownProps }) => {
      const updateFragment = rawValues => {
        const values = prepareValuesForUpdate(rawValues)

        mutate({
          variables: {
            id: ownProps.match.params.version,
            input: JSON.stringify(values),
          },
        })
      }

      return {
        // TODO: do this on blur, rather than on every keystroke?
        onChange: throttle(updateFragment, 3000, { trailing: false }),
      }
    },
  }),
  graphql(submitMutation, {
    props: ({ mutate }) => ({
      onSubmit: (rawValues, dispatch, { history, project, version }) => {
        const values = prepareValuesForUpdate({
          ...rawValues,
          submitted: new Date(),
        })

        mutate({
          variables: {
            fragmentId: version.id,
            fragmentInput: JSON.stringify(values),
            collectionId: project.id,
            collectionInput: JSON.stringify({ status: 'submitted' }),
          },
        })
          .then(() => {
            history.push('/')
          })
          .catch(error => {
            if (error.validationErrors) {
              throw new SubmissionError()
            }
          })
      },
    }),
  }),
  withLoader(),
  withProps(({ collection, currentUser }) => ({
    project: collection,
    version: collection.fragments[0],
    uploadFile,
  })),
  withProps(({ version }) => {
    const paths = ['metadata', 'declarations', 'suggestions', 'notes', 'files']
    const initialValues = defaultsDeep(
      stripNullsDeep(omitSpecialKeysDeep(pick(version, paths))),
      {
        metadata: {
          title: '',
          abstract: '',
          articleType: '',
          articleSection: [],
          authors: [],
          keywords: [],
        },
        suggestions: {
          reviewers: {
            suggested: [],
            opposed: [],
          },
          editors: {
            suggested: [],
            opposed: [],
          },
        },
      },
    )
    return {
      initialValues,
      readonly: !!version.submitted,
    }
  }),
  reduxForm({
    // enableReinitialize: true,
    form: 'submit',
  }),
  withState('confirming', 'setConfirming', false),
  withHandlers({
    toggleConfirming: ({ valid, setConfirming, handleSubmit }) => () => {
      if (valid) {
        setConfirming(confirming => !confirming)
      } else {
        // trigger dummy submit to mark all fields as touched
        handleSubmit(() => {})()
      }
    },
  }),
)(Submit)
