import React from 'react'
import { pick, isEmpty } from 'lodash'
import styled from 'styled-components'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { Button, TextField, ValidatedField } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { FormSection, reduxForm } from 'redux-form'
import { AbstractField, RadioBox } from './builderComponents'
import { Page, Heading } from './molecules/Page'

const nameText = input => <TextField {...input} />

const idText = input => <TextField {...input} />

export const Legend = styled.div`
  font-size: ${th('fontSizeBase')};
  font-weight: 600;
  margin-bottom: ${({ space, theme }) => space && theme.gridUnit};
`

export const Section = styled.div`
  margin: calc(${th('gridUnit')} * 6) 0;
`

const onSubmit = (
  values,
  dispatch,
  { onSubmitFn, properties, mode, changeTabs },
) => {
  if (mode === 'create') {
    onSubmitFn(Object.assign({}, values))
  } else {
    onSubmitFn({ id: properties.properties.id }, Object.assign({}, values))
  }
}

const FormProperties = ({
  handleSubmit,
  properties,
  mode,
  selectPopup,
  showPopupValue,
}) =>
  isEmpty(properties.properties) && mode !== 'create' ? (
    <Page>
      <span>&nbsp;</span>
    </Page>
  ) : (
    <Page>
      <form onSubmit={handleSubmit}>
        <Heading>{mode === 'create' ? 'Create Form' : 'Update Form'}</Heading>
        <FormSection name="">
          <Section id="form.id" key="form.id">
            <Legend>ID Form</Legend>
            <ValidatedField component={idText} name="id" />
          </Section>
          <Section id="form.name" key="form.name">
            <Legend>Form Name</Legend>
            <ValidatedField component={nameText} name="name" />
          </Section>
          <Section id="form.description" key="form.description">
            <Legend>Description</Legend>
            <ValidatedField
              component={AbstractField.default}
              name="description"
            />
          </Section>
          <Section id="form.submitpopup" key="form.submitpopup">
            <Legend>Submit on Popup</Legend>
            <ValidatedField
              component={RadioBox.default}
              inline
              name="haspopup"
              onChange={(input, value) => selectPopup(value)}
              options={[
                {
                  label: 'Yes',
                  value: 'true',
                },
                {
                  label: 'No',
                  value: 'false',
                },
              ]}
            />
          </Section>
          {showPopupValue === 'true' && [
            <Section id="popup.title" key="popup.title">
              <Legend>Popup Title</Legend>
              <ValidatedField component={nameText} name="popuptitle" />
            </Section>,
            <Section id="popup.description" key="popup.description">
              <Legend>Description</Legend>
              <ValidatedField
                component={AbstractField.default}
                name="popupdescription"
              />
            </Section>,
          ]}
          <Button primary type="submit">
            {mode === 'create' ? 'Create Form' : 'Update Form'}
          </Button>
        </FormSection>
      </form>
    </Page>
  )

export default compose(
  withProps(({ properties }) => {
    const paths = [
      'id',
      'name',
      'description',
      'popupdescription',
      'popuptitle',
      'haspopup',
    ]
    return {
      initialValues: pick(properties.properties, paths),
    }
  }),
  withState(
    'showPopupValue',
    'selectPopup',
    ({ properties }) => (properties.properties || {}).haspopup,
  ),
  withHandlers({
    changeShowPopup: ({ selectPopup }) => value => selectPopup(() => value),
  }),
  reduxForm({
    form: 'FormSubmit',
    onSubmit,
    enableReinitialize: true,
    destroyOnUnmount: false,
  }),
)(FormProperties)
