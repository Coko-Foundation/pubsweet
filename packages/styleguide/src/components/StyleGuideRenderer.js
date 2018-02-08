import React from 'react'
import styled from 'styled-components'
import { Button } from '@pubsweet/ui'
import injectNormalizeCss from 'pubsweet-client/src/helpers/inject-normalize-css'
import '@pubsweet/default-theme'

injectNormalizeCss()

const grid = `
div[data-preview] {
  --a-dark: rgba(255, 0, 0, 0.2);
  --a-light: rgba(255, 69, 69, 0.1);
  --b-dark: rgba(0, 121, 253, 0.2);
  --b-light: rgba(68, 158, 255, 0.1);

  background-image: repeating-linear-gradient( to bottom, 
    var(--a-dark),
    var(--a-dark) var(--sub-grid-unit),
    var(--a-light) var(--sub-grid-unit),
    var(--a-light) calc(2 * var(--sub-grid-unit)),
    var(--b-dark) calc(2 * var(--sub-grid-unit)),
    var(--b-dark) calc(3 * var(--sub-grid-unit)),
    var(--b-light) calc(3 * var(--sub-grid-unit)),
    var(--b-light) calc(4 * var(--sub-grid-unit)),
    var(--b-dark) calc(4 * var(--sub-grid-unit)),
    var(--b-dark) calc(5 * var(--sub-grid-unit)),
    var(--b-light) calc(5 * var(--sub-grid-unit)),
    var(--b-light) calc(6 * var(--sub-grid-unit)),
    var(--a-dark) calc(6 * var(--sub-grid-unit)),
    var(--a-dark) calc(7 * var(--sub-grid-unit)),
    var(--a-light) calc(7 * var(--sub-grid-unit)),
    var(--a-light) calc(8 * var(--sub-grid-unit))
  );
  border-color: white;
}
`

const Root = styled.div`
  display: grid;
  grid-template-areas: 'side content';
  grid-template-columns: 1fr 3fr;
  height: 100vh;
  width: 100vw;
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: side;
  overflow-y: hidden;
`

const Header = styled.header`
  padding: 0.5rem;
`

const Title = styled.h1`
  font-family: 'Fira Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 0;
  padding: 0 1rem;
`

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 1rem;
  *[data-preview] {
    padding: calc(var(--grid-unit) / 2);
  }
  ${props => props.grid && grid};
`

const Nav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`
const NarrowButton = styled(Button)`
  margin: 0 calc(var(--sub-grid-unit) * 6) var(--sub-grid-unit)
    calc(var(--sub-grid-unit) * 4);
`

class StyleGuideRenderer extends React.Component {
  constructor() {
    super()
    this.state = { grid: false }
  }
  render() {
    const { title, children, toc } = this.props
    const GridToggle = () => (
      <NarrowButton onClick={() => this.setState({ grid: !this.state.grid })}>
        Toggle Grid
      </NarrowButton>
    )

    return (
      <Root>
        <Sidebar>
          <Header>
            <Title>{title}</Title>
          </Header>
          <GridToggle />
          <Nav>{toc}</Nav>
        </Sidebar>
        <Content grid={this.state.grid}>{children}</Content>
      </Root>
    )
  }
}
export default StyleGuideRenderer
