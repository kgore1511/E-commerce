import axios from "axios";
import store from '../../../frontend/src/store';
import { useSelector } from 'react-redux';
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS,PRODUCT_SAVE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL } from "../constants/productConstants";
import {PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL} from '../constants/detailConstants';
import { productListReducer } from "../reducer/productReducers";
import Axios from "axios";
const listProducts=(search)=>async (dispatch)=>{
    try
    {
        dispatch({type:PRODUCT_LIST_REQUEST});
    const {data}=await axios.get("/api/products");
    dispatch({type:PRODUCT_LIST_SUCCESS,payload:data.products.filter(product => {
      
        var name=product.name.toUpperCase().trim()
        var brand=product.brand.toUpperCase().trim()
      
        if(name.startsWith(search) || brand.startsWith(search)) 
        {
      
        return product
        }
    })
    })
    console.log('hey bro')
    console.log(data.products)
}
    catch(error)
    {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message});
    }

}
const saveProduct=(product)=>async(dispatch,getState)=>{
    try{
        console.log("kya hua 1")
        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product});
        console.log("kya hua 2")
        const {userSignin:{userInfo}}=getState();
        console.log("kya hua 3    ")
        console.log({getState})
        console.log('token is '+userInfo.token);
        if(!product.id){
            const {data}=await Axios.post('/api/products',product,{
                headers:{
                    'Authorization':'Bearer'+userInfo.token
                }
            });
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data});
        }else{
            const {data}=await Axios.put('/api/products/'+product.id,product,{
                headers:{
                    'Authorization':'Bearer'+userInfo.token
                }
            });
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data});
        }
        
        console.log("kya hua 4    ")
        
    }catch(error){
        console.log("kya hua 5    "+error.message)
        dispatch({type:PRODUCT_SAVE_FAIL,payload:error.message})
    }
}

const productDetail=(productId)=>async (dispatch)=>{
    try{
        console.log(" ye loo");
        dispatch({type:PRODUCT_DETAIL_REQUEST,payload:productId});
        const {data}=await axios.get("/api/products/"+productId);
        console.log("badiyaa")
        console.log(data.brand)
        dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:data});
    }
    catch(error)
    {
    dispatch({type:PRODUCT_DETAIL_FAIL,payload:error.message});
    }
}

const deleteProduct=(productId)=>async (dispatch,getState)=>{
    try{
        console.log(" ye loo");
        const {userSignin:{userInfo}}=getState();
        dispatch({type:PRODUCT_DELETE_REQUEST,payload:productId});
        
        const {data}=await axios.delete("/api/products/"+productId,{
            headers:{
                'Authorization':'Bearer'+userInfo.token
            }
            });
        console.log("badiyaa")
        console.log(data.brand)
        dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data,success:true});
    }
    catch(error)
    {
    dispatch({type:PRODUCT_DELETE_FAIL,payload:error.message});
    }
}


export {listProducts,productDetail,saveProduct,deleteProduct};