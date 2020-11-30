import store from './store/index';
import { getProduct } from './actions/actions';

window.store = store;
window.getProduct = getProduct();