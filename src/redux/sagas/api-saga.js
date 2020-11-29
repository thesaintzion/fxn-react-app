import { takeEvery, call, put } from "redux-saga/effects";
import { GET_PRODUCT_API, GET_PRODUCT_API_ERROR, GET_PRODUCT_API_REQUEST } from '../constants/action-types';
import axios from "axios";


export default function* watcherSaga() {
  yield takeEvery( GET_PRODUCT_API_REQUEST, workerSaga);
}

function* workerSaga(action){
  try {
    const payload = yield call(getProduct);
    yield put({ type: GET_PRODUCT_API, payload });

  } catch (e) {
    console.log('Error here in SAGA', e);
    yield put({ type: GET_PRODUCT_API_ERROR, payload: e });
  }
}


function getProduct() {
  return  axios.get("https://fakestoreapi.com/products").then(res => res.data);
}

