import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/css/bootstrap.min.css'; 
import './assets/css/animate.css'; 
import { Provider } from 'react-redux';
import store  from './redux/store';  
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();





