import React from 'react'
import styled from 'styled-components'
import { FieldArray } from 'redux-form'
import { compose, lifecycle } from 'recompose'
import { TextField, ValidatedField, Button } from '@pubsweet/ui'
import { minSize, readonly } from 'xpub-validators'

const minSize1 = minSize(1)

const Inline = styled.div`
  display: inline-block;
  margin-right: 30px;
`

const UnbulletedList = styled.div`
  list-style-type: none;
  margin-left: -40px;
`

const Spacing = styled.div`
  padding: 15px 0px;
`

const Author = styled.div`
  padding-bottom: 10px;
`

const firstNameInput = input => (
  <TextField label="First name" placeholder="Enter first name…" {...input} />
)

const lastNameInput = input => (
  <TextField label="Last name" placeholder="Enter last name…" {...input} />
)

const emailAddressInput = input => (
  <TextField
    label="Email address"
    placeholder="Enter email address…"
    {...input}
  />
)

const affiliationInput = input => (
  <TextField label="Affiliation" placeholder="Enter affiliation…" {...input} />
)

const renderAuthors = ({
  fields = {},
  meta: { touched, error, submitFailed },
}) => (
  <ul>
    <UnbulletedList>
      <li>
        <Button onClick={() => fields.push()} plain type="button">
          Add another author
        </Button>
      </li>
      {fields.map((author, index) => (
        <li key={`${author}.email`}>
          <Spacing>
            <Author>
              Author:&nbsp;
              {fields.length > 1 && (
                <Button onClick={() => fields.remove(index)} type="button">
                  Remove
                </Button>
              )}
            </Author>
            <div>
              <Inline>
                <ValidatedField
                  component={firstNameInput}
                  name={`${author}.firstName`}
                  readonly={readonly}
                  required
                  validate={[minSize1]}
                />
              </Inline>

              <Inline>
                <ValidatedField
                  component={lastNameInput}
                  name={`${author}.lastName`}
                  readonly={readonly}
                  required
                  validate={[minSize1]}
                />
              </Inline>
            </div>

            <div>
              <Inline>
                <ValidatedField
                  component={emailAddressInput}
                  name={`${author}.email`}
                  readonly={readonly}
                  required
                  validate={[minSize1]}
                />
              </Inline>

              <Inline>
                <ValidatedField
                  component={affiliationInput}
                  name={`${author}.affiliation`}
                  readonly={readonly}
                  required
                  validate={[minSize1]}
                />
              </Inline>
            </div>
          </Spacing>
        </li>
      ))}
    </UnbulletedList>
  </ul>
)

const renderAuthorsComp = compose(
  lifecycle({
    componentDidMount() {
      if (this.props.fields.length === 0) {
        this.props.fields.push()
      }
    },
  }),
)(renderAuthors)

const AuthorsInput = () => (
  <FieldArray component={renderAuthorsComp} name="metadata.authors" />
)

export default AuthorsInput
