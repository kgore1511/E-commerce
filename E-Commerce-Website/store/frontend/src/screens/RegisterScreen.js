import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {register} from '../Actions/UserAction';
function RegisterScreen(props){
    console.log("aaya");
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [rePassword,setRePassword]=useState('');
    const userRegister=useSelector(state=>state.userRegister);
    console.log(userRegister);
    const {loading,userInfo,error}=userRegister;
    console.log("error  "+error);
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
    if(password!=rePassword) {alert("password Not Match try again")
    return }
    e.preventDefault();
    
    dispatch(register(name,email,password));
}
    return <div className='form'>
    <form onSubmit={submitHandler}>
       <ul className="form-container">
            <li><center><h4>Register</h4></center></li>
            <li>
                {loading && <div>Loading</div>}
                {error && <div>{error}</div>}
            </li>
            <li>
                <label htmlFor='name'>
                    <b>Name</b>
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input trpe='name' name='name' id='name' placeholder='name' onChange={(e)=>setName(e.target.value)}></input>
            </li>
            <li></li>
            <li>
                <label htmlFor='email'>
                    <b>Email</b>
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type='email' name='email' id='remail' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
            </li>
            <li>
                <label htmlFor='password'><b>Password</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='password' id='password' name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} ></input>
            </li>
            <li>
                <label htmlFor='rePassword'><b>Re-Enter Password</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='rePassword' id='rePassword' name='rePassword' placeholder='Password' onChange={(e)=>setRePassword(e.target.value)} ></input>
            </li>
            <li>
            <center><button type='submit' className='button primary '>Register</button></center></li>
            <li>Already have an account?</li>
            <li>
            <Link to={redirect === '/' ? "signin" : 'signin?redirect=' + redirect} className='button secondry text-center'>Sign in</Link>
            </li>
        </ul>
        </form>

</div>
}
export default RegisterScreen;
