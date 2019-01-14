import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withLoader } from 'pubsweet-client'

import AdminLayout from '../AdminLayout'
import withSimpleForm from '../withSimpleForm'
import FormBuilderLayout from './FormBuilderLayout'

const updateFormElements = gql`
  mutation($form: String!, $formId: String!) {
    updateFormElements(form: $form, formId: $formId)
  }
`

const deleteFormElement = gql`
  mutation($formId: ID!, $elementId: ID!) {
    deleteFormElement(formId: $formId, elementId: $elementId)
  }
`

const query = gql`
  query {
    currentUser {
      id
      username
      admin
    }

    getForms
  }
`

export default compose(
  graphql(query),
  graphql(deleteFormElement, {
    name: 'deleteFormElement',
  }),
  graphql(updateFormElements, {
    name: 'updateFormElements',
  }),
  withLoader(),
  withSimpleForm(AdminLayout),
  withProps(props => ({
    deleteElement: (formId, elementId) =>
      props.deleteFormElement({
        variables: {
          formId,
          elementId,
        },
      }),
    updateElements: (form, formElements) =>
      props.updateFormElements({
        variables: {
          form: JSON.stringify(formElements),
          formId: form.id,
        },
      }),
  })),
)(FormBuilderLayout)
