import React, { Component } from 'react'
import SingleProduct from './SingleProduct';
import './products.css';
import {connect} from 'react-redux';
import ViewSingleProduct from './ViewSingleProduct';
import { getProduct } from '../../redux/actions/actions';


// Map this state to prop.. (redux)
const mapStateToProp = (state) => {
   return {products: state.products}
}

 class Products extends Component {
    constructor(props){
        super();
        this.state = {
            open: false,
            products: props.products ? props.products : []
        }
    }

     openDialog = () => {
        this.setState({
            open: true
        })
    }

    closeDialog = () => {
        this.setState({
            open: false
        })
    }

    componentDidMount(){
        console.log('This Props', this.props);
        this.props.getProduct();
    }

    render() {
        return (
            <>
             <ViewSingleProduct closeDialog={this.closeDialog} open={this.state.open}/>
            <main className="pb-3 pt-5">
                <div className="container">
                    <h6 className="mb-4 ">Products</h6>
                    <div className="row animated fadeInUp">
                        { this.state.products.length > 0 ? this.state.products.map(product => (
                        <div key={product.id} onClick={this.openDialog} className="col-lg-3 mb-5">
                        <SingleProduct  product={product}/>
                       
                        </div>
                        )) : <p className="text-center col">No Products Found</p>}
                    </div>
               </div>
               </main>
            </>
        )
    }
}


export default connect(mapStateToProp, { getProduct })(Products);