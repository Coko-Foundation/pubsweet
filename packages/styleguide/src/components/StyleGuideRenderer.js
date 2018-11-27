import React from 'react'
import _ from 'lodash'
import 'regenerator-runtime/runtime'
import styled, { css, ThemeProvider } from 'styled-components'
import { Button, Menu, GlobalStyle } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import StyleRoot from 'pubsweet-client/src/helpers/StyleRoot'
import { Normalize } from 'styled-normalize'
import defaultTheme from '@pubsweet/default-theme'
import cokoTheme from '@pubsweet/coko-theme'
import elifeTheme from '@elifesciences/elife-theme'

const currentTheme = {
  name: localStorage.getItem('currentTheme') || 'defaultTheme',
}

const themes = {
  defaultTheme,
  cokoTheme,
  elifeTheme,
}

const aDark = 'rgba(255, 0, 0, 0.2)'
const aLight = 'rgba(255, 69, 69, 0.1)'
const bDark = 'rgba(0, 121, 253, 0.2)'
const bLight = 'rgba(68, 158, 255, 0.1)'

const grid = css`
  div[data-preview] {
    background-image: ${props => `repeating-linear-gradient( to bottom,
    ${aDark},
    ${aDark} ${props.theme.gridUnit},
    ${aLight} ${props.theme.gridUnit},
    ${aLight} calc(2 * ${props.theme.gridUnit}),
    ${bDark} calc(2 * ${props.theme.gridUnit}),
    ${bDark} calc(3 * ${props.theme.gridUnit}),
    ${bLight} calc(3 * ${props.theme.gridUnit}),
    ${bLight} calc(4 * ${props.theme.gridUnit}),
    ${bDark} calc(4 * ${props.theme.gridUnit}),
    ${bDark} calc(5 * ${props.theme.gridUnit}),
    ${bLight} calc(5 * ${props.theme.gridUnit}),
    ${bLight} calc(6 * ${props.theme.gridUnit}),
    ${aDark} calc(6 * ${props.theme.gridUnit}),
    ${aDark} calc(7 * ${props.theme.gridUnit}),
    ${aLight} calc(7 * ${props.theme.gridUnit}),
    ${aLight} calc(8 * ${props.theme.gridUnit})
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
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  margin-bottom: 0;
  padding: 0 1rem;
`

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 1rem;
  *[data-preview] {
    padding: ${th('gridUnit')};
  }
  ${props => props.grid && grid};
`

const Nav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`

function makeNarrow(component) {
  return styled(component)`
    margin: ${props => `
        0
        calc(${props.theme.gridUnit} * 6)
        ${props.theme.gridUnit}
        calc(${props.theme.gridUnit} * 4)
        `};
  `
}

const NarrowButton = makeNarrow(Button)
const NarrowMenu = makeNarrow(Menu)

const componentStore = {
  /**
   * Generic component store
   * All the components in here will be updated whenever the
   * theme is changed. For now just a list of components.
   */
  components: [],
  addComponent(component) {
    /**
     * Adds react component to store
     * @param {object} component - component to store
     */
    this.components.push(component)
  },
  removeComponent(component) {
    /**
     * Removes react component from store
     * @param {object} component - component to be removed from store
     */
    this.components.splice(this.components.indexOf(component), 1)
  },
  getComponents() {
    /**
     * Returns list of components in store
     * @returns {object} - list of components in store
     */
    return this.components
  },
}

class StyleGuideRenderer extends React.Component {
  constructor(props) {
    super(props)

    const isGridOn = localStorage.getItem('showGrid') === 'true'

    this.state = {
      grid: isGridOn || false,
      themeName: currentTheme.name,
    }
  }

  render() {
    const { title, children, toc } = this.props
    const GridToggle = () => (
      <NarrowButton
        onClick={() => {
          const newGridState = !this.state.grid
          this.setState({ grid: newGridState })
          localStorage.setItem('showGrid', newGridState)
        }}
      >
        Toggle Grid
      </NarrowButton>
    )

    const options = Object.keys(themes).map(themeName => ({
      value: themeName,
      label: _.startCase(themeName),
    }))
    const ThemeSelector = () => (
      <NarrowMenu
        onChange={value => {
          // update each component listening for theme changes
          componentStore.getComponents().forEach(component => {
            component.setState({ themeName: value })
          })
          // update self
          this.setState({ themeName: value })
          // update theme state
          currentTheme.name = value
          // update localstorage
          localStorage.setItem('currentTheme', value)
        }}
        options={options}
        value={this.state.themeName}
      />
    )

    return (
      <ThemeProvider theme={themes[this.state.themeName]}>
        <StyleRoot>
          <Normalize />
          <GlobalStyle />
          <Root>
            <Sidebar>
              <Header>
                <Title>{title}</Title>
              </Header>
              <GridToggle />
              <ThemeSelector />
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
export { currentTheme, themes, componentStore }
