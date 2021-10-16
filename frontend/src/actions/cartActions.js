import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_DETAILS,CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";


export const addToCart = (productId,qty) => async(dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${productId}`);

    dispatch({
        type:CART_ADD_ITEM,
        payload : {
            name:data.name,
            product:data._id,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty,
        }
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart=(productId) => (dispatch,getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:productId
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}

export const saveShippingDetails=(data) => (dispatch) =>{
    dispatch({type:CART_SAVE_SHIPPING_DETAILS,payload:data});
    localStorage.setItem('shippingDetails',JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type:CART_SAVE_PAYMENT_METHOD,payload:data});
}