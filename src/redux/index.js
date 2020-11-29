import store from './store/index';
import { addPost } from './actions/actions';

window.store = store;
window.addPost = addPost;