import axios from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, GET_USER_LIST_REQUEST, GET_USER_LIST_FAIL, GET_USER_LIST_SUCCESS } from "../constants/userConstants"

export const signin = (email,password) => async(dispatch) =>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});
    try{
        const {data} = await axios.post("/api/users/signin",{email,password});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data));
    }
    catch(err){
        dispatch({type:USER_SIGNIN_FAIL,payload:err.response && err.response.data.message ? err.response.data.message : err.message});
    }
}

export const register = (name,email,password,isAdmin) => async(dispatch) =>{
    dispatch({type:USER_REGISTER_REQUEST,payload:{email,password}});
    try{
        const {data} = await axios.post("/api/users/register",{name,email,password,isAdmin});
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data));
    }
    catch(err){
        dispatch({type:USER_REGISTER_FAIL,payload:err.response && err.response.data.message ? err.response.data.message : err.message});
    }
}

export const signout=() => (dispatch) =>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingDetails");
    localStorage.removeItem("userRegister");
    dispatch({type:USER_SIGNOUT});
}

export const detailsUser= (userId) => async(dispatch,getState) =>{
    dispatch({type:USER_DETAILS_REQUEST,payload:userId});
    const {userSignin:{userInfo}}=getState();
    try{
        const {data} = await axios.get(`/api/users/${userId}`,{
            headers:{
                authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type:USER_DETAILS_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:USER_DETAILS_FAIL,payload:err.response && err.response.data.message ? err.response.data.message : err.message});
    }
}

export const updateUserProfile = (user) => async(dispatch,getState) =>{
    dispatch({type:USER_UPDATE_PROFILE_REQUEST,payload:user});
    const {userSignin:{userInfo}}=getState();
    try{
        const {data}= await axios.put(`/api/users/profile`,user,{
            headers:{
                authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data));
    }
    catch(err){
        dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:err.response && err.response.data.message ? err.response.data.message : err.message});
    }
}

export const listUsers = () => async(dispatch,getState) => {
    dispatch({type:GET_USER_LIST_REQUEST});
    const {userSignin:{userInfo}}=getState();
    try{
        const {data} = await axios.get(`/api/users/list`,{
            headers:{authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type:GET_USER_LIST_SUCCESS,payload:data});
    }
    catch(err){
        const message =err.response && err.response.data.message ?  err.response.data.message : err.message;
        dispatch({type:GET_USER_LIST_FAIL,payload:message});
    }

}