import express from 'express';
import userModel from '../models/userModel';
import {getToken} from '../myUtil';
const router=express.Router();
router.post("/signin",async(req,res)=>{
    console.log("got called");
    const signInUser=await userModel.findOne({
        email:req.body.email,
        password:req.body.password
    });
    console.log(" bhai bhai");
    if(signInUser){
        res.send({
            id:signInUser.id,
            name:signInUser.name,
            email:signInUser.email,
            isAdmin:signInUser.isAdmin,
            token:getToken(signInUser)
        })

    }else{
        res.status(401).send({msg:'Invalid Email or Password'});
    }
})

router.post("/register",async(req,res)=>{
    console.log("got called");
    const user=new userModel({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        order:null
    });
    const newUser=await user.save();
    if(newUser){
        res.send({
            id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            order:newUser.order,
            token:getToken(newUser)
        })
    }else{
        res.status(401).send({msg:'Invalid Email or Password'});
    }
})


export default router;