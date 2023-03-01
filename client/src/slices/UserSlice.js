import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{user:null},
    reducers:{
        login(state,action){
            localStorage.setItem('user',JSON.stringify({...action.payload}))
            state.user=action.payload
        },
        logout(state,action){
            localStorage.removeItem('user')
            state.user=null
        },
        updateUser(state,action){
            localStorage.setItem('user',JSON.stringify({...action.payload}))
            state.user=action.payload
        }
    }
})

export const userActions=userSlice.actions
export default userSlice