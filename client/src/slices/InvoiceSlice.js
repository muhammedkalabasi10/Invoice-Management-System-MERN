import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice=createSlice({
    name:'invoices',
    initialState:{
        invoices:[{
            _id:"",
            dueDate:"",
            items:[{itemName: "", selectedFiles:"", unitPrice: 0, quantity:"", unit: 0, tax:0, discount: 0}],
            client:{name:"",email:"",phone:"",address:""},
            total: 0,
            totalPaid:0,
            status: "", 
            creatorId: "",
            paymentRecords: [{payment: 0, datePaid: ""}],
            createDate: ""
        }]
    },
    reducers:{
        getInvoice(state,action){
            state.invoice=action.payload
        },
        getInvoices(state,action){
            state.invoices=action.payload
        },
        addInvoice(state,action){
            state.invoices.push({
                _id:action.payload._id,
                dueDate:action.payload.dueDate,
                items:action.payload.items,
                client:action.payload.client,
                total:action.payload.total,
                totalPaid:action.payload.totalPaid,
                status:action.payload.status,
                creatorId:action.payload.creatorId,
                paymentRecords:action.payload.paymentRecords,
                createDate:action.payload.createDate
            })
        },
        updateInvoice(state,action){
            /*const updatedInvoice=state.invoices.findIndex((invoice)=>invoice._id===action.payload._id)
            this.state.invoices[updatedInvoice].paymentRecords=action.payload.paymentRecords*/
            const updatedInvoice=state.invoices.find((invoice)=>invoice._id===action.payload._id)
            updatedInvoice.paymentRecords=action.payload.paymentRecords
        },
        deleteInvoice(state,action){
            state.invoices.filter((inv)=>inv._id!==action.payload._id)
        }
    }
})

export const invoiceActions=invoiceSlice.actions
export default invoiceSlice