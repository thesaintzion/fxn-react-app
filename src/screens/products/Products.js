import React, { Component } from 'react'
import SingleProduct from './SingleProduct';
import './products.css';
import ViewSingleProduct from './ViewSingleProduct';
import axios from "axios";
import Loading from '../Loading';


 class Products extends Component {
    constructor(props){
        super();
        this.state = {
            viewProductDialogOpen: false,
            products: [],
            selectedProduct: '',
            loading: true,
            errorMsg: ''
        }
    }

    componentDidMount(){
        this.getProducts();
    }



     openViewProductDialog = (id) => {
        this.setState({
            viewProductDialogOpen: true,
            selectedProduct: id
        })
    }

    closeViewProductDialog = () => {
        this.setState({
            viewProductDialogOpen: false
        })
    }


    // Get products fro api
    getProducts = () =>{
          axios.get("https://fakestoreapi.com/products").then(res => {
            this.setState({
                products: res.data.length > 0 ?  res.data : [],
                loading: false
            });
            }).catch(err => {
                console.log('Got error', err);
                this.setState({
                    errorMsg: err,
                    loading: false
                }); 
            })
      }

    //   Add to cart
      addProductToCart = (product) => {
          this.props.addProductToCart(product);
      }

  
  

    render() {
       
        return (
            <>
            { this.state.viewProductDialogOpen ? <ViewSingleProduct  removeCartProduct={this.props.removeCartProduct}  clearCart={this.props.clearCart} id={this.state.selectedProduct}  addProductToCart={this.addProductToCart}  closeViewProductDialog={this.closeViewProductDialog} open={this.state.viewProductDialogOpen}/> : null }

             {this.state.loading ? <Loading/> : 
            <main className="pb-3 pt-5 ">
                <div className="container">
                    {/* <h6 className="mb-4 ">Products</h6> */}
                    <div className="row animated fadeInUp">
                        { this.state.products.length > 0 ? this.state.products.map(product => (

                        <div key={product.id} onClick={() => this.openViewProductDialog(product.id)} className="col-lg-3 mb-5">
                        <SingleProduct  product={product}/>
                       
                        </div>
                        )) : <p className="text-center col mt-5">No Products Found</p>}
                    </div>
               </div>
               </main>
    }
            </>
        )
    }
}


export default Products;