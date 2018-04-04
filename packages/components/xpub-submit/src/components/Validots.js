import { map } from 'lodash'
import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

import Validot from './Validot'

// TODO: is the order of map(form.registeredFields) guaranteed to be the same?
// TODO: use journal config instead of form.registeredFields once using it to build the form
// TODO: the Field rendered here overrides the validation in the other Field with the same name

export const Validots = ({ form, valid, handleSubmit }) => (
  <div>
    {form.registeredFields &&
      map(form.registeredFields, field => (
        <div key={field.name}>
          <Field component={Validot} name={field.name} />
        </div>
      ))}

    <button disabled={!valid} onClick={handleSubmit}>
      Submit
    </button>
  </div>
)

export default connect(state => ({
  form: state.form.submit,
}))(Validots)
