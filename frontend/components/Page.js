import React, { Component } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Header from './Header'
import Meta from './Meta'

const theme = {
  green: '#6ccd14',
  black: '#393939',
  grey: '#3a3a3a',
  lightgrey: '#e1e1e1',
  offWhite: '#ededed',
  maxWidth: '1000px',
  boxShadow: '0 12px 24px 0 rgba(0, 0, 0, .09)',
}

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`
const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`
injectGlobal`
@font-face {
  font-family: Raleway, sans-serif;
  src: url('/static/raleway-v12-latin-regular.woff2')
  format('woff2');
  font-style: normal;
  font-weight: 400;
}
html {
  box-sizing: border-box;
  font-size: 10px;
}
*, *::before, *::after {
  box-sizing: inherit;
}
body {
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  line-height: 2;
  font-family: Raleway, sans-serif;
}
a {
  text-decoration: none;
  color: ${theme.black};
}
`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page
