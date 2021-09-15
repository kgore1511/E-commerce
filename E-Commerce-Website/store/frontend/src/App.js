import React, { useState } from 'react';
import './App.css';
import Cookie from 'js-cookie';
import {Redirect, useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen'
import CreateAdminScreen from './screens/createAdminScreen'
import ProductScreen from './screens/ProductScreen'
import ProductsScreen from './screens/ProductsScreen'
import CartScreen from './screens/CartScreen'
import redirect from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import CallBackScreen from './screens/CallBackScreen';
import OrdersScreen from './screens/OrdersScreen'
import store from './store';
import setState from 'react';
import Popper from 'popper.js';
import {useDispatch} from 'react-redux';
import {listProducts} from '../src/Actions/productActions';

export var product={};
export var searchValue='';


function App(prop) {
  const dispatch=useDispatch();
    var p=useSelector(state=>state.productList.products);
    
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    console.log({userInfo});
    const input=()=>{
        
        if(document.getElementById('searchTextField')) searchValue=(document.getElementById('searchTextField').value).trim() || '';
        searchValue=searchValue.toUpperCase().trim() || '';

       
        //props.location.push('/search');
       
        dispatch(listProducts(searchValue));
        
        //store.productList.products=products
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
    
    const openMenu=() =>{
        document.querySelector(".sidebar").classList.add("open");
    }
    const logout=()=>{
      Cookie.remove('userInfo')
      Cookie.remove('cartItems')
      window.location='http://localhost:3000/'
    }
    const closeMenu=() =>{
        document.querySelector(".sidebar").classList.remove("open");
    }
  return (
      <BrowserRouter>
    
    <div className="grid-container">
            <header className='header'>
                <div className='brand'>
                <span style={{fontSize:'30px',cursor:'pointer'}} onClick={openNav}>&#9776;</span>
                    
                    <Link to='/' style={{paddingLeft:'10px'}}>Smart Plaza</Link>
                    </div>
                    <input type='text' name='searchTextField' style={{width:'65%',fontSize:'20px'}} id='searchTextField' placeholder='Search for Products, Brands and many more' onChange={input} size='100'/>
                    <div >
                    
                    <Link style={{paddingRight:'1px',color:'white'}}  to='/cart'>
                    <i class="fa fa-shopping-cart" style={{fontSize:'30px',paddingRight:'22px',cursor:'pointer'}}></i>
                    </Link> </div>
                        {
                            userInfo ?
                            <div class="dropdown">
  <button className="btn btn-secondary dropdown-toggle" style={{align:'right'}} type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
  <i class='fas fa-user-alt' style={{fontSize:'30px',color:'white'}}></i>
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li><a className="dropdown-item" href="/orders">Orders</a></li>
    { userInfo.isAdmin &&<li><a className="dropdown-item" href="/products">Products</a></li>}
    <li><a className="dropdown-item" href="/users">Users</a></li>
    <li><hr className="dropdown-divider"/></li>
    <li><a className="dropdown-item" onClick={logout}>Log Out</a></li>
  </ul>
</div>:
                            <Link to='/signIn'>Sign In</Link>    
                        }
                        
                       
                        
                </header>
                <div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
  <a href="/orders">My Orders</a>
  <a href='/categories'>All Categories</a>
  <a href="/cart">My Cart</a>
  <a href="#">Contact Us</a>
</div>






                



                <main className='main'>
                    <div className='content'>
                    <Route path='/products' component={ProductsScreen} />
                    <Route path='/callback' component={CallBackScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/orders' component={OrdersScreen} />
                    
                        <Route path='/signIn' component={SigninScreen} />
                        <Route path='/register' component={RegisterScreen} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route path="/cart/:id?" component={CartScreen} />
                        <Route path="/createAdmin" component={CreateAdminScreen} />
                        <Route path="/" exact={true} component={HomeScreen} />
                        
                   </div>
                        </main>
                    
                        <footer className='footer'>
                            All right reserved.
                            </footer>
                        </div>
                        </BrowserRouter>
  );


  
}

export default App;
