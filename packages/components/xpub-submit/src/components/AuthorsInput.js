import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { TextField, ValidatedField, Button } from '@pubsweet/ui'
import {
  required,
  minSize,
} from 'xpub-validators'

const minSize1 = minSize(1)

const renderField = ({ input, label, placeholder }) => {
  <div>
    <label>{label}</label>
    <TextField placeholder={placeholder} {...input} />
  </div>
}
//{/* TODO validation */}
const renderAuthors = ({ authors }) => {
  <ul>
    <li>
      {/* TODO Add another author button <Button> component */}
      {/* TODO Remove author button When at least one remaining */}
    </li>
    { authors.map((author, index) =>
        <li key={index}>
          <div>Author #{index + 1}</div>

          <Field
            name={`${author}.firstName`}
            component={renderField}
            label="First name"
            placeholder="Enter first name…"
          />

          <Field 
            name={`${author}.lastName`}
            component={renderField}
            label="Last name"
            placeholder="Enter last name…"
          />

          <Field 
            name={`${author}.email`}
            component={renderField}
            label="Email address"
            placeholder="Enter email address…"
          />

          <Field 
            name={`${author}.affiliation`}
            component={renderField}
            label="Affiliation"
            placeholder="Enter affiliation…"
          />
        </li>
        )
      }
  </ul>  
}

const AuthorsInput = () => {
  return (
    <FieldArray name="authors" component={renderMembers} />
  )
}

export default AuthorsInput