import mongoose from 'mongoose'
const InvoiceSchema=mongoose.Schema({
    dueDate: Date,
    items:[{itemName: String, selectedFiles:String, unitPrice: Number, quantity: Number, unit: String, tax: {taxname:String, taxvalue:Number}, discount: Number}],
    client:{name:String,email:String,phone:String,address:String},
    total: Number,
    status: String,
    creatorId: String,
    paymentRecords:[{payment: Number, datePaid: Date}],
    createDate:{type: Date, default: new Date()}
})

const InvoiceModel=mongoose.model('invoice',InvoiceSchema)
export default InvoiceModel