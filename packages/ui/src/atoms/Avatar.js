import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

const statusColor = props =>
  ({
    declined: props.theme.colorError,
    pending: props.theme.colorSecondary,
  }[props.status] || props.theme.colorPrimary)

const Container = styled.svg.attrs(() => ({
  viewBox: '0 0 105 70',
  xmlns: 'http://www.w3.org/2000/svg',
}))`
  width: calc(${th('gridUnit')} * 9);
  height: calc(${th('gridUnit')} * 6);
`

const Persona = styled.path.attrs(() => ({
  d:
    ' M 47.666 50.14 C 44.947 49 41.588 47.535 41.588 46.395 L 41.588 39.07 C 45.587 35.977 47.986 31.093 47.986 26.047 L 47.986 16.279 C 47.986 7.326 40.788 0 31.991 0 C 23.193 0 15.995 7.326 15.995 16.279 L 15.995 26.047 C 15.995 31.093 18.395 36.14 22.393 39.07 L 22.393 46.395 C 22.393 47.372 19.034 48.837 16.315 50.14 C 9.757 52.907 0 57.14 0 68.372 L 0 70 L 63.981 70 L 63.981 68.372 C 63.981 57.14 54.224 52.907 47.666 50.14 Z ',
}))`
  display: block;
  fill: ${statusColor};
`

const Check = styled.path.attrs(() => ({
  d: ` M 60.106 37.467 C 59.299 36.645 58.895 35.617 58.895 34.486 C 58.895 33.458 59.299 32.43 60.106 31.608 C 60.813 30.888 61.823 30.375 62.934 30.375 C 64.045 30.375 65.055 30.888 65.762 31.608 L 74.246 40.242 L 93.132 21.021 C 93.839 20.301 94.95 19.89 95.96 19.89 C 97.071 19.89 98.081 20.301 98.788 21.021 C 99.596 21.843 100 22.871 100 24.002 C 100 25.03 99.596 26.057 98.788 26.88 L 74.246 51.857 L 60.106 37.467 Z `,
}))`
  display: ${props => (props.status === 'accepted' ? 'block' : 'none')};
  fill: ${statusColor};
`

const X = styled.path.attrs(() => ({
  d: ` M 70.964 37.518 L 62.025 46.615 C 61.217 47.54 60.712 48.671 60.712 49.904 C 60.712 51.138 61.217 52.268 62.025 53.091 C 62.934 54.016 64.045 54.427 65.257 54.427 C 66.469 54.427 67.58 54.016 68.388 53.091 L 77.326 43.994 L 86.265 53.091 C 87.173 54.016 88.284 54.427 89.496 54.427 C 90.708 54.427 91.819 54.016 92.627 53.091 C 93.536 52.268 93.94 51.138 93.94 49.904 C 93.94 48.671 93.536 47.54 92.627 46.615 L 83.689 37.518 L 92.627 28.422 C 93.536 27.599 93.94 26.469 93.94 25.235 C 93.94 24.002 93.536 22.871 92.627 21.946 C 91.819 21.124 90.708 20.61 89.496 20.61 C 88.284 20.61 87.173 21.124 86.265 21.946 L 77.326 31.043 L 68.388 21.946 C 67.58 21.124 66.469 20.61 65.257 20.61 C 64.045 20.61 62.934 21.124 62.025 21.946 C 61.217 22.871 60.712 24.002 60.712 25.235 C 60.712 26.469 61.217 27.599 62.025 28.422 L 70.964 37.518 Z`,
}))`
  display: ${props => (props.status === 'declined' ? 'block' : 'none')};
  fill: ${statusColor};
`

const QuestionMark = styled.path.attrs(() => ({
  d: ` M 79.674 23.203 L 79.674 23.203 Q 83.397 23.203 85.424 25.077 L 85.424 25.077 L 85.424 25.077 Q 87.451 26.95 87.451 29.771 L 87.451 29.771 L 87.451 29.771 Q 87.451 31.75 86.728 33.14 L 86.728 33.14 L 86.728 33.14 Q 86.003 34.529 85.011 35.371 L 85.011 35.371 L 85.011 35.371 Q 84.018 36.214 82.404 37.224 L 82.404 37.224 L 82.404 37.224 Q 80.625 38.361 79.798 39.182 L 79.798 39.182 L 79.798 39.182 Q 78.97 40.003 78.97 41.308 L 78.97 41.308 L 78.97 41.308 Q 78.97 41.94 79.094 42.319 L 79.094 42.319 L 72.971 43.287 L 72.971 43.287 Q 72.64 42.024 72.64 41.098 L 72.64 41.098 L 72.64 41.098 Q 72.64 39.203 73.282 37.898 L 73.282 37.898 L 73.282 37.898 Q 73.923 36.593 74.833 35.814 L 74.833 35.814 L 74.833 35.814 Q 75.743 35.035 77.15 34.108 L 77.15 34.108 L 77.15 34.108 Q 78.681 33.056 79.405 32.298 L 79.405 32.298 L 79.405 32.298 Q 80.129 31.54 80.129 30.403 L 80.129 30.403 L 80.129 30.403 Q 80.129 29.603 79.653 29.203 L 79.653 29.203 L 79.653 29.203 Q 79.177 28.803 78.35 28.803 L 78.35 28.803 L 78.35 28.803 Q 76.405 28.803 74.006 31.245 L 74.006 31.245 L 70.282 27.708 L 70.282 27.708 Q 74.171 23.203 79.674 23.203 L 79.674 23.203 Z  M 75.371 53.94 L 75.371 53.94 Q 73.84 53.94 72.93 52.951 L 72.93 52.951 L 72.93 52.951 Q 72.02 51.961 72.02 50.445 L 72.02 50.445 L 72.02 50.445 Q 72.02 48.635 73.24 47.33 L 73.24 47.33 L 73.24 47.33 Q 74.461 46.024 76.24 46.024 L 76.24 46.024 L 76.24 46.024 Q 77.77 46.024 78.681 47.014 L 78.681 47.014 L 78.681 47.014 Q 79.591 48.003 79.591 49.561 L 79.591 49.561 L 79.591 49.561 Q 79.591 51.414 78.37 52.677 L 78.37 52.677 L 78.37 52.677 Q 77.15 53.94 75.371 53.94 L 75.371 53.94 Z `,
}))`
  display: ${props => (props.status === 'pending' ? 'block' : 'none')};
  fill: ${statusColor};
`

const ReviewerText = styled.text`
  fill: ${th('colorPrimary')};
  font-family: 'Fira Sans Condensed', sans-serif;
  font-size: 50px;
  font-style: normal;
  font-weight: 600;
  stroke: none;
  text-transform: uppercase;
`

const Reviewer = ({ status, letter }) => {
  if (status !== 'submitted') {
    return <g />
  }

  return (
    <g transform="matrix(1.01,0,0,1.028,64.651,6.065)">
      <ReviewerText transform="matrix(1,0,0,1,0,46.75)">{letter}</ReviewerText>
    </g>
  )
}

const STATUSES = ['accepted', 'pending', 'declined', 'submitted']

const Avatar = ({ status, reviewerLetter }) => {
  status = status.toLowerCase()
  if (!STATUSES.includes(status)) {
    status = 'default'
  }

  return (
    <Container>
      <Persona status={status} />
      <Check status={status} />
      <X status={status} />
      <QuestionMark status={status} />
      <Reviewer letter={reviewerLetter} status={status} />
    </Container>
  )
}

export default Avatar
