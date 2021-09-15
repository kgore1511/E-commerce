import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {saveShipping} from '../Actions/cartActions';
import ReactDOM, { render } from 'react-dom';
import {Redirect} from 'react-router-dom';
import 'popper.js';
import {Dropdown} from 'bootstrap/js/dist/dropdown';
import { Button } from 'bootstrap';
import queryString from 'query-string';
import {jsonValue} from '../constants/userConstants'
import Cookie from 'js-cookie';
const { default: Axios } = require("axios")
var mergeJSON = require("merge-json") ;

function PaymentScreen(props){
   
    var x='Loading';
    
    const userSignin=useSelector(state=>state.userSignin);
    
    
    const {userInfo}=userSignin;
    //var obj=mergeJSON.merge(value,userInfo) ;
    const  value=queryString.parse(props.location.search);
    //
   
   
   
    
    const onPayment=async(e)=>{
      e.preventDefault();
      try{
        const date=new Date();
    const xx='2010'+date.getDate()+date.getMonth()+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds();
      let params={
        orderId:xx,
        email:userInfo.email,
        amount:value.total,
        phone_Number:'7024798666'
      }

      function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
          return JSON.stringify(val)
        } else {
          return val
        }
      }
      
      function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
      }
      
      function isObj(val) {
        return typeof val === 'object'
      }
      
      function buildForm({ action, params }) {
        
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        //form.setAttribute('target', target)
      
        Object.keys(params).forEach(key => {
          const input = document.createElement('input')
          input.setAttribute('type', 'hidden')
          input.setAttribute('name', key)
          input.setAttribute('value', stringifyValue(params[key]))
          form.appendChild(input)
        })
      
        return form
      }

      function post(details) {
        
        const form = buildForm(details)
        
        document.body.appendChild(form)
        form.submit()
        
        form.remove()
      }

      var url='/payment';
      var request={
        url:url,
        params:params,
        method:"get"
      }
      
      const response= await Axios(request);
      const processParams=await response.data;

      

      var details={
        action:'https://securegw-stage.paytm.in/order/process',
        params:processParams
      }
     
    post(details);
      
    }catch(error){

    }
    }

    
    

return <div>
   <div className='form'>
    
       <ul className="form-container">
            <li style={{fontSize:'20px'}}><b><center>Review Orders</center></b></li>
            <li style={{fontSize:'15px'}}><b>Shipping Address : <div style={{fontSize:'13px'}}>{value.address},{value.city},{value.postal},{value.country}</div></b></li><li></li>
            <li style={{fontSize:'15px'}}>
              <b>Total Amount : Rs {value.total} </b>
            </li>
            <li></li><li></li>
            <form onSubmit={onPayment}>
  <center><button type='submit' className="button">Make a Payment Rs {value.total}  /-</button></center>
  </form>
  </ul>
            </div>
  

  
  </div>
   // ReactDOM.render(x,document.getElementById('root'));
    }
    
export default PaymentScreen;
