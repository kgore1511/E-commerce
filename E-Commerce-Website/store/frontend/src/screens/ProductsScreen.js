import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {signin} from '../Actions/UserAction';
import {listProducts, saveProduct,deleteProduct} from '../Actions/productActions'
import { productDeleteReducer } from '../reducer/productReducers';
import { product } from '../App';
function ProductsScreen(props){
    var [visible,setVisible]=useState(false);
    const [modalTableVisible,setTableModalVisible]=useState(true);
    const [id,setId]=useState('');
    const [name,setName]=useState('');
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [countInStock,setCountInStock]=useState('');
    const [description,setDescription]=useState('');

    const productList=useSelector(state=>state.productList);
    const {loading,products,error}=productList;
    const productSave=useSelector(state=>state.productSave);
    const {loading:loadingSave,success:successSave,error:errorSave}=productSave;
    const productDelete=useSelector(state=>state.productDelete);
   const {loading:loadingDelete,success:successDelete,error:errorDelete}=productDelete;
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(listProducts(''))
        if(successSave){
            back();
        }
        
        return ()=>{
        };
},[successSave,successDelete])
const back=()=>{
setVisible(false);
setTableModalVisible(true);
}

const openModel=(product)=>{
    setVisible(true);
    setTableModalVisible(false);
    setId(product._id);
    setPrice(product.price);
    setName(product.name);
    setCategory(product.category);
    setBrand(product.brand);
    setImage(product.image);
    setCountInStock(product.countInStock);
    setDescription(product.description)
}
const submitHandler=(e)=>{
    e.preventDefault();
    console.log("1");
    dispatch(saveProduct({id,name,image,brand,price,price,category,countInStock,description}));
}
const deleteHandler=(product)=>{
    dispatch(deleteProduct(product._id));
}
    var sr=1
        return <div>
<div className='content content=margined'>
        <h3>Products</h3>
        <button onClick={()=>openModel({})}>Create Product</button>
        </div>  
        
        {  visible &&  
        <div className='bigform'>
        <form onSubmit={submitHandler}>
           <ul className="bigform-container">
                <li><center><h4>Create Product</h4></center></li>
                <li>
                    {loadingSave && <div>Loading</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
               
                <li>
                    <label htmlFor='name'>
                        Name
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='name' name='name' id='name' value={name} placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor='name'>
                        Price
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='text' name='price' id='price' value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor='image'>
                        Image
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='text' name='image' id='image' value={image} onChange={(e)=>setImage(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor='brand'>
                        Brand
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='text' name='brand' id='brand' value={brand} onChange={(e)=>setBrand(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor='category'>
                        Category
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='text' name='category' id='category' value={category} onChange={(e)=>setCategory(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor='countInStock'>
                        Count In Stock
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='text' name='countInStock' id='countInStock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></input>
                </li>
               
                <li>
                <label htmlFor='name'>
                        Description
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <textarea name='description' id='description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                </li>
                <li>
                <center><button type='submit' className='button primary'>{id?"Update":"Create"}</button></center>
                <li></li>
                <center><button onClick={()=>back()} className='button primary'>Back</button></center>
                
                </li>
            </ul>
            </form>
            </div>
}
    {modalTableVisible &&
products.length===0 ?<div><center><b>No Products Found</b></center></div>:
<table className="table">
{<tr>
<td  className="align-middle">Sr No.</td>
<td  className="align-middle">Id</td>
<td  className="align-middle">Name</td>
<td  className="align-middle">Price</td>
<td  className="align-middle">Category</td>
<td  className="align-middle">Edit</td>
<td  className="align-middle">Delete</td>
</tr>}
{products.map(product=>
<tr>
<th scope="col" >{sr++}</th>
<th scope="col" >{product.name}</th>
<td>{product.id}</td>
                            <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button onClick={()=>openModel(product)}>Edit</button>
                                    <button onClick={()=>deleteHandler(product)}>Delete</button>
                                </td>
                             
</tr>



)}
</table>


      
                           
             
}

 </div>
}
      

export default ProductsScreen;
