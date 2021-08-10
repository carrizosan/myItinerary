import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import { rootReducer } from './redux/reducers/rootReducer';
import App from './App';


const myTineraryStore = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={myTineraryStore}>
        <App />
    </Provider>,
    document.getElementById('root')
)
