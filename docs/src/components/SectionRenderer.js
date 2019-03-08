import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'rsg-components/Styled'
import SectionHeading from 'rsg-components/SectionHeading'
import Markdown from 'rsg-components/Markdown'
import { th } from '@pubsweet/ui-toolkit'

import { Button, Menu } from '@pubsweet/ui'

import styled, { css, ThemeProvider } from 'styled-components'

import defaultTheme from '@pubsweet/default-theme'
import cokoTheme from '@pubsweet/coko-theme'
import elifeTheme from '../../vendor/elife-theme/src'

import componentStore from './componentStore'

export const currentTheme = {
  name: localStorage.getItem('currentTheme') || 'defaultTheme',
}

export const themes = {
  defaultTheme,
  cokoTheme,
  elifeTheme,
}

const styles = ({ space }) => ({
  root: {
    marginBottom: space[4],
  },
})

const NarrowButton = Button
const NarrowMenu = Menu

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

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 1rem;
  *[data-preview] {
    padding: ${th('gridUnit')};
  }
  ${props => props.grid && grid};
`

class SectionRenderer extends React.Component {
  constructor(props) {
    super(props)

    const isGridOn = localStorage.getItem('showGrid') === 'true'

    this.state = {
      grid: isGridOn || false,
      themeName: currentTheme.name,
    }
  }

  render() {
    const GridToggle = () => (
      <Button
        onClick={() => {
          const newGridState = !this.state.grid
          this.setState({ grid: newGridState })
          localStorage.setItem('showGrid', newGridState)
        }}
      >
        Toggle Grid
      </Button>
    )

    const options = Object.keys(themes).map(themeName => ({
      value: themeName,
      label: _.startCase(themeName),
    }))

    const ThemeSelector = () => (
      <Menu
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
    const {
      classes,
      name,
      slug,
      content,
      components,
      sections,
      depth,
      description,
      pagePerSection,
      isolated,
    } = this.props

    const section = (
      <section className={classes.root}>
        {name && (
          <SectionHeading
            depth={depth}
            id={slug}
            pagePerSection={pagePerSection}
            slotName="sectionToolbar"
            slotProps={this.props}
          >
            {name}
          </SectionHeading>
        )}
        {description && <Markdown text={description} />}
        {content}
        {sections}
        {components}
      </section>
    )

    const sectionWithTools = (
      <Content grid={this.state.grid}>
        <ThemeSelector />
        {section}
        <GridToggle />
      </Content>
    )

    const sectionToShow = isolated ? sectionWithTools : section
    return (
      <ThemeProvider theme={themes[this.state.themeName]}>
        {sectionToShow}
      </ThemeProvider>
    )
  }
}

SectionRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  filepath: PropTypes.string,
  content: PropTypes.node,
  components: PropTypes.node,
  sections: PropTypes.node,
  isolated: PropTypes.bool,
  depth: PropTypes.number.isRequired,
  pagePerSection: PropTypes.bool,
}

export default Styled(styles)(SectionRenderer)
