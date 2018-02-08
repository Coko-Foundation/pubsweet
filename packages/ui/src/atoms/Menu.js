import React from 'react'
import styled from 'styled-components'

// TODO: match the width of the container to the width of the widest option?
// TODO: use a <select> element instead of divs?

const Root = styled.div``

const Label = styled.span`
  display: block;
`

const OpenerContainer = styled.div``

const Opener = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.2em;

  border-left: 2px solid
    ${props => (props.open ? 'var(--color-primary)' : 'lightgrey')};
  color: ${props => (props.open ? 'var(--color-primary)' : 'inherit')};

  &:hover {
    border-left: 2px solid var(--color-primary);
    color: var(--color-primary);
  }
`

const Placeholder = styled.span`
  font-family: var(--font-interface);
  font-style: italic;
  font-weight: 400;
  text-transform: normal;
  color: #aaa;

  &:hover {
    color: var(--color-primary);
  }
`

const Arrow = styled.span`
  display: inline-block;
  font-size: 50%;
  margin-left: 10px;
  transition: transform 0.2s;
  transform: scaleX(2.2) scaleY(${props => (props.open ? -1.2 : 1.2)});
`

const Main = styled.div.attrs({
  role: 'listbox',
})`
  position: relative;
`

const OptionsContainer = styled.div`
  position: absolute;
`

const Options = styled.div`
  background-color: white;
  border-bottom: 2px solid var(--color-primary);
  border-left: 2px solid var(--color-primary);
  left: 0;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
  position: absolute;
  top: 0;
  transition: opacity 2s;
  width: 0;
  z-index: 10;

  min-width: ${props => (props.open ? '10em' : '0')};
  opacity: ${props => (props.open ? '1' : '0')};
`

const Option = styled.div.attrs({
  role: 'option',
  tabIndex: '0',
  'aria-selected': props => props.active,
})`
  color: ${props => (props.active ? 'black' : '#444')};
  font-weight: ${props => (props.active ? '600' : 'inherit')};
  cursor: pointer;
  font-family: var(--font-author);
  padding: 10px;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
  }
`

/* Not used for now
.inline {
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-right: 0.5em;
}

.inline .label {
  margin-right: 0.5em;
}

.inline .opener {
  margin-bottom: -4px;
}

.root .inline {
  flex-direction: columns;
}

.root.author {
  font-family: var(--font-author);
}
*/

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
          <OpenerContainer>
            <Opener onClick={this.toggleMenu} open={open}>
              {selected ? (
                <span>{this.optionLabel(selected)}</span>
              ) : (
                <Placeholder>{placeholder}</Placeholder>
              )}
              <Arrow open={open}>▼</Arrow>
            </Opener>
          </OpenerContainer>

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
