import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill"
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

import 'materialize-css/dist/css/materialize.min.css';
import App from './containers/App';
import store from './store';
import './scss/index.scss'
import Wrapper from './Wrapper';

ReactDOM.render(
  <Wrapper>
    <App /> 
  </Wrapper>
  ,
  document.getElementById('root')
);
