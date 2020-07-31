import React from 'react';
import './PageContainer.sass'
import Header from './Header/Header'
import ChatBody from './ChatBody/ChatBody'
import TabItem from './TabItem/TabItem'
import {BrowserRouter, Route} from 'react-router-dom'

export default (props) => (
  <div className="chatContainer">
    <Header />
    {/* <ChatBody />
    <InputArea /> */}
    <Route exact path="/"/>
    <Route path="/films" component={TabItem}/>
    <Route path="/people" component={TabItem}/>
    <Route path="/planets" component={TabItem}/>
    <Route path="/species" component={TabItem}/>
    <Route path="/starships" component={TabItem}/>
    <Route path="/vehicles" component={TabItem}/>
  </div>
)
