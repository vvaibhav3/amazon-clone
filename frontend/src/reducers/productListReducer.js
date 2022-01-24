import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL, ADD_PRODUCT_DONE} from '../constants/productConstants';
const productListReducer=(state={loading:true,products:[]},action) =>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST :
             return {loading:true};

        case PRODUCT_LIST_SUCCESS :
            return {loading:false,products:action.payload}

        case PRODUCT_LIST_FAIL :
            return {loading:false,error:action.payload}

        default:
            return state;
    }
}

export const productDetailsReducer=(state={loading:true,product:{}},action) => {
    switch(action.type){
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload
            };
        
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload
            };

        default:
            return state;
    }
}

export const addProductReducer =(state={},action) =>{
    switch(action.type){
        case ADD_PRODUCT_REQUEST:
            return {
                loading:true
            };

        case ADD_PRODUCT_SUCCESS:
            return{
                loading:false,
                product:action.payload
            };

        case ADD_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            };

        case ADD_PRODUCT_DONE:
            return {}
        default : return state;
    }
}

export default productListReducer;