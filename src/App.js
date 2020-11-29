import React, { Component } from 'react';
import './App.css';
import {  Route, Switch } from 'react-router-dom';
import Header from './screens/header/Header';
import Products from './screens/products/Products';

class App extends  Component {

  render(){
    return (
      <>
         <Header/>
      <Switch>
      <Route exact path="/">
       <Products/>
     </Route>

     <Route  path="/products">
       <Products/>
     </Route>

      </Switch>
      </>
      );
  }
}

export default App;
