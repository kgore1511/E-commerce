import { CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING } from "../constants/cartConstants";
import Cookie from "js-cookie";
const { default: Axios } = require("axios")
    const addToCart=(productId,qty)=>async(dispatch,getState)=>{
        try{
            console.log("laila1   "+productId+"          "+qty)
            const {data}=await Axios.get("/api/products/"+productId);
            dispatch({
                type:CART_ADD_ITEM,payload:{
                    product:data._id,
                    name:data.name,
                    image:data.image,
                    price:data.price,
                    countInStock:data.countInStock,
                    qty
                }
            });

            const {cart:{cartItems}}=getState();
            Cookie.set("cartItems",JSON.stringify(cartItems));
        }catch(error){

        
    }
}
const removeFromCart=(productId)=>(dispatch,getState)=>{
    console.log("kaur");
    dispatch({type:CART_REMOVE_ITEM,payload:productId});

    const {cart:{cartItems}}=getState();
    Cookie.set("cartItems",JSON.stringify(cartItems));
}

const saveShipping=(data)=>(dispatch)=>{
    dispatch({type:CART_SAVE_SHIPPING,payload:data});
}
export {addToCart,removeFromCart,saveShipping};