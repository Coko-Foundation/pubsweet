import React from 'react'
import { find } from 'lodash'
import { compose, withHandlers, withState } from 'recompose'
import { Button, Menu } from '@pubsweet/ui'

const TeamCreator = ({
  teamTypeSelected,
  collectionSelected,
  collectionsOptions,
  typesOptions,
  onChangeCollection,
  onChangeType,
  onSave,
}) => (
  <form onSubmit={onSave}>
    <h3>Create a new team</h3>
    <h4>Team type</h4>
    <Menu
      name="teamType"
      onChange={onChangeType}
      options={typesOptions}
      required
      reset={teamTypeSelected}
      value={teamTypeSelected}
    />
    <h4>Collection</h4>
    <Menu
      name="collection"
      onChange={onChangeCollection}
      options={collectionsOptions}
      required
      reset={collectionSelected}
      value={collectionSelected}
    />
    <Button primary type="submit">
      Create
    </Button>
  </form>
)

export default compose(
  withState('collectionSelected', 'onCollectionSelect', false),
  withState('teamTypeSelected', 'onTeamTypeSelect', false),
  withHandlers({
    onChangeCollection: ({ onCollectionSelect }) => collectionId =>
      onCollectionSelect(() => collectionId || false),
    onChangeType: ({ onTeamTypeSelect }) => teamType =>
      onTeamTypeSelect(() => teamType || false),
    onSave: ({
      teamTypeSelected,
      collectionSelected,
      create,
      typesOptions,
      onTeamTypeSelect,
      onCollectionSelect,
    }) => event => {
      event.preventDefault()
      const teamType = teamTypeSelected

      let objectId
      let objectType

      if (collectionSelected) {
        objectId = collectionSelected
        objectType = 'collection'
      }

      if (teamType && objectId && objectType) {
        create({
          name: find(typesOptions, types => types.value === teamType).label,
          teamType,
          object: {
            id: objectId,
            type: objectType,
          },
          members: [],
        })

        onTeamTypeSelect(() => true)
        onCollectionSelect(() => true)
      }
    },
  }),
)(TeamCreator)
