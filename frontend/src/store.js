import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import productListReducer, { productDetailsReducer,addProductReducer } from './reducers/productListReducer';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, listUsers } from './reducers/userReducer';
import {orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer} from './reducers/orderReducer';

const initialState={
    userSignin:{
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) :null
    },
    cart:{
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] ,
        shippingDetails: localStorage.getItem("shippingDetails") ? JSON.parse(localStorage.getItem("shippingDetails")) : [],
        paymentMethod: "PayPal"
    }
};

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    insertProduct:addProductReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMineList:orderMineListReducer,
    showUserList:listUsers,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
});

const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;