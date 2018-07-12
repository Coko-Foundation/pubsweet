import React from 'react'
import { forEach } from 'lodash'
import styled from 'styled-components'
import { Tabs, Action } from '@pubsweet/ui'
import { Columns, Admin } from './atoms/Columns'
import ComponentProperties from './ComponentProperties'
import FormBuilder from './FormBuilder'
import FormProperties from './FormProperties'

const DeleteIcon = styled(Action)`
  margin-left: 10px;
  line-height: 1.15;
`

const FormBuilderLayout = ({
  forms,
  properties,
  deleteForm,
  deleteElement,
  updateForm,
  createForm,
  updateElements,
  changeProperties,
  changeTabs,
  activeTab,
}) => {
  const Sections = []
  forEach(forms, (form, key) => {
    Sections.push({
      content: (
        <FormBuilder
          changeProperties={changeProperties}
          deleteElement={deleteElement}
          form={form}
          key={`form-builder-${key}`}
        />
      ),
      key: `${key}`,
      label: [
        form.name,
        <DeleteIcon
          onClick={e => {
            e.preventDefault()
            deleteForm(form)
          }}
        >
          x
        </DeleteIcon>,
      ],
    })
  })

  Sections.push({
    content: (
      <FormProperties mode="create" onSubmitFn={createForm} properties={{}} />
    ),
    key: 'new',
    label: '+ Add Form',
  })

  return (
    <Columns>
      <Tabs
        activeKey={`${activeTab}`}
        onChange={tab => {
          changeProperties({
            type: 'form',
            properties: forms[tab],
          })
          changeTabs(tab)
        }}
        sections={Sections}
        title="builder"
      />
      <Admin>
        <ComponentProperties
          changeTabs={changeTabs}
          key={`${properties.type}-${(properties.properties || {}).id}`}
          onSubmitFn={properties.type === 'form' ? updateForm : updateElements}
          properties={properties}
        />
      </Admin>
    </Columns>
  )
}

export default FormBuilderLayout
