import mongoose from "mongoose";

const TokenSchema=mongoose.Schema({
    userId:{type: String, required: true},
    token:{type: String, required: true}
})
const TokenModel=mongoose.model('token',TokenSchema)
export default TokenModel