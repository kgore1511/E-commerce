import { Button } from 'bootstrap';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import vv from './PaymentScreen';
import {jsonValue} from '../constants/userConstants'
import {addToCart,removeFromCart} from '../Actions/cartActions';
import Cookie from 'js-cookie';
var mergeJSON = require("merge-json") ;
const { default: Axios } = require("axios")
function CallBackScreen(props){
  console.log("honey ji")
  var response='';
  Cookie.remove('cartItems')
  var processParams='';
  const cart=useSelector(state=>state.cart);
    const {cartItems}=cart;
  const userSignin=useSelector(state=>state.userSignin);
  const {userInfo}=userSignin;
  const call=async ()  =>{
  alert("callBack Got Called")
  const response=await Axios.get('/call');
  document.getElementById('linkToClick').click();
  console.log("kesa ho")
  console.log(response.data)
  const r=Cookie.getJSON('Value');
 
  var v=mergeJSON.merge(userInfo,r)
  const json={cart:cartItems}
  var p=mergeJSON.merge(v,json)
  
  console.log("p is")
  console.log(p)
  
  console.log(cartItems.id)
  var obj=mergeJSON.merge(response.data,p) ;
  alert(obj)
  console.log("obj is going to print")
  console.log(obj)
  var req={
	url:'/signinUpdate',
	params:obj,
	method:"put"
  }
  //const processParams=await response.data;
  const data=async()=>{
  
  console.log(req);
  const response= await Axios(req); 
  }
  data();
    }
	call()
	const update=()=>async()=>{
		alert("update Got Called")
		
props.history.push('/');
      }
  /*const homepage=()=>{
    
  }*/
    
//      const response=await Axios(request);
   //   const processParams=await response.data;
return <body>
<div className="text-center">

	<a id='linkToClick' href="#myModal" className="trigger-btn" data-toggle="modal"></a>
</div>


<div id="myModal" className="modal fade">
	<div className="modal-dialog modal-confirm">
		<div className="modal-content">
			<div className="modal-header">
				<div className="icon-box">
					<i className="material-icons">&#xE876;</i>
				</div>				
				<h4 className="modal-title">Congratulations</h4>	
			</div>
			<div className="modal-body">
				<p className="text-center">Your Order has been successfully placed</p>
			</div>
			<div className="modal-footer">
				<button className="btn btn-success btn-block" data-dismiss="modal" onClick={update()}>OK</button>
			</div>
		</div>
	</div>
</div>     
</body>
}

export default CallBackScreen;