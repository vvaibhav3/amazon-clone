import axios from 'axios';
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_FAIL, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_DONE} from '../constants/productConstants';

//action is func which returns another async func which accepts dispatch as parameter
export const listProducts=() => async(dispatch) =>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });
    try{
        const {data}=await axios.get('/api/products');
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data 
        });

    }
    catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.message
        })
    }   
};

export const detailsProduct=(productId) => async (dispatch) =>{
    dispatch({
        type:PRODUCT_DETAILS_REQUEST,
        payload:productId
    });

    try{
        const {data} =await axios.get(`/api/products/${productId}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        });
    }
    catch(err){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message 
        });
    }
};

export  const addProduct = (product) => async(dispatch) =>{
    dispatch({type:ADD_PRODUCT_REQUEST});
    try{
        console.log(product);
        const {data} = await axios.post(`/api/products/add`,product);
        dispatch({type:ADD_PRODUCT_SUCCESS,payload:data});
        dispatch({type:ADD_PRODUCT_DONE});
    }
    catch(err){
        dispatch({
            type:ADD_PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message 
        });
    }
} 
