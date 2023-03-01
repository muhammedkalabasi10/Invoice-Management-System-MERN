import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:{type: String, required:true},
    surName:{type:String, required:true},
    email:{type:String,required:true},
    phone:{type:String, required:true},
    password:{type:String,required:true},
    verified:{type: Boolean, default:false}
})

const UserModel=mongoose.model('user',userSchema)
export default UserModel