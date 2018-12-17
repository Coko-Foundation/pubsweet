import React from 'react'
import { map, omitBy } from 'lodash'
import {
  branch,
  renderComponent,
  compose,
  withState,
  withHandlers,
  withProps,
} from 'recompose'
import { ValidatedFieldFormik, Menu, Button } from '@pubsweet/ui'
import { withFormik } from 'formik'

import FormProperties from './FormProperties'
import components from './config/Elements'
import * as elements from './builderComponents'
import { Page, Heading } from './molecules/Page'
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
      <Heading>Component Properties</Heading>
      <Section>
        <Legend space>Choose Component</Legend>
        <ValidatedFieldFormik
          component={MenuComponents}
          name="component"
          onChange={value => changeComponent(value)}
        />
      </Section>
      {selectComponentValue &&
        map(components[selectComponentValue], (value, key) => (
          <Section>
            <Legend space>{`Field ${key}`}</Legend>
            <ValidatedFieldFormik
              component={elements[value.component].default}
              key={new Date().getTime()}
              name={key}
              {...value.props}
            />
          </Section>
        ))}
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

  const children = omitBy(values.children, value => value === '')
  onSubmitFn({ id: properties.id }, Object.assign({}, { children }))
}

const ComponentForm = compose(
  withProps(({ properties }) => ({
    initialValues: { children: properties.properties },
  })),
  withFormik({
    displayName: 'ComponentSubmit',
    mapPropsToValues: data => data.properties.properties,
    handleSubmit: (props, { props: { history } }) =>
      onSubmit(props, { history }),
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
