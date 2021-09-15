import Cookie from 'js-cookie';
import {USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL} from '../constants/userConstants';
const { default: Axios } = require("axios")
const signin=(email,password) => async(dispatch)=>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});
    try{
        const {data}=await Axios.post("/api/users/signin",{email,password});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        Cookie.set('userInfo',JSON.stringify(data));
    }catch(error)
    {
        dispatch({type:USER_SIGNIN_FAIL,payload:error.message});
    }
}

const register=(name,email,password) => async(dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST,payload:{name,email,password}});
    try{
        const {data}=await Axios.post("/api/users/register",{name,email,password});
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        //Cookie.set('userInfo',JSON.stringify(data));

    }catch(error)
    {
        dispatch({type:USER_REGISTER_FAIL,payload:error.message});
    }
}

const order=(userId) => async(dispatch)=>{
    alert(userId)
    dispatch({type:'USER_ORDER_REQUEST',payload:{userId}});
    try{
const json={'id':userId}
        var req={
            url:'/allorders',
            params:json,
            method:"get"
          }
              
        const {data}=await Axios(req);
        dispatch({type:'USER_ORDER_SUCCESS',payload:data});
        

    }catch(error)
    {
        dispatch({type:'USER_ORDER_FAIL',payload:error.message});
    }
}
export {signin,register,order};