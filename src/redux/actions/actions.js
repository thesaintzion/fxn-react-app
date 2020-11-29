import { GET_PRODUCT_API, GET_PRODUCT_API_ERROR,  GET_PRODUCT_API_REQUEST } from '../constants/action-types';

export function  getProduct() {
    return { type: GET_PRODUCT_API_REQUEST } 
}

export function getProductError() {
    return { type: GET_PRODUCT_API_ERROR}
}

