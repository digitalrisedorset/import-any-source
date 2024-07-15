import React from 'react';
import Header from "./Header";
import { GlobalStyles } from "./components/styles/Global";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Woocommerce } from "./components/woocommerce";
import { Magento } from "./components/magento";
import { Map } from './components/mapping'
import { FlashMessages } from './components/FlashMessages'
import { NotFound } from './components/NotFound'
import { Page } from "./Page";
import { Import } from "./components/woocommerce/Import";

export default function App() {
  return (<Page>
    <GlobalStyles/>
    <BrowserRouter>
      <Header title="Welcome on the Import Attribute Reader"/>
        <FlashMessages />
        <Routes>
          <Route path="/" element={<Import/>}/>
          <Route path="/magento" element={<Magento/>}/>
          <Route path="/woocommerce" element={<Woocommerce/>}/>
          <Route path="/woocommerce/:initialAttribute/:matchingAttribute" element={<Woocommerce />}/>
          <Route path="/map/:code" element={<Map/>}/>
          <Route path="/map" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
  </Page>)
}