import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import { Tab } from '../atoms'

// TODO: allow the tab content to be separate from the key

const Root = styled.div``
const TabsContainer = styled.div`
  display: flex;
  margin-bottom: calc(${th('gridUnit')} * 3);
`
const Title = styled.div`
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  padding: ${th('gridUnit')} 1em;
`
const TabContainer = styled.div.attrs(props => ({
  'data-test-id': props['data-test-id'] || 'tab-container',
}))``

const Content = styled.div``

class Tabs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeKey: props.activeKey || null,
    }
  }

  componentDidMount() {
    const { activeKey } = this.props
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ activeKey })
  }

  setActiveKey(activeKey) {
    this.setState({ activeKey })
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(activeKey)
    }
  }

  render() {
    const { sections, title } = this.props
    const { activeKey } = this.state

    return (
      <Root>
        <TabsContainer>
          {title && <Title>{title}</Title>}

          {sections.map(({ key, label }) => (
            <TabContainer key={key} onClick={() => this.setActiveKey(key)}>
              <Tab active={activeKey === key}>{label || key}</Tab>
            </TabContainer>
          ))}
        </TabsContainer>

        {activeKey && (
          <Content>
            {sections.find(section => section.key === activeKey).content}
          </Content>
        )}
      </Root>
    )
  }
}

export default Tabs
