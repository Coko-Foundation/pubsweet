import React from 'react'
import { map } from 'lodash'
// import styled from 'styled-components'
import {
  branch,
  renderComponent,
  compose,
  withState,
  withHandlers,
  withProps,
} from 'recompose'
import { ValidatedField, Menu, Button } from '@pubsweet/ui'
import { FormSection, reduxForm } from 'redux-form'

import FormProperties from './FormProperties'
import components from './config/Elements'
import * as elements from './builderComponents'
import { Page } from './molecules/Page'
import { Section, Legend } from './styles'

const MenuComponents = input => (
  <Menu
    options={Object.keys(components).map(value => ({
      value,
      label: value,
    }))}
    {...input}
  />
)

const ComponentProperties = ({
  properties,
  changeComponent,
  selectComponentValue,
  handleSubmit,
}) => (
  <Page>
    <form onSubmit={handleSubmit}>
      <h3>Component Properties</h3>
      <FormSection name="children">
        <Section>
          <Legend space>Choose Component</Legend>
          <ValidatedField
            component={MenuComponents}
            name="component"
            onChange={(value, v) => changeComponent(v)}
          />
        </Section>
        {selectComponentValue &&
          map(components[selectComponentValue], (value, key) => (
            <Section>
              <Legend space>{`Field ${key}`}</Legend>
              <ValidatedField
                component={elements[value.component].default}
                name={key}
                {...value.props}
              />
            </Section>
          ))}
      </FormSection>
      <Button primary type="submit">
        Update Component
      </Button>
    </form>
  </Page>
)

const UpdateForm = ({ onSubmitFn, properties, changeTabs }) => (
  <FormProperties
    mode="update"
    onSubmitFn={onSubmitFn}
    properties={properties}
  />
)

const onSubmit = (values, dispatch, { onSubmitFn, id, properties }) => {
  if (!values.children.id || !values.children.component) return
  onSubmitFn({ id: properties.id }, Object.assign({}, values))
}

const ComponentForm = compose(
  withProps(({ properties }) => ({
    initialValues: { children: properties.properties },
  })),
  reduxForm({
    form: 'ComponentSubmit',
    onSubmit,
    enableReinitialize: true,
    destroyOnUnmount: false,
  }),
  withState(
    'selectComponentValue',
    'selectComponent',
    ({ properties }) => properties.properties.component,
  ),
  withHandlers({
    changeComponent: ({ selectComponent }) => component =>
      selectComponent(() => component),
  }),
)(ComponentProperties)

export default compose(
  branch(
    ({ properties }) => properties.type === 'form',
    renderComponent(UpdateForm),
  )(ComponentForm),
)
