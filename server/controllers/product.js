import ProductModel from "../models/ProductModel.js"

export const getProducts=async(req,res)=>{
    try{
        const products=await ProductModel.find()
        res.status(200).json(products)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getProduct=async(req,res)=>{
    const { id } = req.params
    try{
        const product=ProductModel.find(id)
        res.status(200).json(product)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const addProduct=async(req,res)=>{
    const product=await req.body
    const newProduct=await new ProductModel({...product})
    try{
        await newProduct.save()
        res.status(201).json(newProduct)
    }catch(err){
        console.log(err)
        res.status(409).json({message: err.message})
    }
}

export const updateProduct=async(req,res)=>{
    const {id:_id} = await req.params
    const product=await req.body
    console.log(product)
    try{
        const updatedProduct=await ProductModel.findByIdAndUpdate(_id,{...product,_id},{new:true})
        console.log(updateProduct)
        res.status(200).json(updatedProduct)
    }catch(err){
        res.json({message: err.message})
    }
}

export const deleteProduct=async(req,res)=>{
    const { id } = req.params
    try{
        await ProductModel.findByIdAndRemove(id)
        res.json({message: "Product deleted successfully"})
    }catch(err){
        res.json({message: err.message})
    }
}