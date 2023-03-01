import mongoose from 'mongoose'

const ClientSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    address:String
})

const ClientModel=mongoose.model('client',ClientSchema)
export default ClientModel