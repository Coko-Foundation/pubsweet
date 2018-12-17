import { compose, withState, withHandlers, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withLoader } from 'pubsweet-client'

import FormBuilderLayout from './FormBuilderLayout'

const createForm = gql`
  mutation($form: String!) {
    createForm(form: $form)
  }
`

const updateForm = gql`
  mutation($form: String!, $id: String!) {
    updateForm(form: $form, id: $id)
  }
`

const updateFormElements = gql`
  mutation($form: String!, $id: ID!) {
    deleteFormElements(form: $form, id: $id)
  }
`

const deleteFormElements = gql`
  mutation($formId: ID!, $elementId: ID!) {
    deleteFormElements(formId: $formId, elementId: $elementId)
  }
`

const deleteForms = gql`
  mutation($formId: ID!) {
    deleteForms(formId: $formId)
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
  graphql(deleteForms, {
    name: 'deleteForms',
  }),
  graphql(deleteFormElements, {
    name: 'deleteFormElements',
  }),
  graphql(updateForm, {
    name: 'updateForm',
  }),
  graphql(createForm, {
    name: 'createForm',
  }),
  graphql(updateFormElements, {
    name: 'updateFormElements',
  }),
  withLoader(),
  withProps(props => ({
    // deleteForm: form => dispatch(deleteForms(form)),
    // deleteElement: (form, element) => dispatch(deleteElements(form, element)),
    updateForm: (form, formProperties) =>
      props.updateForm({
        variables: {
          form: JSON.stringify(formProperties),
          id: form.id,
        },
      }),
    createForm: formProperties =>
      props.createForm({
        variables: {
          form: JSON.stringify(formProperties),
        },
      }),
    // updateElements: (form, formElements) =>
    //   dispatch(updateElements(form, formElements)),
  })),
  withState('properties', 'onChangeProperties', ({ getForms }) => ({
    type: 'form',
    properties: getForms[0] || {},
  })),
  withState(
    'activeTab',
    'onChangeTab',
    ({ getForms, activeTab }) => (getForms.length === 0 ? 'new' : 0),
  ),
  withHandlers({
    changeProperties: ({
      onChangeProperties,
      getForms,
      activeTab,
    }) => properties =>
      onChangeProperties(
        () =>
          Object.assign({}, properties, {
            id: (getForms[activeTab] || {}).id,
          }) || undefined,
      ),
    changeTabs: ({ onChangeTab }) => activeTab => {
      onChangeTab(() => activeTab || '')
    },
  }),
)(FormBuilderLayout)
