import React from 'react'
import styled from 'styled-components'

// TODO: match the width of the container to the width of the widest option?
// TODO: use a <select> element instead of divs?
// TODO: determine the correct color for non-selected options

const Root = styled.div`
  width: calc(var(--grid-unit) * 14);
`

const Label = styled.label`
  font-size: var(--font-size-base-small);
`

const Opener = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-family: inherit;

  width: 100%;
  padding: 0;

  display: flex;
  align-items: center;

  &:hover {
    border-color: var(--color-primary);
  }
`

const Value = styled.span`
  flex-grow: 1;

  text-align: left;
  padding-left: calc(var(--grid-unit) / 2);

  &:hover {
    color: var(--color-primary);
  }
`

const Placeholder = Value.extend`
  color: var(--color-text-placeholder);
  font-style: italic;
`

const ArrowContainer = styled.span`
  border-left: var(--border-width) var(--border-style) var(--color-furniture);

  width: calc(var(--grid-unit) * 2);
  height: calc(var(--grid-unit) * 2);

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

  background-color: var(--color-background);
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
`

const Option = styled.div.attrs({
  role: 'option',
  tabIndex: '0',
  'aria-selected': props => props.active,
})`
  color: ${props => (props.active ? 'var(--text-color)' : '#444')};
  font-weight: ${props => (props.active ? '600' : 'inherit')};
  cursor: pointer;
  font-family: var(--font-author);
  padding: calc(var(--sub-grid-unit) - var(--border-width) * 2)
    calc(var(--sub-grid-unit) * 2);
  border: var(--border-width) var(--border-style) transparent;
  border-width: var(--border-width) 0 var(--border-width) 0;
  white-space: nowrap;

  &:hover {
    background: var(--color-background-hue);
    border-color: var(--color-border);
  }

  &:first-child:hover {
    border-top-color: var(--color-background-hue);
  }

  &:last-child:hover {
    border-bottom-color: var(--color-background-hue);
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
    const { label, options, placeholder = 'Choose in the list' } = this.props
    const { open, selected } = this.state

    return (
      <Root open={open}>
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
