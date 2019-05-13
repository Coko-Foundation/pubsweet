import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, media } from '@pubsweet/ui-toolkit'

const InternalBoxWrapper = ({ marginBottom, paddingX, width, children }) => {
  const Wrapper = styled.div`
    box-sizing: border-box;
    padding-bottom: ${th(`space.${marginBottom}`)};
    padding-left: ${th(`space.${paddingX}`)};
    padding-right: ${th(`space.${paddingX}`)};
    ${media.tabletLandscapeUp`
      width: 50%;
    `};
    width: ${width};
  `
  return <Wrapper>{children}</Wrapper>
}

const TwoColumnLayout = ({
  customWidth = '100%',
  paddingX = 2,
  children,
  bottomSpacing,
  ...props
}) => {
  const FlexWrapper = styled('div')`
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    margin-left: calc(0px - ${th('space.2')});
    margin-right: calc(0px - ${th('space.2')});
  `

  return (
    <FlexWrapper {...props}>
      {React.Children.map(children, (item, index) => (
        <InternalBoxWrapper
          // try to use the key property of the React element
          key={item.key || index}
          marginBottom={bottomSpacing ? 3 : 0}
          paddingX={paddingX}
          width={customWidth}
        >
          {item}
        </InternalBoxWrapper>
      ))}
    </FlexWrapper>
  )
}

TwoColumnLayout.propTypes = {
  /**
   * Set to false to disable bottom spacing on items.
   */
  bottomSpacing: PropTypes.bool,
}

TwoColumnLayout.defaultProps = {
  bottomSpacing: true,
}

export default TwoColumnLayout
