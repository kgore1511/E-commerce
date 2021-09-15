import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {signin} from '../Actions/UserAction';
function SigninScreen(props){

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const userSignin=useSelector(state=>state.userSignin);
    const {loading,userInfo,error}=userSignin;
    console.log("userInfo  "+userInfo+"   error      "+error);
    const dispatch=useDispatch();
    const redirect=props.location.search?props.location.search.split("=")[1]:'/';
    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
        return ()=>{
        };
},[userInfo])
const submitHandler=(e)=>{
    e.preventDefault();
    console.log("1");
    dispatch(signin(email,password));
}
    return <div className='form'>
    <form onSubmit={submitHandler}>
       <ul className="form-container">
            <li><center><h4>Signin</h4></center></li>
            <li>
                {loading && <div>Loading</div>}
                {error && <div style={{color:'red',fontSize:'15px'}}><center>Invalid Username or password Try again</center></div>}
            </li>
            <li>
                <label htmlFor='email'>
                    Email
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input trpe='email' name='email' id='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
            </li>
            <li>
                <label htmlFor='password'>Password</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='password' id='password' name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} ></input>
            </li>
            <li>
            <center><button type='submit' className='button primary '>Signin</button></center></li>
            <li>New to amazona?</li>
            <li>
             <Link to={redirect === '/' ? "register" : 'register?redirect=' + redirect} className='button secondry text-center'>Create your amazona account</Link>
            </li>
        </ul>
        </form>

</div>
}
export default SigninScreen;
