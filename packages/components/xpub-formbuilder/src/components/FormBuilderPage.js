import { compose, withState, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'

import FormBuilderLayout from './FormBuilderLayout'

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
  // connect(
  //   state => {
  //     const { error } = state
  //     const { forms } = state.forms

  //     return { error, forms: forms.forms }
  //   },
  //   (dispatch, { history }) => ({
  //     deleteForm: form => dispatch(deleteForms(form)),
  //     deleteElement: (form, element) => dispatch(deleteElements(form, element)),
  //     updateForm: (form, formProperties) =>
  //       dispatch(updateForms(form, formProperties)),
  //     createForm: formProperties => dispatch(createForms(formProperties)),
  //     updateElements: (form, formElements) =>
  //       dispatch(updateElements(form, formElements)),
  //   }),
  // ),
  withLoader(),
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
