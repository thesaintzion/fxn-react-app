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
import iphone from '../../assets/img/iphone.jpg';
import  ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button'


// Animate dialog from left
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

class ProductCart extends React.Component {
    constructor(props){
        super();
        this.state = {
          totalPrice: 0,
          loading: true,
         products: []
        }
      }

      componentDidMount(){
        this.getProductsFromLocalStorage();
          
      }



   

    // Get items from local storage
    getProductsFromLocalStorage = () =>{
      let cardProducts =  localStorage.getItem('cardProducts');
      if(cardProducts){
        this.setState({loading: false});
        let itemArray = JSON.parse(cardProducts);
        console.log('itemArray', itemArray);
        if(itemArray.length > 0){

          this.setState({
            products: itemArray
          })

          itemArray.forEach(item => {
            this.setState({
              totalPrice: +item.price
            })
          });
          
        


        }
      }    
    }


    // Make payment
  makePayment = () => {
    // this.setState({loading: true});
    this.props.closeProductCartDialog();
  }


   //  Close dialog
   closeProductCartDialog = () =>{
    this.props.closeProductCartDialog();
    }

  


   
     render() {
       return (
         <div>
             <Dialog className="product-view-dialog" open={this.props?.open} onClose={this.closeProductCartDialog}  scroll="paper" TransitionComponent={Transition} >
           <AppBar  position="sticky" className=" app-green-bg">
             <Toolbar variant="dense" >
               <IconButton  onClick={this.closeProductCartDialog} edge="start" color="inherit" aria-label="close">
                 <ArrowBackIcon />
               </IconButton>
               <Typography variant="h6">
                <span className="mr-4">Cart</span> 
                  <Badge badgeContent={this.state?.products?.length} color="secondary">
                  <ShoppingCartIcon/>
                  </Badge>
               </Typography>
             </Toolbar>
           </AppBar>

           {this.state.loading ? 
            <div className="text-center">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div> : 
            <main className="pb-3 pt-5 app-green-light-b mh-100">
                <div className="container">  
                        { this.state?.products?.length > 0 ? this.state.products.map(product => (

                        <div key={product.id}  className="shadow-sm rounded-10 mb-3 overflow-hidden d-flex justify-content-between bg-white">
                        <div>
                          <img  width="100" height="100" src={iphone} />
                        </div>
                        <div className="w-100 py-2 px-3 border-left">
                        <p className="mb-0" >{product?.title}</p>
                        <p  className="app-green-color mb-0"> 
                        &#8358;{product?.price?.toLocaleString(undefined, {maximumFractionDigits:2})}
                          </p>

                    <div className="d-flex justify-content-end align-items-center">
                      <div className="mr-5">
                    <input title="item amount" className="bg-light border-0 rounded pl-2" value={product?.amount?.toString()} type="number"></input>
                      </div>

                      <div>
                      <IconButton title="Remove item?" edge="start" color="inherit" aria-label="remove">
                                    <CloseIcon className="text-danger"  />
                      </IconButton>
                      </div>
                      </div>     
                        </div>
                        </div>
                        )) : <p className="text-center col mt-5">No Products Found</p>}
                        
                    

           <div  className="mt-4 mb-5 pr-3">
           {/* <li className="text-right">Total Product:  <strong>{this.state?.products?.length}</strong></li> */}
                        <li  className="text-right">Total Amount:  <h3 className="app-green-color mb-0">&#8358; {this.state?.totalPrice?.toLocaleString(undefined, {maximumFractionDigits:2})}</h3></li>
           </div>
                       
           

                  <div className="text-center mt-5">
                  <Button  onClick={this.makePayment} className="rounded-60 app-green-bg text-white px-3"><span> Make Payment </span> <ArrowForwardIcon/></Button>
                </div>

               </div>
               </main>
    }

         </Dialog>
         </div>
       )
     }
}

export default ProductCart;

