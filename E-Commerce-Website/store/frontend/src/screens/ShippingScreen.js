import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {saveShipping} from '../Actions/cartActions';
const { default: Axios } = require("axios")
function ShippingScreen(props){
    const total=props.location.search ? Number(props.location.search.split("=")[1]):1
    console.log("aaya");
    const [address,setAddress]=useState('');
    const [city,setCity]=useState('');
    const [postalCode,setPostalCode]=useState('');
    const [country,setCountry]=useState('');
    const dispatch=useDispatch();

    const click=()=>{
      //  window.location='http://localhost:3000/payment'
    }
    var x='';
const submitHandler=async (e)=>{
    
    e.preventDefault();
    console.log("1");
   // const {data}=await Axios.post('/payment');
    //x=data;
    //alert(data)
    //dispatch(saveShipping(address,city,postalCode,country));
    //props.history.push('payment');
}
return x ? <div>x</div>:
    
    <div className='form'>
    <form  action='/payment'>
       <ul className="form-container">
            <li><center><h4>Shipping</h4></center></li>
            <li><input type='hidden' name='total' id='total' value={total} /></li>
            <li>
                <label htmlFor='name'>
                    Country
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type='name' name='country' id='country'  onChange={(e)=>setCountry(e.target.value)}></input>
            </li>
            
            <li>
                <label htmlFor='name'>
                    City
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type='name' name='city' id='city' onChange={(e)=>setCity(e.target.value)}></input>
            </li>
            <li>
                <label htmlFor='name'>
                    Postal Code
                    </label>&nbsp;&nbsp;&nbsp;
                    <input type='name' name='postal' id='postal' onChange={(e)=>setPostalCode(e.target.value)}></input>
            </li>
            <li>
                <label htmlFor='name'>
                    Address
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <textarea type='Textarea' name='address' id='name' onChange={(e)=>setAddress(e.target.value)}></textarea>
            </li>
            <li>
            <center><button type='submit' className='button primary' onClick={click}>Continue</button></center></li>
        </ul>
        </form>

</div>
}
export default ShippingScreen;
