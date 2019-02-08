import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'
import Button from '../atoms/Button'

// TODO: match the width of the container to the width of the widest option?
// TODO: use a <select> element instead of divs?
// TODO: determine the correct color for non-selected options
// TODO: add z-indexes in theme object?
// FIXME: putting markup inside a <button> is invalid

// #region styled components
const Root = styled.div``

const CloseOverlay = styled.div`
  background-color: transparent;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;

  ${override('ui.Menu.CloseOverlay')};
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
  ${override('ui.Label')};
  ${override('ui.Menu.Label')};
`

const Opener = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  cursor: pointer;
  font-family: inherit;

  width: 100%;
  height: calc(${th('gridUnit')} * 6);
  padding: 0;

  display: flex;
  align-items: center;

  &:hover {
    border-color: ${th('colorPrimary')};
  }

  ${override('ui.Menu.Opener')};
`

const Value = styled.span`
  border-right: ${th('borderWidth')} ${th('borderStyle')}
    ${th('colorFurniture')};

  flex-grow: 1;
  white-space: nowrap;
  flex-wrap: wrap;
  display: flex;
  text-align: left;
  line-height: ${th('gridUnit')};
  padding: 0 ${th('gridUnit')};
  white-space: nowrap;
  &:hover {
    color: ${th('colorPrimary')};
  }

  ${override('ui.Menu.Value')};
`

const MultipleValue = styled.span`
  text-align: left;
  padding: 0 calc(${th('gridUnit')} / 2);
  color: ${th('colorPrimary')};
  background-color: ${th('colorSecondary')};
  margin: calc(${th('gridUnit')} / 6);
  button {
    margin-left: calc(${th('gridUnit')} / 2);
    min-width: 0px;
    padding: calc(${th('gridUnit')} / 2);
  }
`

const Placeholder = styled(Value)`
  color: ${th('colorTextPlaceholder')};
  font-style: italic;
  padding: calc(${th('gridUnit')} * 2);

  ${override('ui.Menu.Placeholder')};
`

const ArrowContainer = styled.span`
  width: calc(${th('gridUnit')} * 2);
  height: calc(${th('gridUnit')} * 2 - ${th('borderWidth')} * 2);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(${th('gridUnit')} * 2);
  ${override('ui.Menu.ArrowContainer')};
`

const Arrow = styled.span`
  font-size: 50%;
  transition: transform 0.2s;
  transform: scaleX(2) scaleY(${props => (props.open ? -1.2 : 1.2)});

  ${override('ui.Menu.Arrow')};
`

const Main = styled.div.attrs({
  role: 'listbox',
})`
  position: relative;

  ${override('ui.Menu.Main')};
`

const OptionsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;

  ${override('ui.Menu.OptionsContainer')};
`

const Options = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background-color: ${th('colorBackground')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  overflow-y: auto;
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  z-index: 100;

  ${override('ui.Menu.Options')};
`

const Option = styled.div.attrs({
  role: 'option',
  tabIndex: '0',
  'aria-selected': props => props.active,
})`
  color: ${props => (props.active ? props.theme.textColor : '#444')};
  font-weight: ${props => (props.active ? '600' : 'inherit')};
  cursor: pointer;
  font-family: ${th('fontAuthor')};
  padding: calc(${th('gridUnit')} - ${th('borderWidth')} * 2)
    calc(${th('gridUnit')} * 2);
  border: ${th('borderWidth')} ${th('borderStyle')} transparent;
  border-width: ${th('borderWidth')} 0 ${th('borderWidth')} 0;
  white-space: nowrap;

  &:hover {
    background: ${th('colorBackgroundHue')};
    border-color: ${th('colorBorder')};
  }

  &:first-child:hover {
    border-top-color: ${th('colorBackgroundHue')};
  }

  &:last-child:hover {
    border-bottom-color: ${th('colorBackgroundHue')};
  }

  ${override('ui.Menu.Option')};
`
// #endregion

class Menu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      selected: props.value,
      selectOneOfMultiElement: undefined,
    }
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  resetMenu = props => {
    this.state = {
      open: false,
      selected: undefined,
    }
  }

  selectOneOfMultiElement = (event, value) => {
    event.stopPropagation()
    const selectOneOfMultiElement = value
    this.setState({ selectOneOfMultiElement })
    if (this.props.selectElement) this.props.selectElement(value)
  }

  removeSelect = (event, value) => {
    event.stopPropagation()
    let { selected } = this.state
    const index = selected.indexOf(value)
    selected = [...selected.slice(0, index), ...selected.slice(index + 1)]
    this.setState({ selected })
    if (this.props.onChange) this.props.onChange(selected)
  }

  handleSelect = ({ selected, open }) => {
    const { multi } = this.props
    let values
    if (multi) {
      values = this.state.selected ? this.state.selected : []
      if (values.indexOf(selected) === -1) values.push(selected)
    } else {
      values = selected
    }

    this.setState({
      open,
      selected: values,
    })
    if (this.props.onChange) this.props.onChange(values)
  }

  handleKeyPress = (event, selected, open) => {
    if (event.which === 13) {
      this.handleSelect(selected, open)
    }
  }

  optionLabel = value => {
    const { options } = this.props

    return options.find(option => option.value === value)
      ? options.find(option => option.value === value).label
      : ''
  }

  render() {
    const {
      maxHeight = 250,
      label,
      options,
      inline,
      placeholder,
      renderOption: RenderOption,
      renderOpener: RenderOpener,
      className,
      multi,
      reset,
      ...rest
    } = this.props
    const { open, selected } = this.state

    if (reset === true) this.resetMenu(this.props)

    return (
      <Root className={className} inline={inline} open={open}>
        {label && <Label>{label}</Label>}
        {open && <CloseOverlay onClick={this.toggleMenu} />}
        <Main>
          <RenderOpener
            open={open}
            optionLabel={this.optionLabel}
            placeholder={placeholder}
            removeSelect={this.removeSelect}
            selected={selected}
            selectOneOfMultiElement={this.selectOneOfMultiElement}
            toggleMenu={this.toggleMenu}
            {...rest}
          />
          <OptionsContainer>
            {open && (
              <Options maxHeight={maxHeight} open={open}>
                {options.map(option => (
                  <RenderOption
                    handleKeyPress={this.handleKeyPress}
                    handleSelect={this.handleSelect}
                    key={option.value}
                    label={option.label}
                    multi={multi}
                    selected={selected}
                    value={option.value}
                  />
                ))}
              </Options>
            )}
          </OptionsContainer>
        </Main>
      </Root>
    )
  }
}

const DefaultMenuOption = ({
  selected,
  label,
  value,
  handleSelect,
  handleKeyPress,
  multi,
}) => {
  const option = (
    <Option
      active={value === selected}
      key={value}
      onClick={() => handleSelect({ open: false, selected: value })}
      onKeyPress={event => handleKeyPress(event, value)}
    >
      {label || value}
    </Option>
  )

  if (!multi) return option
  return multi && !selected.includes(value) ? option : null
}

const DefaultOpener = ({
  toggleMenu,
  open,
  selected,
  placeholder,
  optionLabel,
  removeSelect,
  validationStatus,
  selectOneOfMultiElement,
}) => (
  <Opener onClick={toggleMenu} open={open} validationStatus={validationStatus}>
    {(!selected || selected.length === 0) && (
      <Placeholder>{placeholder}</Placeholder>
    )}
    {selected && !Array.isArray(selected) && (
      <Value>{optionLabel(selected)}</Value>
    )}
    {selected && selected.length > 0 && Array.isArray(selected) && (
      <Value>
        {selected.map(select => (
          <MultipleValue
            onClick={event => selectOneOfMultiElement(event, select)}
          >
            {optionLabel(select)}
            <Button onClick={event => removeSelect(event, select)}>x</Button>
          </MultipleValue>
        ))}
      </Value>
    )}
    <ArrowContainer>
      <Arrow open={open}>▼</Arrow>
    </ArrowContainer>
  </Opener>
)

Menu.propTypes = {
  /** Menu items. */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  /** Custom component for the selected option. */
  renderOpener: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  /** Custom option component. The component will be rendered with *optionProps*. */
  renderOption: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  reset: PropTypes.bool,
  /** Optional label to be shown above the menu. */
  label: PropTypes.string,
  /** Placeholder until a value is selected. */
  placeholder: PropTypes.string,
  /** Maximum height of the options container. */
  maxHeight: PropTypes.number,
}

Menu.defaultProps = {
  renderOption: DefaultMenuOption,
  renderOpener: DefaultOpener,
  reset: false,
  placeholder: 'Choose in the list',
}

export default Menu
