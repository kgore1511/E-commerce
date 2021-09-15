import {Link} from 'react-router-dom'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {productDetail} from '../Actions/productActions';
import { useState } from 'react';
import {addToCart,removeFromCart} from '../Actions/cartActions';
function ProductScreen(props){
    const [qty,setQty]=useState(1);
    const dispatch=useDispatch();
    const [phoneTooltip, setPhoneTooltip] = useState({
        show: false,
        x: 0,
        y: 0,
        orientLeft: false
      });

    const displayPhoneToolTip = (event) => {
        if (!phoneTooltip.show) {
            alert("hello")
          setPhoneTooltip((prev) => ({ ...prev, show: true })); // show tooltip
          setTimeout(() => {
              alert("bye")
            setPhoneTooltip((prev) => ({ ...prev, show: false })); // remove/hide tooltip
          }, 3000);
        }
      };
    var product=useSelector(state=>state.productDetails)
    const loading=product.loading;
   const error=product.error;
    console.log("honey bunny");
    console.log(product.products);
    
    useEffect(()=>{
        console.log("chl bhag");
    dispatch(productDetail(props.match.params.id));
        return ()=>{
        };
},[])
const handleAddToCart=()=>{
    dispatch(addToCart(props.match.params.id,qty));
    if (!phoneTooltip.show) {
        document.getElementById("alert").style.visibility = "visible";
     
      setTimeout(() => {
        document.getElementById("alert").style.visibility = "hidden";  
       
      }, 3000);
      
    }
    //props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
}
return (
    
    loading? <div>loading...</div>:
    error?<div>{error}</div>:
  
    <div>
  
        <div><Link to='/'>Back To Result</Link></div>
        <div className='details'>
            <div className='details-image'>
                <img src={product.products.image} alt='product'></img>
            </div>
            <div className='details-info'>
                <ul>
                    <li>
                        <div style={{fontSize:'32px',color:'blue'}}>
{product.products.name}</div>
</li>
<li>
    {product.products.rating} Stars ({product.products.numberOfReview} Reviews)
</li>
<div id='alert' class="alert alert-success" style={{visibility:'hidden'}}>
    <strong>Item Added to cart</strong>
  </div>  
<li>
    <div style={{fontSize:'20px'}}>
<b>Price :{product.products.price}</b></div>
</li>
<li><div style={{fontSize:'32px',color:'blue'}}>
    Description :</div>
    <div style={{fontSize:'15px'}}>
        {product.products.description}
    </div>
</li>
</ul>
</div>  

    <div className='details-action' style={{maxWidth:'35%'}}>
        <ul>
            <li style={{fontSize:'20px'}}>
                Price: {product.products.price}
                </li>
                <li style={{fontSize:'20px'}}>
                    Status: {product.products.countInStock>0? "In Stock":"Currently not available"}
                </li>
                <li style={{fontSize:'20px'}}>
                    Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                    {[...Array(product.products.countInStock).keys()].map(x=>
                    <option value={x+1} key={x+1}>{x+1}</option>
                    )}
                    </select>
                </li>
               <li>{product.products.countInStock>0 ?<button className='button' onClick={handleAddToCart} >Add To Cart</button>:"out of stock"}
                </li>
                </ul>
                </div> 
                </div>
    </div>  
)
}
export default ProductScreen;