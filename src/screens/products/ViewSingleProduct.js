import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide';
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
      product: {},
     }
   }

   componentDidMount(){
    this.getProduct();
  }

  //  Close dialog
  closeViewProductDialog = () =>{
    this.props.closeViewProductDialog();
    }

    // Get product from API
    getProduct = () => {
      if(this.props?.id){
        axios.get(`https://fakestoreapi.com/products/${this.props?.id}`).then(res => {
          let cloneData = {...res.data};
          cloneData.amount = 1;
          this.setState({
            product: cloneData,
            loading: false
        }); 
        }).catch(err => {
            this.setState({
                error: err,
                loading: false
            }); 
            
        })
      }
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
          this.props.closeViewProductDialog();
          this.props.addProductToCart(this.state.product);
      }


  render() {
    return (
      <div>

        {/* Cart Dialog */}
       
   


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
      <div className="container mt-5">
      {this.state.loading ?  
           <div className="text-center w-100">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
            :
            <div className="row">
            <div className="col-lg-6">
            <img src={this.state.product?.image} className="w-100  shadow-sm rounded-10" alt={this.state.product?.title}/>
            </div>
            
            <div className="col-lg-6">
            <h6  className="app-green-color mb-0 mb-3 mt-4"> 
             &#8358;{this.state.product?.price?.toLocaleString(undefined, {maximumFractionDigits:2})}
            </h6>
     
            <p className="mb-3">Category: <span> {this.state.product?.category}</span></p>

            <p className="app-green-light-bg p-2 rounded-10 ">{this.state.product?.description}</p>
   
            <div className="text-center  mb-5">
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



