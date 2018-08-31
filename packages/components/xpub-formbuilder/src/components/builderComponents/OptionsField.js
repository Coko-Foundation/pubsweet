import React from 'react'
import styled from 'styled-components'
import { FieldArray } from 'redux-form'
import { TextField, ValidatedField, Button } from '@pubsweet/ui'

const Inline = styled.div`
  display: inline-block;
  margin-right: 10px;
`

const UnbulletedList = styled.div`
  list-style-type: none;
  margin-left: -40px;
`

const Spacing = styled.div`
  padding: 15px 0px;
`

const Option = styled.div`
  padding-bottom: 10px;
`

const keyInput = input => (
  <TextField label="Key Option" placeholder="Enter key…" {...input} />
)

const valueInput = input => (
  <TextField label="Value Option" placeholder="Enter value…" {...input} />
)

const renderOptions = ({
  fields = {},
  meta: { touched, error, submitFailed },
}) => (
  <ul>
    <UnbulletedList>
      <li>
        <Button onClick={() => fields.push()} plain type="button">
          Add another option
        </Button>
      </li>
      {fields.map((option, index) => (
        <li>
          <Spacing>
            <Option>
              Option:&nbsp;
              {fields.length > 1 && (
                <Button onClick={() => fields.remove(index)} type="button">
                  Remove
                </Button>
              )}
            </Option>
            <div>
              <Inline>
                <ValidatedField
                  component={keyInput}
                  name={`${option}.label`}
                  required
                />
              </Inline>

              <Inline>
                <ValidatedField
                  component={valueInput}
                  name={`${option}value`}
                  required
                />
              </Inline>
            </div>
          </Spacing>
        </li>
      ))}
    </UnbulletedList>
  </ul>
)

const OptionsField = () => (
  <FieldArray component={renderOptions} name="options" />
)

export default OptionsField
