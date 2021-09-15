import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {listProducts} from '../Actions/productActions';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder} from '../constants/productConstants'
import product from '../App';
import Cookie from 'js-cookie';
import OrdersScreen from './OrdersScreen';


const { default: Axios } = require("axios")
var searchValue='';
function HomeScreen(props) { 
        
        const productList=useSelector(state=>state.productList);
        console.log("product List are  "+{productList})
        const dispatch=useDispatch();
        var {products,loading,error}=productList;

        
        var p=products
        const input=()=>{
               
                
                if(document.getElementById('searchTextField')) searchValue=(document.getElementById('searchTextField').value).trim() || '';
                 searchValue=searchValue.toUpperCase().trim() || '';
        
                products=p.filter(product => {
                    var name=product.name.toUpperCase().trim()
                    var brand=product.brand.toUpperCase().trim()
                    if(name.startsWith(searchValue) || brand.startsWith(searchValue))  return product;
                    dispatch(listProducts(searchValue));
                })
                
        }
     //const products=productList.products;
        
        
        useEffect(()=>{
                
        dispatch(listProducts(''));
        
        return ()=>{
         
                };
                       
        },[searchValue])
       
    return/*<div>Hello</div>*/loading? <div>loading...</div>:
error?<div>{error}</div>:

products.length===0 ? <div style={{fontSize:'20px',color:'red',paddingTop:'100px'}}><center>Not Found</center></div>:
    <ul className="products">
            {
                

                    
    products.filter(product => product.name.includes(searchValue||'')).map(product =>
        
    <li key={product._id} >
        <div className='product' >
                
        <Link to={'/product/'+product._id}><img src={product.image} alt='product' className='product-image' /></Link>
            <div className='product-name'>
    <Link to={'/product/'+product._id}>{product.name}</Link></div>
    <div className='product-brand'>{product.brand}</div>
    <div className='product-price'>Rs {product.price}</div>
            <div className='product-rating'>{product.rating} Stars ({product.numReviews} Reviews)</div>
            </div>                            
    </li>)
}
    </ul>
       
};

export default HomeScreen;