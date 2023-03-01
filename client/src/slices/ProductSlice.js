import {createSlice} from '@reduxjs/toolkit'

const productSlice=createSlice({
    name:'products',
    initialState:{products:[{
        _id:"",
        name:"",
        price:0,
        selectedFiles:""
    }]},
    reducers:{
        getProducts(state,action){
            state.products=action.payload
        },
        addProduct(state,action){
            state.products.push({
                _id:action.payload._id,
                name:action.payload.name,
                price:action.payload.price,
                selectedFiles:action.payload.selectedFiles
            })
        },
        updateProduct(state,action){
            const updatedItem=state.products.find((product)=>product._id===action.payload._id)
            updatedItem.name=action.payload.name
            updatedItem.price=action.payload.price
            updatedItem.selectedFiles=action.payload.selectedFiles
        },
        deleteProduct(state,action){
            state.products.filter((product)=>product._id!==action.payload._id)
        }
    }
})

export const productActions=productSlice.actions
export default productSlice