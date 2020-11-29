import { GET_PRODUCT_API, GET_PRODUCT_API_ERROR } from '../constants/action-types';

const initialState = {
    products: [],
}

 function rootReducer(state = initialState, action) {

     if(action.type === GET_PRODUCT_API){
         console.log("REDUCER", action)
        return Object.assign({}, state, {
            products: state.products.concat(action.payload)
          });
     }
    return state;
}

export default rootReducer;
