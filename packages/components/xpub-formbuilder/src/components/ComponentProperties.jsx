import React from 'react'
import styled from 'styled-components'
import { Button, Menu } from '@pubsweet/ui'
import { branch, renderComponent, compose } from 'recompose'
import { TeamTableCell } from './molecules/Table'

const StyledMenu = styled(Menu)`
  width: 100%;
`

const ComponentProperties = () => [
  <TeamTableCell width={5}>1</TeamTableCell>,
  <TeamTableCell>tefsd</TeamTableCell>,
  <TeamTableCell>4444</TeamTableCell>,
  <TeamTableCell width={40}>
    <StyledMenu inline multi name="members" options={[]} />
  </TeamTableCell>,
  <TeamTableCell width={15}>
    <Button>Delete</Button>
  </TeamTableCell>,
]

const FormProperties = ({ onSave }) => (
  <form onSubmit={onSave}>
    <h3>Create a new team</h3>
    <h4>Team type</h4>
    <h4>Collection</h4>
    <Button primary type="submit">
      Create
    </Button>
  </form>
)

export default compose(
  branch(
    ({ properties }) => properties.type === 'form',
    renderComponent(FormProperties),
  )(ComponentProperties),
)
