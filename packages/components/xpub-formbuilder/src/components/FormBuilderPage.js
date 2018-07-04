import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'

// import config from 'config'
import { ConnectPage } from 'xpub-connect'

import FormBuilderLayout from './FormBuilderLayout'
import { createForm, updateForm, deleteForm } from '../redux/FormBuilder'

export default compose(
  ConnectPage(() => [actions.getUsers()]),
  connect(
    state => {
      const { error } = state
      let { forms } = state
      forms = {
        1: {},
        2: {},
        new: {},
      }
      return { error, forms }
    },
    (dispatch, { history }) => ({
      deleteForm: formProperties => deleteForm(formProperties),
      updateForm: formProperties => updateForm(formProperties),
      createForm: formProperties => createForm(formProperties),
    }),
  ),
  withState('properties', 'onChangeProperties', ({ forms }) => ({
    type: 'form',
    properties: (forms || [])[0],
  })),
  withHandlers({
    changeProperties: ({ onChangeProperties }) => properties =>
      onChangeProperties(() => properties || {}),
  }),
)(FormBuilderLayout)
