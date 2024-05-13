import React from 'react';
import Header from "./Header";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Woocommerce } from "./components/woocommerce";
import { Magento } from "./components/magento";
import { Map } from './components/mapping'
import { FlashMessages } from './components/FlashMessages'
import { NotFound } from './components/NotFound'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default function App() {
  return (<div className="App">
    <GlobalStyles/>
    <BrowserRouter>
      <Header title="Welcome on the Import Attribute Reader"/>
      <FlashMessages />
      <Routes>
        <Route path="/magento" element={<Magento/>}/>
        <Route path="/woocommerce" element={<Woocommerce/>}/>
        <Route path="/woocommerce/:initialAttribute/:matchingAttribute" element={<Woocommerce />}/>
        {/*<Route path="/mapping" element={<Mapping/>}/>*/}
        <Route path="/map/:code" element={<Map/>}/>
        <Route path="/map" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </div>)
}