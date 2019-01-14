import React from 'react'
// import { omitBy } from 'lodash'

import { Page, Heading } from './molecules/Page'

const ComponentProperties = ({
  properties,
  changeComponent,
  selectComponentValue,
  handleSubmit,
  setFieldValue,
}) => (
  <Page>
    <Heading>Form Elements</Heading>
    <div />
  </Page>
)

// const onSubmit = (values, { onSubmitFn, properties }) => {
//   if (!values.id || !values.component) return

//   const children = omitBy(values, value => value === '')
//   onSubmitFn({ id: properties.id }, Object.assign({}, { children }))
// }

// onSubmit(props, { onSubmitFn, properties }),

export default ComponentProperties
