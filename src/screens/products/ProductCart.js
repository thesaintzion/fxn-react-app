import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Slide from '@material-ui/core/Slide';
import  ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MakePayment from './MakePayment';



// Animate dialog from left
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

class ProductCart extends React.Component {
    constructor(props){
        super();
        this.state = {
          totalPrice:  0,
          loading: true,
          products: [],
          makePayment: false
          
        }
      }


// Get total Price
  totalPrice = () =>{
    return this.props.cartProducts ? this.props.cartProducts.reduce((sum, { price, amount }) => sum + price * amount, 0) : 0
  }


    // Make payment
  makePayment = () => {
    this.setState({
      makePayment: true
    })
  }

  cancelPayment = () => {
    this.setState({
      makePayment: false
    })
  }

   //  Close dialog
   closeProductCartDialog = () =>{
    this.props.closeProductCartDialog();
    }

    onChange = (product, e) =>{
       e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value > 0 ? e.target.value : 1,
      });

      let cardProducts =  localStorage.getItem('cardProducts');
      let itemArray = JSON.parse(cardProducts);
      itemArray.find((item) => item.id === product.id).amount = e.target.value;
      this.props.updateLocalStorage(itemArray);
    }

    removeCartProduct = (id) => {
     console.log('Prod Car', this.props)
    // this.props.removeCartProduct(id);
   }
    

     render() {
       return (
         <div>
             <Dialog className="product-view-dialog dialog-green-light-bg" open={this.props?.open} onClose={this.closeProductCartDialog}  scroll="paper" TransitionComponent={Transition} >
           <AppBar  position="sticky" className=" app-green-bg">
             <Toolbar variant="dense"  className="d-flex justify-content-between">
               <div className="d-flex align-items-center">
               <IconButton  onClick={this.closeProductCartDialog} edge="start" color="inherit" aria-label="close">
                 <ArrowBackIcon />
               </IconButton>
               <Typography variant="h6" className="ml-3">
                <span className="mr-3">Cart</span> 
                <Badge badgeContent={this.props?.cartProducts?.length} color="secondary">
                  <ShoppingCartIcon/>
                  </Badge>
                </Typography>
                </div>
              
              <div>
              <Button className="app-green-light-bg" onClick={this.props.clearCart}>CLear</Button>
              </div>
             </Toolbar>
           </AppBar>

           {this.props?.loading ? 
            <div className="text-center">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div> : 
            <main className="pb-3 pt-5 app-green-light-b mh-100">
                <div className="container px-lg-4">  
                        {this.state.makePayment ? <MakePayment clearCart={this.props.clearCart} cancelPayment={this.cancelPayment}  amount={this.totalPrice()}/> 
                        :
                        <div>
                        { this.props?.cartProducts?.length > 0 ? this.props?.cartProducts?.map(product => (

                        <div key={product.id}  className="shadow-sm rounded-10 mb-3 overflow-hidden d-flex justify-content-between align-items-center bg-white">
                        <div>
                          <img  width="100"  src={product?.image}  alt={product?.title}/>
                        </div>

                        <div className="w-100 py-2 px-3 bg-white">
                        <p className="mb-0" >{product?.title}</p>
                        
                        <p  className="app-green-color mb-0"> 
                        &#8358;{product?.price?.toLocaleString(undefined, {maximumFractionDigits:2})}
                        </p>

                    <div className="d-flex mt-3 justify-content-end align-items-center">
                      <div className="mr-5 text-right">
                      
                    <TextField  className="d-inline-block w-50" label="Quantity" variant="outlined" type="number" onChange={(e) =>  this.onChange(product, e)} name="amount" defaultValue={product?.amount} size="small" />
                      </div>

                      <div>
                      <IconButton onClick={() => this.props.removeCartProduct(product.id)} title="Remove item?" edge="start" color="inherit" aria-label="remove">
                          <CloseIcon  className="text-danger"  />
                      </IconButton>
                      </div>
                      </div>     
                        </div>
                        </div>
                        )) : <p className="text-center col mt-5">No Products Found</p>}
                        

                      <div  className="mt-4 mb-5 pr-3">
                          <li  className="text-right">Total Price:  <h3 className="app-green-color mb-0">&#8358;{this.totalPrice().toLocaleString(undefined, {maximumFractionDigits:2})}</h3></li>
                      </div>
                           <br/>  
                  <div className="text-center mt-5 mb-5 d-flex justify-content-around flex-wrap">
                  <Button onClick={this.closeProductCartDialog} className="rounded-60 app-green-color bg-white shadow-sm"><ArrowBackIcon/> <span> Continue Shopping </span></Button>  <Button  onClick={this.makePayment} className="rounded-60 app-green-bg text-white shadow-sm"><span> Make Payment </span> <ArrowForwardIcon/></Button>
                </div>

                </div>
     }

               </div>


               </main>
    }

         </Dialog>
         </div>
       )
     }
}

export default ProductCart;

