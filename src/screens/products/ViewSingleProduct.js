import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide';
import iphone from '../../assets/img/iphone.jpg';
import axios from "axios";
import  AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ProductCart from './ProductCart';


// Animate dialog from left
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });


 class ViewSingleProduct extends React.Component {
   constructor(props){
     super();
     this.state = {
       loading: true,
      productCartDialogOpen: false,
      product: {
        "id": 4,
      "title": "Mens Casual Slim Fit",
      "price": 15.99,
      "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      "category": "men clothing",
      "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "amount": 1
        },
       
     }
   }

  //  Close dialog
  closeViewProductDialog = () =>{
    this.props.closeViewProductDialog();
    }

    // Get product from API
    getProduct = () => {
    axios.get("https://fakestoreapi.com/products/1").then(res => {
      console.log('Got product', res.data);
      this.setState({
        product: res.data
    }); 
    }).catch(err => {
        console.log('Got error', err);
        this.setState({
            error: err
        }); 
    })
    }

    // Close Product Cart Dialog
    openProductCartDialog = () =>{
    this.setState({
      productCartDialogOpen: true
    })
    }

    // Close Product Cart Dialog
    closeProductCartDialog = () =>{
      this.setState({
        productCartDialogOpen: false
      })
      }

      
    // Add product to cart
    addProductToCart = () =>{
       this.addToLocalStorage();
      this.props.closeViewProductDialog();
      setTimeout( () => {
        this.openProductCartDialog();
      }, 1000)
     
     
      }

      // Add to local storage
      addToLocalStorage = () =>{
        // 01. Check  if item exists...  
        let cardProducts =  localStorage.getItem('cardProducts')
        if(cardProducts){

          let itemArray = JSON.parse(cardProducts);
          let itemExist =  itemArray.filter((item) => item.id === this.state.product.id);

        if(itemExist.length > 0){
         alert("Item already in cart...");
          console.log('Exists', itemExist);
        }else{
          // Add new
          itemArray.push(this.state.product)
          let newItemString = JSON.stringify(itemArray);
          localStorage.setItem('cardProducts',  newItemString);
          console.log('Added New', this.state.product);

          alert("Item added");
        }

        }else{
          // Add for the first time
          console.log('Added first item');
          let newItem = [this.state.product];
          let newItemString = JSON.stringify(newItem);
          localStorage.setItem('cardProducts',  newItemString);

       }
      }

      componentDidUpdate(){
        setTimeout( () => {
          this.setState({loading: false})
        }, 2000);
      }
  


  render() {
    return (
      <div>

        {/* Cart Dialog */}
    <ProductCart  closeProductCartDialog={this.closeProductCartDialog} open={this.state.productCartDialogOpen}/>

          <Dialog className="product-view-dialog" open={this.props?.open} onClose={this.closeViewProductDialog}  scroll="paper" TransitionComponent={Transition} >
        <AppBar  position="sticky" className=" app-green-bg">
          <Toolbar variant="dense" >
            <IconButton onClick={this.closeViewProductDialog} edge="start" color="inherit" aria-label="close">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
             {this.state.product?.title}
            </Typography>
          </Toolbar>
        </AppBar>
      <div className="container mt-4">
      {this.state.loading ?  
           <div className="text-center w-100">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
            :
            <div className="row">
            <div className="col-lg-6">
                  <img src={iphone} className="w-100  border rounded-10"/>
            {/* <img src={product?.image} className="w-100  border rounded-10"/> */}
            </div>
            
            <div className="col-lg-6">
            <h6  className="app-green-color mb-0 mb-3 mt-4"> 
            &#8358;{this.state.product?.price?.toLocaleString(undefined, {maximumFractionDigits:2})}
            </h6>
     
            <p className="mb-4">Category: {this.state.product?.category}</p>
            <p className="bg-light p-2 rounded-10 ">{this.state.product?.description}</p>
   
            <div className="text-center p-3">
            <Button  onClick={this.addProductToCart} className="rounded-60 mt-5 app-green-bg text-white px-3"><span>Add to cart </span> <AddShoppingCartIcon/></Button>
            </div>
              </div>
  
          </div>
      }

       
      </div>
             
      </Dialog>
      </div>
    )
  }
}

export default ViewSingleProduct;



