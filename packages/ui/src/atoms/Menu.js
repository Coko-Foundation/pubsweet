import React from 'react'
import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

// TODO: match the width of the container to the width of the widest option?
// TODO: use a <select> element instead of divs?
// TODO: determine the correct color for non-selected options
// FIXME: putting markup inside a <button> is invalid

const Root = styled.div`
  max-width: calc(${fromTheme.gridUnit} * 14);
  margin-bottom: ${props => (props.inline ? '0' : props.theme.gridUnit)};
`

const Label = styled.label`
  font-size: ${fromTheme.fontSizeBaseSmall};
  display: block;
`

const Opener = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${fromTheme.borderWidth} ${fromTheme.borderStyle}
    ${fromTheme.colorBorder};
  border-radius: ${fromTheme.borderRadius};
  cursor: pointer;
  font-family: inherit;

  width: 100%;
  height: calc(${fromTheme.gridUnit} * 2);
  padding: 0;

  display: flex;
  align-items: center;

  &:hover {
    border-color: ${fromTheme.colorPrimary};
  }
`

const Value = styled.span`
  flex-grow: 1;

  text-align: left;
  padding: 0 calc(${fromTheme.gridUnit} / 2);

  &:hover {
    color: ${fromTheme.colorPrimary};
  }
`

const Placeholder = Value.extend`
  color: ${fromTheme.colorTextPlaceholder};
  font-style: italic;
`

const ArrowContainer = styled.span`
  border-left: ${fromTheme.borderWidth} ${fromTheme.borderStyle}
    ${fromTheme.colorFurniture};

  width: calc(${fromTheme.gridUnit} * 2);
  height: calc(${fromTheme.gridUnit} * 2 - ${fromTheme.borderWidth} * 2);

  display: flex;
  align-items: center;
  justify-content: center;
`

const Arrow = styled.span`
  font-size: 50%;
  transition: transform 0.2s;
  transform: scaleX(2) scaleY(${props => (props.open ? -1.2 : 1.2)});
`

const Main = styled.div.attrs({
  role: 'listbox',
})`
  position: relative;
`

const OptionsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`

const Options = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background-color: ${fromTheme.colorBackground};
  border: ${fromTheme.borderWidth} ${fromTheme.borderStyle}
    ${fromTheme.colorBorder};
  border-radius: ${fromTheme.borderRadius};
  overflow: hidden;
`

const Option = styled.div.attrs({
  role: 'option',
  tabIndex: '0',
  'aria-selected': props => props.active,
})`
  color: ${props => (props.active ? props.theme.textColor : '#444')};
  font-weight: ${props => (props.active ? '600' : 'inherit')};
  cursor: pointer;
  font-family: ${fromTheme.fontAuthor};
  padding: calc(${fromTheme.subGridUnit} - ${fromTheme.borderWidth} * 2)
    calc(${fromTheme.subGridUnit} * 2);
  border: ${fromTheme.borderWidth} ${fromTheme.borderStyle} transparent;
  border-width: ${fromTheme.borderWidth} 0 ${fromTheme.borderWidth} 0;
  white-space: nowrap;

  &:hover {
    background: ${fromTheme.colorBackgroundHue};
    border-color: ${fromTheme.colorBorder};
  }

  &:first-child:hover {
    border-top-color: ${fromTheme.colorBackgroundHue};
  }

  &:last-child:hover {
    border-bottom-color: ${fromTheme.colorBackgroundHue};
  }
`

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

  handleSelect = selected => {
    this.setState({
      open: false,
      selected,
    })

    this.props.onChange(selected)
  }

  handleKeyPress = (event, selected) => {
    if (event.which === 13) {
      this.handleSelect(selected)
    }
  }

  optionLabel = value => {
    const { options } = this.props

    return options.find(option => option.value === value).label
  }

  render() {
    const {
      label,
      options,
      inline,
      placeholder = 'Choose in the list',
    } = this.props
    const { open, selected } = this.state

    return (
      <Root inline={inline} open={open}>
        {label && <Label>{label}</Label>}

        <Main>
          <Opener onClick={this.toggleMenu} open={open}>
            {selected ? (
              <Value>{this.optionLabel(selected)}</Value>
            ) : (
              <Placeholder>{placeholder}</Placeholder>
            )}
            <ArrowContainer>
              <Arrow open={open}>▼</Arrow>
            </ArrowContainer>
          </Opener>

          <OptionsContainer>
            {open && (
              <Options open={open}>
                {options.map(option => (
                  <Option
                    active={option.value === selected}
                    key={option.value}
                    onClick={() => this.handleSelect(option.value)}
                    onKeyPress={event =>
                      this.handleKeyPress(event, option.value)
                    }
                  >
                    {option.label || option.value}
                  </Option>
                ))}
              </Options>
            )}
          </OptionsContainer>
        </Main>
      </Root>
    )
  }
}

export default Menu
