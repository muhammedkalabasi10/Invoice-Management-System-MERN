import { createSlice } from "@reduxjs/toolkit";

const clientSlice=createSlice({
    name:'clients',
    initialState:{clients:[{
        _id:"",
        name:"",
        email:"",
        phone:"",
        address:""
    }]},
    reducers:{
        getClients(state,action){
            state.clients=action.payload
        },
        addClient(state,action){
            state.clients.push({
                _id:action.payload._id,
                name:action.payload.name,
                email:action.payload.email,
                phone:action.payload.phone,
                address:action.payload.address
            })
        },
        updateClient(state,action){
            const updatedClient=state.clients.find((client)=>client._id===action.payload._id)
            updatedClient.name=action.payload.name
            updatedClient.email=action.payload.email
            updatedClient.phone=action.payload.phone
            updatedClient.address=action.payload.address
        },
        deleteClient(state,action){
            state.clients.filter((client)=>state.clients._id!==action.payload._id)
        }
    }
})

export const clientActions=clientSlice.actions
export default clientSlice