import React from 'react'
import { th } from '@pubsweet/ui'
import { Tooltip } from 'react-tippy'
import styled, { ThemeProvider, withTheme, css } from 'styled-components'

const DefaultTooltip = ({
  authorName,
  email,
  affiliation,
  isSubmitting,
  isCorresponding,
  theme,
}) => (
  <ThemeProvider theme={theme}>
    <TooltipRoot>
      <TooltipRow>
        <Name>{authorName}</Name>
        {isSubmitting && <SpecialAuthor>Submitting Author</SpecialAuthor>}
        {isCorresponding &&
          !isSubmitting && <SpecialAuthor>Corresponding Author</SpecialAuthor>}
      </TooltipRow>
      <TooltipRow>
        <AuthorDetails>{email}</AuthorDetails>
      </TooltipRow>
      <TooltipRow>
        <AuthorDetails>{affiliation}</AuthorDetails>
      </TooltipRow>
    </TooltipRoot>
  </ThemeProvider>
)

const DefaultLabel = ({
  firstName,
  lastName,
  isSubmitting,
  isCorresponding,
  arr,
  index,
}) => (
  <Author>
    <AuthorName>{`${firstName} ${lastName}`}</AuthorName>
    {isSubmitting && <AuthorStatus>SA</AuthorStatus>}
    {isCorresponding && <AuthorStatus>CA</AuthorStatus>}
    {arr.length - 1 === index ? '' : ','}
  </Author>
)

const TooltipComponent = ({ children, component: Component, ...rest }) => (
  <Tooltip arrow html={<Component {...rest} />} position="bottom">
    {children}
  </Tooltip>
)

const AuthorWithTooltip = withTheme(TooltipComponent)

const AuthorsInfo = ({
  authors = [],
  theme,
  tooltipComponent = DefaultTooltip,
  labelComponent: DefaultComponent = DefaultLabel,
}) => (
  <AuthorList>
    {authors.map(
      (
        {
          affiliation = '',
          firstName = '',
          lastName = '',
          email = '',
          userId,
          isSubmitting,
          isCorresponding,
          ...rest
        },
        index,
        arr,
      ) => (
        <AuthorWithTooltip
          affiliation={affiliation}
          authorName={`${firstName} ${lastName}`}
          component={tooltipComponent}
          email={email}
          isCorresponding={isCorresponding}
          isSubmitting={isSubmitting}
          key={userId}
        >
          <DefaultComponent
            arr={arr}
            firstName={firstName}
            index={index}
            isCorresponding={isCorresponding}
            isSubmitting={isSubmitting}
            lastName={lastName}
          />
        </AuthorWithTooltip>
      ),
    )}
  </AuthorList>
)

export default AuthorsInfo

// #region styled-components
const defaultText = css`
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const AuthorList = styled.span`
  ${defaultText};
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const AuthorName = styled.span`
  text-decoration: underline;
  padding-left: 2px;
  cursor: default;
`
const Author = styled.div`
  padding-right: ${th('subGridUnit')};
`

const AuthorStatus = styled.span`
  border: ${th('borderDefault')};
  ${defaultText};
  text-align: center;
  text-transform: uppercase;
  padding: 0 2px;
  margin-left: 4px;
`

const TooltipRoot = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(${th('subGridUnit')}*2);
`

const TooltipRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: ${th('subGridUnit')} 0;
`

const Name = styled.span`
  color: ${th('colorSecondary')};
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeBase')};
`

const AuthorDetails = styled.span`
  color: ${th('colorSecondary')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const SpecialAuthor = styled.span`
  background-color: ${th('colorBackground')};
  color: ${th('colorTextPlaceholder')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: bold;
  margin-left: ${th('subGridUnit')};
  padding: 0 ${th('subGridUnit')};
`
// #endregion
