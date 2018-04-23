import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import { Checkbox } from '../atoms/'
import { Menu } from '../molecules'
import th from '../helpers/themeHelper'

const Option = styled.div.attrs({
  role: 'option',
  tabIndex: '0',
  'aria-selected': props => props.active,
})``

const Opener = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  font-family: inherit;

  width: 100%;
  height: calc(${th('gridUnit')} * 2);
  padding: 0;

  display: flex;
  align-items: center;

  &:hover {
    border-color: ${th('colorPrimary')};
  // }
`

const Value = styled.span`
  flex-grow: 1;

  text-align: left;
  padding: 0 calc(${th('gridUnit')} / 2);

  &:hover {
    color: ${th('colorPrimary')};
  }
`

const Placeholder = Value.extend`
  color: ${th('colorTextPlaceholder')};
  font-style: italic;
`

const ArrowContainer = styled.span`
  border-left: ${th('borderWidth')} ${th('borderStyle')} ${th('colorFurniture')};

  width: calc(${th('gridUnit')} * 2);
  height: calc(${th('gridUnit')} * 2 - ${th('borderWidth')} * 2);

  display: flex;
  align-items: center;
  justify-content: center;
`

const Arrow = styled.span`
  font-size: 50%;
  transition: transform 0.2s;
  transform: scaleX(2) scaleY(${props => (props.open ? -1.2 : 1.2)});
`

const optionLabel = selected => Object.values(selected).join(', ')

const MultipleChoiceOpener = ({
  toggleMenu,
  open,
  selected = {},
  placeholder,
}) => (
  <Opener onClick={toggleMenu} open={open}>
    {selected ? (
      <Value>{optionLabel(selected)}</Value>
    ) : (
      <Placeholder>{placeholder}</Placeholder>
    )}
    <ArrowContainer>
      <Arrow open={open}>▼</Arrow>
    </ArrowContainer>
  </Opener>
)

const MultipleChoiceCheckboxOption = ({
  selected = {},
  label,
  value,
  handleSelect,
  handleKeyPress,
}) => (
  <Option
    key={value}
    onClick={e => {
      e.preventDefault()
      const newSelected = { ...selected }
      if (selected[value]) delete newSelected[value]
      else if (Object.keys(selected).length <= 1) newSelected[value] = label
      else return
      handleSelect({ open: true, selected: newSelected })
    }}
    onKeyPress={event => handleKeyPress(event, value)}
  >
    <Checkbox checked={!!get(selected, `${value}`)} />
    {label || value}
  </Option>
)

const MultipleChoiceMenu = () => {
  const options = [
    {
      value: 'structural-biology-molecular-biophysics',
      label: 'Structural Biology and Molecular Biophysics',
    },
    { value: 'plant-biology', label: 'Plant Biology' },
    { value: 'physics-living-systems', label: 'Physics of Living Systems' },
    { value: 'neuroscience', label: 'Neuroscience' },
    {
      value: 'microbiology-infectious-disease',
      label: 'Microbiology and Infectious Disease',
    },
    { value: 'immunology-inflammation', label: 'Immunology and Inflammation' },
    { value: 'human-biology-medicine', label: 'Human Biology and Medicine' },
    {
      value: 'genomics-evolutionary-biology',
      label: 'Genomics and Evolutionary Biology',
    },
    { value: 'genes-chromosomes', label: 'Genes and Chromosomes' },
    {
      value: 'epidemiology-global-health',
      label: 'Epidemiology and Global Health',
    },
    { value: 'ecology', label: 'Ecology' },
    { value: 'biochemistry', label: 'Biochemistry' },
    {
      value: 'biophysics-and-structural-biology',
      label: 'Biophysics and Structural Biology',
    },
  ]
  return (
    <Menu
      options={options}
      placeholder="Choose in the list"
      renderOpener={MultipleChoiceOpener}
      renderOption={MultipleChoiceCheckboxOption}
    />
  )
}

export default MultipleChoiceMenu
