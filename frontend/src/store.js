import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import productListReducer from './reducers/productListReducer';
const initialState={};

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer=combineReducers({
    productList:productListReducer
});

const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;