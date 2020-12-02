import React, { Component } from 'react';
import './App.css';
import {  Route, Switch } from 'react-router-dom';
import Header from './screens/header/Header';
import Products from './screens/products/Products';
import ProductCart from './screens/products/ProductCart';
import Snackbar from '@material-ui/core/Snackbar'; 

class App extends  Component {

  constructor(props){
    super();
    this.state = {
      products: [],
      productsCount: localStorage.getItem('cardProducts') ? JSON.parse(localStorage.getItem('cardProducts')).length : 0,
      loading: true,
      cartProducts: [],
      productCartDialogOpen: false,
      snackBarOpen: false,
      snackBarMessage: ''
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
    },1000);
   
   }

  // Add to local storage
  addToLocalStorage = (product) =>{ 
  let cardProducts =  localStorage.getItem('cardProducts')
  if(cardProducts){
    let itemArray = JSON.parse(cardProducts);
    let itemExist =  itemArray.filter((item) => item.id === product.id);

  if(itemExist.length > 0){
    this.snackBarShow('Product exists in cart');
  }else{
    itemArray.push(product)
    let newItemString = JSON.stringify(itemArray);
    localStorage.setItem('cardProducts',  newItemString)
    this.snackBarShow('Product added to cart');
  }

  }else{
    let newItem = [product];
    let newItemString = JSON.stringify(newItem);
    localStorage.setItem('cardProducts',  newItemString);
    this.snackBarShow('Product added to cart');
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
  this.closeProductCartDialog();
  // this.snackBarShow('Cart cleared');
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


snackBarClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  this.setState({
    snackBarOpen: false
  });
};

snackBarShow = (m) => {
  this.setState({
    snackBarOpen: true,
    snackBarMessage: m
  })
}
  render(){  
    return (
      <>
     <Snackbar  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={this.state.snackBarOpen} autoHideDuration={4000} onClose={this.snackBarClose}> 
    <div className="bg-dark text-white px-4 py-2 shadow animated  rounded-60" >{this.state.snackBarMessage}</div>
     </Snackbar>

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

      <footer className="text-center py-3  mt-5 text-muted">
      <small> Author: St. Stephen (+234 9055175876, stephen76494@gmail.com)</small>
      <br/>
      <a className="app-green-color" href="https://github.com/thesaintzion">https://github.com/thesaintzion</a>
      </footer>

      </>
      );
  }
}

export default App;
