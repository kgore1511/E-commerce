import express from 'express';
import Product from '../models/productModel';
const router=express.Router();
console.log("chala to sahi ");
router.get('/', async(req,res)=>{
    console.log("1");
const products=await Product.find({});
console.log("Products are  "+products[0]);
res.send({products});
});



router.put('/:id',async(req,res)=>{
    const productId=req.params.id;
    const product=await Product.findById(productId);
    console.log("1  "+product)
    if(product){
            product.name=req.body.name;
            product.price=req.body.price;
            product.image=req.body.image;
            product.brand=req.body.brand;
            product.category=req.body.category;
            product.countInStock=req.body.countInStock;
            product.description=req.body.description;
            const updatedProduct=await product.save();
            if(updatedProduct){
                return res.status(200).send({message:'Product Updated',data:updatedProduct});        
            }
    }
    return res.status(500).send({message:'Error in  Updating product'});
    });

    router.delete("/:id",async(req,res)=>{
        const deleteProduct=await Product.findById(req.params.id);
        if(deleteProduct){
            await deleteProduct.remove();
            res.send({message:"Product Deleted"});
        }
        res.send("error in Deletion");
    });

router.post('/',async(req,res)=>{
    console.log("mst bro    ");
    const product=new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        brand:req.body.brand,
        category:req.body.category,
        countInStock:req.body.countInStock,
        description:req.body.description,
        rating:req.body.rating,
        numReviews:req.body.numReviews
    });
    const newProduct=await product.save();
    if(newProduct){
        console.log("kya bro");
        return res.status(201).send({message:'New Product Created',data:newProduct});
    }
    return res.status(500).send({message:'Error in creating Product'});
})
export default router