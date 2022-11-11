import React from 'react';
import  ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ToggleColorModeProvider from './utils/ToggleColorMode';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './app/store'
import './index.css'

ReactDOM.render(
    <Provider store={store}>
    <ToggleColorModeProvider>
    <BrowserRouter>
     < App/>
    </BrowserRouter>
    </ToggleColorModeProvider>
    </Provider>
,document.getElementById('root'));