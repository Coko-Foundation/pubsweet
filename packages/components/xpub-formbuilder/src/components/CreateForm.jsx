import React from 'react'
// import styled from 'styled-components'
import { Button } from '@pubsweet/ui'

const CreateForm = ({ onSave }) => (
  <form onSubmit={onSave}>
    <h3>Create a new team</h3>
    <h4>Team type</h4>

    <h4>Collection</h4>

    <Button primary type="submit">
      Create
    </Button>
  </form>
)
export default CreateForm
