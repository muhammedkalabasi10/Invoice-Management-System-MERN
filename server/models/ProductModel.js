import mongoose from 'mongoose'

const ProductSchema=mongoose.Schema({
    name:String,
    price: Number,
    selectedFiles: String
})

const ProductModel=mongoose.model('product',ProductSchema)
export default ProductModel