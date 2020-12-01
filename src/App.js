import React, { Component } from 'react';
import './App.css';
import {  Route, Switch } from 'react-router-dom';
import Header from './screens/header/Header';
import Products from './screens/products/Products';
import ProductCart from './screens/products/ProductCart';

class App extends  Component {

  constructor(props){
    super();
    this.state = {
      products: [],
      productsCount: localStorage.getItem('cardProducts') ? JSON.parse(localStorage.getItem('cardProducts')).length : 0,
      loading: true,
      cartProducts: [],
      productCartDialogOpen: false
    }
  }

  componentDidMount(){
    this.getProductsFromLocalStorage();
  
  }


  addProductToCart = (product) => {  
    this.addToLocalStorage(product);

    setTimeout( () => {
      this.setState({
        productCartDialogOpen: true
      })
    },2000);
   
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
    localStorage.setItem('cardProducts',  newItemString)
    alert("Product added to cart");
  }

  }else{

    let newItem = [product];
    let newItemString = JSON.stringify(newItem);
    localStorage.setItem('cardProducts',  newItemString);
    alert("Product added to cart");
  }

  this.updateProductsCount();
  this.getProductsFromLocalStorage();
}


// Get from local storage
getProductsFromLocalStorage = () =>{
  let cardProducts =  localStorage.getItem('cardProducts');
  if(cardProducts){
    this.setState({loading: false});
    let itemArray = JSON.parse(cardProducts);
    // console.log('Array', itemArray);
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


// remove single Cart Product 
removeCartProduct = (id) =>{
  let newItemString = '';
  let cardProducts =  localStorage.getItem('cardProducts')
  let itemArray = JSON.parse(cardProducts);

  console.log(itemArray.length)

  if(itemArray.length === 1){
    this.clearCart();
  }else{
    let filteredArray =  itemArray.filter((item) => item.id !== id);
    newItemString = JSON.stringify(filteredArray);
    localStorage.setItem('cardProducts',  newItemString);
  }
 
  this.getProductsFromLocalStorage();
}


// clear all Cart products
clearCart = () => {
  localStorage.removeItem('cardProducts');
  this.getProductsFromLocalStorage();
  this.closeProductCartDialog()
  alert('Cart cleared');
}

// Update  count 
updateProductsCount = () => {
  this.setState({
    productsCount: localStorage.getItem('cardProducts') ? JSON.parse(localStorage.getItem('cardProducts')).length  : 0
    })
}

// openProductCartDialog
openProductCartDialog = () => {
  if(this.state.productsCount > 0){
    this.setState({
      productCartDialogOpen: true
    })
  }
}

// Close cart
closeProductCartDialog = () =>{
  this.setState({
    productCartDialogOpen: false
  });

  this.updateProductsCount();
}


  render(){  
    return (
      <>
    <ProductCart  removeCartProduct={this.removeCartProduct}  clearCart={this.clearCart} cartProducts={this.state.cartProducts} updateLocalStorage={this.updateLocalStorage}  closeProductCartDialog={this.closeProductCartDialog} open={this.state.productCartDialogOpen}/> 
    <Header openProductCartDialog={this.openProductCartDialog}  productsCount={this.state.productsCount}/>
     
      <Switch>
      <Route exact path="/">
       <Products  addProductToCart={this.addProductToCart}/>
     </Route>

     <Route  path="/products">
       <Products  addProductToCart={this.addProductToCart}/>
     </Route>

      </Switch>
      </>
      );
  }
}

export default App;
