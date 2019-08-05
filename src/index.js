// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import { createStore } from 'redux';
// import reducer from './Store/reducer';
// import { Provider } from 'react-redux';


// const store = createStore(reducer);

// ReactDOM.render(<Provider store={store}> <App /></Provider>,
//   document.getElementById('root')
// );
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import Root from './Routes/ReactRoute'
import reducer from './Store/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers());

render(<Root store={store} />, document.getElementById('root'))


