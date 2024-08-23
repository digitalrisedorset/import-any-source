import React from 'react';
import {Header} from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CatalogSource } from "../../catalog-source/components";
import { Magento } from "../../magento/components";
import { Map } from '../../mapping/components'
import { FlashMessages } from './FlashMessages'
import { NotFound } from './NotFound'
import { Page } from "./Page";
import { Import } from "../../catalog-source/components/Import";
import { Config} from "../../configuration/components/Config"
import {Sign} from "../../user-authentication/components/Sign";
import {Account} from "../../user-authentication/components/Account";

export const App = () => {
  return (<Page>
    <BrowserRouter>
      <FlashMessages />
      <Header />
        <Routes>
          <Route path="/" element={<Import/>}/>
          <Route path="/signin" element={<Sign />}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/config" element={<Config />} />
          <Route path="/magento" element={<Magento/>}/>
          <Route path="/catalog-source" element={<CatalogSource/>}/>
          <Route path="/catalog-source/:initialAttribute/:matchingAttribute" element={<CatalogSource />}/>
          <Route path="/map/:code" element={<Map/>}/>
          <Route path="/map" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
  </Page>)
}