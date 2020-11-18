/**
 * This file (and folder) are only meant to provide a playground for pubsweet
 * client. They will not be provided in the package distribution build.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled, { createGlobalStyle, css } from 'styled-components'
import { gql, useQuery } from '@apollo/client'
import { v4 as uuid } from 'uuid'

import Root from '../src/components/Root'

const GET_THOSE_RATES = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

const theme = {
  colorBackground: 'lavender',
  colorBorder: 'lightslategray',
  colorCurrency: 'navy',
  colorRate: 'crimson',
}

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  #root {
    height: 100%;

    > div {
      height: 100%;
      
      > div {
        height: 100%;
      }
    }
  }
`

const Container = styled.div`
  background: ${props => props.theme.colorBackground};
  display: flex;
  flex-direction: column;
  min-height: 100%;

  /* stylelint-disable-next-line no-descending-specificity */
  > div:first-child {
    align-self: center;
    margin: 20px 0;
  }

  a {
    padding: 4px;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      outline: 2px solid ${props => props.theme.colorBorder};
    }
  }

  ${props =>
    props.second &&
    css`
      align-items: center;
      justify-content: center;
    `}
`

const StyledItem = styled.div`
  border: 1px solid ${props => props.theme.colorBorder};
  border-radius: 5px;
  padding: 10px;
  margin: 5px 25px;
`

const Currency = styled.span`
  color: ${props => props.theme.colorCurrency};
  margin-right: 10px;
`

const Rate = styled.span`
  color: ${props => props.theme.colorRate};
`

const StyledItemList = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = props => {
  const { currency, rate } = props

  return (
    <StyledItem>
      <Currency>{currency}</Currency>
      <Rate>{rate}</Rate>
    </StyledItem>
  )
}

const ItemList = props => {
  const { data, loading } = props

  return (
    <>
      {loading && <span>loading</span>}

      <StyledItemList>
        {!loading &&
          data &&
          data.rates &&
          data.rates.map(item => (
            <Item currency={item.currency} key={uuid()} rate={item.rate} />
          ))}
      </StyledItemList>
    </>
  )
}

const First = () => {
  const { data, loading } = useQuery(GET_THOSE_RATES)

  return (
    <Container>
      <div>
        <Link to="/second">Change page</Link>
      </div>

      <ItemList data={data} loading={loading} />
    </Container>
  )
}

const Second = () => (
  <Container second>
    <div>
      <Link to="/">Go back</Link>
    </div>
  </Container>
)

const routes = (
  <Switch>
    <Route component={First} exact path="/" />
    <Route component={Second} exact path="/second" />
  </Switch>
)

const history = createBrowserHistory()
const rootEl = document.getElementById('root')

ReactDOM.render(
  <>
    <GlobalStyle />
    <Root
      connectToWebSocket={false}
      history={history}
      routes={routes}
      theme={theme}
    />
  </>,
  rootEl,
)
