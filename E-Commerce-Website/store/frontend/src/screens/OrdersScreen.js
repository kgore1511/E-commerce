import { Button } from 'bootstrap';
import Cookie from 'js-cookie';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {addToCart,removeFromCart} from '../Actions/cartActions';
import { signin } from '../Actions/UserAction';
import STATE from '../screens/HomeScreen';
import {order} from '../../src/Actions/UserAction'
const { default: Axios } = require("axios")
function OrdersScreen(props){

    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    const userOrders=useSelector(state=>state.userOrders);
    const {orders,loading,error}=userOrders;
   // const {orders}=userOrders.userInfo;
    
    console.log(orders)
   /* const response=async()=>await Axios.get('/allorders',async(req,res)=>{
alert(res)
    });
    response()*/
   const dispatch=useDispatch();
   useEffect(()=>{
    if(userInfo){
        dispatch(order(userInfo.id))
    }
    return ()=>{
    };
},[])

  return  <div>hwee</div>/* <div>
         <b>
           <center> <h3>My Orders</h3></center>
        {
            loading ? <div>Loading...</div>:
            orders.length===0?
            <div>No Orders Found</div>
            :
            <table className="table">
                {<tr>
    <td  className="align-middle">Sr No.</td>
    <td  className="align-middle">Image</td>
    <td  className="align-middle">Name</td>
    <td  className="align-middle">Qty</td>
    <td  className="align-middle">Delete</td>
    <td  className="align-middle">Price</td>
</tr>}
            {orders.map(order=>
<tr>
        
        <th scope="col" ></th>
    <th scope="col" >{order.TXNAMOUNT}</th>
  
                           
                            
  </tr>

           
              )}
         </table>}
        </b>
    </div>
    
    
    */
 
     
}

export default OrdersScreen;