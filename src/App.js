import React, { Component } from 'react';
import './App.css';
import {  Route, Switch } from 'react-router-dom';
import Header from './screens/header/Header';
import Products from './screens/products/Products';

class App extends  Component {

  constructor(props){
    super();
    this.state = {
      products: [],
      productsCount: localStorage.getItem('cardProducts') ? JSON.parse(localStorage.getItem('cardProducts')).length : 0,
      loading: true,
      cartProducts: [],
    }
  }

  componentDidMount(){
    this.getProductsFromLocalStorage();
   
  }


  addProductToCart = (product) => {  
    this.addToLocalStorage(product);
   }

  // Add to local storage
  addToLocalStorage = (product) =>{
  // 01. Check  if item exists...  
  let cardProducts =  localStorage.getItem('cardProducts')
  if(cardProducts){

    let itemArray = JSON.parse(cardProducts);
    let itemExist =  itemArray.filter((item) => item.id === product.id);

  if(itemExist.length > 0){
    alert("Item already in cart...");
    console.log('Exists', itemExist);
  }else{
    // Add new
    itemArray.push(product)
    let newItemString = JSON.stringify(itemArray);
    localStorage.setItem('cardProducts',  newItemString);
    console.log('Added New', product);

    alert("Item added");
  }

  }else{
    // Add for the first time
    console.log('Added first item');
    let newItem = [product];
    let newItemString = JSON.stringify(newItem);
    localStorage.setItem('cardProducts',  newItemString);

  }

  this.setState({
  productsCount: JSON.parse(localStorage.getItem('cardProducts')).length 
  })
  this.getProductsFromLocalStorage();
}


// Get from local storage
getProductsFromLocalStorage = () =>{
  let cardProducts =  localStorage.getItem('cardProducts');
  if(cardProducts){
    this.setState({loading: false});
    let itemArray = JSON.parse(cardProducts);
    console.log('Array', itemArray);

    if(itemArray.length > 0){
   
      this.setState({
        cartProducts: itemArray,
      });
    }
  }    
}

// Update local storage
updateLocalStorage = (product) =>{
  let newItemString = JSON.stringify(product);
  localStorage.setItem('cardProducts',  newItemString);
  this.getProductsFromLocalStorage();
}



  render(){  
    return (
      <>
         <Header  updateLocalStorage={this.updateLocalStorage}  cartProducts={this.state.cartProducts} productsCount={this.state.productsCount}/>
      <Switch>
      <Route exact path="/">
       <Products  addProductToCart={this.addProductToCart}/>
     </Route>

     <Route  path="/products">
       <Products addProductToCart={this.addProductToCart}/>
     </Route>

      </Switch>
      </>
      );
  }
}

export default App;
