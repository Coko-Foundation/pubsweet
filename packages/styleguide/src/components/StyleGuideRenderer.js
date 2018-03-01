import React from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import { Button, fromTheme } from '@pubsweet/ui'
import StyleRoot, {
  injectGlobalStyles,
} from 'pubsweet-client/src/helpers/StyleRoot'
import defaultTheme from '@pubsweet/default-theme'

injectGlobalStyles()

const aDark = 'rgba(255, 0, 0, 0.2)'
const aLight = 'rgba(255, 69, 69, 0.1)'
const bDark = 'rgba(0, 121, 253, 0.2)'
const bLight = 'rgba(68, 158, 255, 0.1)'

const grid = css`
  div[data-preview] {
    background-image: ${props => `repeating-linear-gradient( to bottom,
    ${aDark},
    ${aDark} ${props.theme.subGridUnit},
    ${aLight} ${props.theme.subGridUnit},
    ${aLight} calc(2 * ${props.theme.subGridUnit}),
    ${bDark} calc(2 * ${props.theme.subGridUnit}),
    ${bDark} calc(3 * ${props.theme.subGridUnit}),
    ${bLight} calc(3 * ${props.theme.subGridUnit}),
    ${bLight} calc(4 * ${props.theme.subGridUnit}),
    ${bDark} calc(4 * ${props.theme.subGridUnit}),
    ${bDark} calc(5 * ${props.theme.subGridUnit}),
    ${bLight} calc(5 * ${props.theme.subGridUnit}),
    ${bLight} calc(6 * ${props.theme.subGridUnit}),
    ${aDark} calc(6 * ${props.theme.subGridUnit}),
    ${aDark} calc(7 * ${props.theme.subGridUnit}),
    ${aLight} calc(7 * ${props.theme.subGridUnit}),
    ${aLight} calc(8 * ${props.theme.subGridUnit})
  )`};

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
  font-family: ${fromTheme.fontInterface};
  font-size: ${fromTheme.fontSizeBase};
  margin-bottom: 0;
  padding: 0 1rem;
`

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 1rem;
  *[data-preview] {
    padding: calc(${fromTheme.gridUnit} / 2);
  }
  ${props => props.grid && grid};
`

const Nav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`
const NarrowButton = styled(Button)`
  margin: ${props => `
    0
    calc(${props.theme.subGridUnit} * 6)
    ${props.theme.subGridUnit}
    calc(${props.theme.subGridUnit} * 4)
  `};
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
      <ThemeProvider theme={defaultTheme}>
        <StyleRoot>
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
        </StyleRoot>
      </ThemeProvider>
    )
  }
}
export default StyleGuideRenderer
