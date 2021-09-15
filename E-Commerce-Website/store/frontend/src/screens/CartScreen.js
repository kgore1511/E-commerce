import { Button } from 'bootstrap';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {addToCart,removeFromCart} from '../Actions/cartActions';
import { signin } from '../Actions/UserAction';
function CartScreen(props){
    var sr=1;
    const cart=useSelector(state=>state.cart);
    const {cartItems}=cart;
    var x=cartItems.reduce((a,c)=>a+c.qty,0)
    x=parseInt(x);
    var total=0;
    while(x>=9)
    {
        total+=parseInt(x%10);
        x/=10;
    }
    total+=x;
    total=parseInt(total);
    console.log("Total is    "+total );
    const productId=props.match.params.id;
    const qty=props.location.search ? Number(props.location.search.split("=")[1]):1
    const dispatch=useDispatch();
    const removeFromCartHandler=(productId)=>{
       console.log(productId);
        dispatch(removeFromCart(productId))
    }
    console.log(productId+"         "+qty);
    

    useEffect(()=>{
        console.log("nahi mana kiya na");
        if(productId){
            console.log("Haa mana kiya na");
            dispatch(addToCart(productId,qty));
        }
    },[])
const comboClicked=()=>{
    props.location.push("/cart")
    console.log("chala")
}
    const checkOutHandler=()=>{
        const x=cartItems.reduce((a,c)=>a+c.price*c.qty,0)
        
     //   if(!signin) props.history.push("/signin?redirect=shipping?total="+x)
        props.history.push("/shipping?total="+x)
    }
    return <div>
        
   
      <b>
           <center> <h3>Shopping Cart</h3></center>
        {
            cartItems.length===0?
            <div>Cart is Empty</div>
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
            {cartItems.map(item=>
<tr>
        <th scope="col" >{sr++}</th>
        <th scope="col" >
            
          <img src={item.image} style={{maxWidth:'50px'}}  alt="product"/></th>
    <th scope="col" >{item.name}</th>
    <th>
                        Qty:
                        <select id='combo' value={item.qty} onChange={comboClicked} onChange={(e)=>dispatch(addToCart(item.product,e.target.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            </select>
                            </th>
                            <th>
                            <button type="button" className="button" onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                            </th>
                            <th> 
                        {item.price*item.qty}
                    </th>
  </tr>

           
              )}
         </table>}
        </b>
    
    
    <div className="cart-action">
       
        <h3>
        Subtotal ({total} items)
        :
        Rs {cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
        </h3>
        <button type='submit' className="button primary" disabled={cartItems.length===0} onClick={checkOutHandler}>
            Proceed To Checkout
        </button>
    </div>
    
    </div>

}

export default CartScreen;