import { GET_PRODUCT_API} from '../constants/action-types';

const initialState = {
    products: [],
    singleProduct: {},
    cartProducts:  [],
}

 function rootReducer(state = initialState, action) {

     if(action.type === GET_PRODUCT_API){
         console.log("REDUCER", action)
        return Object.assign({}, state, {
            products: state.products.concat(action.payload)
          });
     }

    //  if(action.type === ADD_PRODUCT_TO_CART){
    //    return Object.assign({}, state, {
    //     cartProducts: state.cartProducts.concat(action.payload)
    //      });
    // }
    
    return state;
}

export default rootReducer;
