import React from 'react'
import { Tabs } from '@pubsweet/ui'
import { Columns, Admin } from './atoms/Columns'
import ComponentProperties from './ComponentProperties'
import FormBuilder from './FormBuilder'
import CreateForm from './CreateForm'

const FormBuilderLayout = ({
  forms,
  properties,
  deleteForm,
  updateForm,
  createForm,
  changeProperties,
}) => {
  const Sections = [
    {
      content: <FormBuilder changeProperties={changeProperties} />,
      key: '1',
      label: 'form 1',
    },
    {
      content: <FormBuilder changeProperties={changeProperties} />,
      key: '2',
      label: 'form 2',
    },
    {
      content: <CreateForm />,
      key: 'new',
      label: '+',
    },
  ]
  return (
    <Columns>
      <Tabs
        activeKey={null}
        onChange={tab => {
          changeProperties({
            type: 'form',
            properties: forms[tab],
          })
        }}
        sections={Sections}
        title="builder"
      />
      <Admin>
        <ComponentProperties properties={properties} />
      </Admin>
    </Columns>
  )
}

export default FormBuilderLayout
