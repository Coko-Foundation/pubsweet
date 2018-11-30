import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'

// import config from 'config'
import { ConnectPage } from 'xpub-connect'

import FormBuilderLayout from './FormBuilderLayout'

import {
  createForms,
  updateForms,
  deleteForms,
  deleteElements,
  getForms,
  updateElements,
} from '../redux/FormBuilder'

export default compose(
  ConnectPage(() => [actions.getUsers(), getForms()]),
  connect(
    state => {
      const { error } = state
      const { forms } = state.forms

      return { error, forms: forms.forms }
    },
    (dispatch, { history }) => ({
      deleteForm: form => dispatch(deleteForms(form)),
      deleteElement: (form, element) => dispatch(deleteElements(form, element)),
      updateForm: (form, formProperties) =>
        dispatch(updateForms(form, formProperties)),
      createForm: formProperties => dispatch(createForms(formProperties)),
      updateElements: (form, formElements) =>
        dispatch(updateElements(form, formElements)),
    }),
  ),
  withState('properties', 'onChangeProperties', ({ forms }) => ({
    type: 'form',
    properties: forms[0] || {},
  })),
  withState('activeTab', 'onChangeTab', ({ forms, activeTab }) =>
    forms.length === 0 ? 'new' : 0,
  ),
  withHandlers({
    changeProperties: ({
      onChangeProperties,
      forms,
      activeTab,
    }) => properties =>
      onChangeProperties(
        () =>
          Object.assign({}, properties, {
            id: (forms[activeTab] || {}).id,
          }) || undefined,
      ),
    changeTabs: ({ onChangeTab }) => activeTab => {
      onChangeTab(() => activeTab || '')
    },
  }),
)(FormBuilderLayout)
