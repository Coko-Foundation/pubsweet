import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

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
  display: block;

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
  flex-grow: 1;

  text-align: left;
  padding: 0 ${th('gridUnit')};

  &:hover {
    color: ${th('colorPrimary')};
  }

  ${override('ui.Menu.Value')};
`

const Placeholder = Value.extend`
  color: ${th('colorTextPlaceholder')};
  font-style: italic;

  ${override('ui.Menu.Placeholder')};
`

const ArrowContainer = styled.span`
  border-left: ${th('borderWidth')} ${th('borderStyle')} ${th('colorFurniture')};

  width: calc(${th('gridUnit')} * 6);
  height: calc(${th('gridUnit')} * 6 - ${th('borderWidth')} * 2);

  display: flex;
  align-items: center;
  justify-content: center;

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
    }
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleSelect = ({ selected, open }) => {
    this.setState({
      open,
      selected,
    })
    if (this.props.onChange) this.props.onChange(selected)
  }

  handleKeyPress = (event, selected, open) => {
    if (event.which === 13) {
      this.handleSelect(selected, open)
    }
  }

  optionLabel = value => {
    const { options } = this.props

    return options.find(option => option.value === value).label
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
    } = this.props
    const { open, selected } = this.state

    return (
      <Root className={className} inline={inline} open={open}>
        {label && <Label>{label}</Label>}
        {open && <CloseOverlay onClick={this.toggleMenu} />}
        <Main>
          <RenderOpener
            open={open}
            optionLabel={this.optionLabel}
            placeholder={placeholder}
            selected={selected}
            toggleMenu={this.toggleMenu}
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
}) => (
  <Option
    active={value === selected}
    key={value}
    onClick={() => handleSelect({ open: false, selected: value })}
    onKeyPress={event => handleKeyPress(event, value)}
  >
    {label || value}
  </Option>
)

const DefaultOpener = ({
  toggleMenu,
  open,
  selected,
  placeholder,
  optionLabel,
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
  placeholder: 'Choose in the list',
}

export default Menu
