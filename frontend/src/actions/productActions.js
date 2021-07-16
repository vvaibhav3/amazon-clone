import axios from 'axios';
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL} from '../constants/productConstants';

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