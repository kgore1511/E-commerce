import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose, { PromiseProvider } from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import bodyParser from 'body-parser';
const checkSumLib=require('./paytm/Paytm_Web_Sample_Kit_NodeJs/checksum/checksum');
import Product from './models/productModel';
import User from './models/userModel';
import { userInfo } from 'os';
dotenv.config()
const mongodbURL=config.MONGODB_URL;
mongoose.connect(mongodbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error=>console.log(error.reason));;


var querystring = require('querystring');
const app=express();
console.log("nhi chala");
app.use(bodyParser.json())
app.use("/api/users",userRoute)
console.log("kya hua");
app.use("/api/products",productRoute)

app.get("/api/createadmin",async(req,res)=>{
    console.log(" kya yelo")
    try{
    const user=new User({
        name:"Khushal",
        email:"kgore1511@gmail.com",
        password:"Khushalgore@702",
        isAdmin:true
    });

    const newUser=await user.save();
    res.send(newUser);
}catch(error){
    res.send({msg:error.message});
}
})
//payment gateway request
app.get('/payment',(req,res)=>{
    console.log("#1")
    
   let params={};
    try{
    params['MID']='xajIUZ54524806812682', 
    params['WEBSITE']='WEBSTAGING',
    params['CHANNEL_ID']='WEB',
    params['INDUSTRY_TYPE_ID']='RETAIL',
    params['ORDER_ID']=req.query.orderId,
    params['CUST_ID']='cusIdd',
    params['TXN_AMOUNT']=req.query.amount,
    params['CALLBACK_URL']='http://localhost:3000/callback',
    params['EMAIL']=req.query.email,
    params['MOBILE_NO']=req.query.phone_Number
    console.log("#2")
    console.log(params);
    checkSumLib.genchecksum(params,'OiJE!b2yk%q_h6aK',(err,checksum)=>{
        console.log("checksum "+checksum)
        var paytmParams={
            ...params,
            CHECKSUMHASH:checksum
        }
        res.json(paytmParams)

     
    })
    }catch(err)    
    {}
//res.send('<html><body><h1>Hello</h1></body></html>')
})

/*app.get('/:id', async(req,res)=>{
    console.log("1");
const products=await Product.findById(req.params.id);
console.log({products});
if(products) res.send(products);
else res.status(404).send({message:"Product Not Found"});
});*/
var x='';
app.post('/callback',async(request,response)=>{
    console.log("finally got called  ");
    if(request.method == 'POST'){
        var fullBody = '';
        request.on('data', function(chunk) {
            fullBody += chunk.toString();
        });
        request.on('end', function() {
            var decodedBody = querystring.parse(fullBody);
            x=decodedBody;
            console.log("hello ji")
            console.log(typeof(decodedBody));
            
            response.redirect(301, 'http://localhost:3000/callback');
            //Props.history.location('/hello')
            //window.location='http://localhost:3000/callback'+decodedBody;
            //response.json({response:decodedBody})
            //response.send(decodedBody);
            // get received checksum
          /*  var checksum = decodedBody.CHECKSUMHASH;

            // remove this from body, will be passed to function as separate argument
            delete decodedBody.CHECKSUMHASH;

           // response.writeHead(200, {'Content-type' : 'text/html','Cache-Control': 'no-cache'});
            if(checkSumLib.verifychecksum(decodedBody,'xajIUZ54524806812682',checkSumLib)) {
                console.log("Checksum Verification => true");
                response.write("Checksum Verification => true");
            }else{
                console.log("Checksum Verification => false");
                response.write("Checksum Verification => false");
            }

             // if checksum is validated Kindly verify the amount and status 
             // if transaction is successful 
             // kindly call Paytm Transaction Status API and verify the transaction amount and status.
             // If everything is fine then mark that transaction as successful into your DB.			
            
            response.end();*/
        });


}
    
})


app.put('/signinUpdate',async(req,res)=>{
    console.log(req.query)
    const productId=req.query.id;
    const user=await User.findById(productId);
    console.log("1  "+user)
    if(user){
            user.orders.unshift(req.query)
            const updatedUser=await user.save();
            if(updatedUser){
                return res.status(200).send({message:'user Updated ',data:updatedUser});        
            }
    }
    return res.status(500).send({message:'Error in  Updating product'});
    });
  

app.get('/call',async(req,res)=>{
    console.log('you are in /call');
    res.send(x);
})
/*app.get("/api/products",(req,res)=>{
res.send(data);
});*/
app.get('/allorders',async(req,res)=>{
    console.log(req.query.id)
    const user=await User.findById(req.query.id)
    console.log("he he he ")
    res.send(user.orders)
})

app.get("/api/products/:_id",async(req,res)=>{
    const productId=req.params._id;    
    console.log("he he   "+productId);
    const product=await Product.findOne({_id:productId});
    if(product){
    res.send(product);}
    else
    {
    console.log("2");
    res.status(404).send({msg:"Product Not Found"})}
});
app.listen(5000,()=>{console.log("server startted")})