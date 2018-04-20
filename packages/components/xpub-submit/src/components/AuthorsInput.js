import React from 'react'
import { FieldArray } from 'redux-form'
import { TextField, ValidatedField, Button } from '@pubsweet/ui'
import {
  required,
  minSize,
} from 'xpub-validators'

const minSize1 = minSize(1)

const renderField = ({ input, label, placeholder }) => {
  <div>
    <TextField placeholder={placeholder} label={label} {...input} />
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

          <ValidatedField
            component={renderField} //label="First name", placeholder="Enter first name…"
            name={`${author}.firstName`}
            readonly={readonly}
            required
            validate={[minSize1]}    
          />

          <ValidatedField 
            component={renderField} //label="Last name", placeholder="Enter last name…"
            name={`${author}.lastName`}
            readonly={readonly}
            required
            validate={[minSize1]}    
          />

          <ValidatedField 
            component={renderField} //label="Email address", placeholder="Enter email address…"
            name={`${author}.email`}
            readonly={readonly}
            required
            validate={[minSize1]}    
          />

          <ValidatedField 
            component={renderField} //label="Affiliation", placeholder="Enter affiliation…"
            name={`${author}.affiliation`}
            readonly={readonly}
            required
            validate={[minSize1]}  
          />
        </li>
        )
      }
  </ul>  
}

const AuthorsInput = () => {
  return (
    <FieldArray name="authors" component={renderAuthors} />
  )
}

export default AuthorsInput