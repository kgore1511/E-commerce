import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,dropdups:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false},
    orders:{type : Array , default : []},
    address:{type:String,default:''},
    pincode:{type:String,default:''},
    city:{type:String,default:''},
    country:{type:String,default:''},
});

const userModel=mongoose.model("User",userSchema);
export default userModel;