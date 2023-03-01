import axios from "axios"
import { userActions } from "../slices/UserSlice"

const baseURL=process.env.REACT_APP_API+"/user"
const API=axios.create({baseURL:baseURL})

export const login=(loginData)=>{
    return async(dispatch)=>{
        try{
            const user=API.post("/signin",loginData)
            dispatch(userActions.login(user))
        }catch(err){
            console.log(err)
        }
        
    }
}

export const logout=()=>{
    return async(dispatch)=>{
        dispatch(userActions.logout())
    }
}

export const signup=(signupData)=>{
    return async(dispatch)=>{
        try{
            API.post("/signup",signupData)
            dispatch(userActions.login(signupData))
        }catch(err){
            console.log(err)
        }
    }
}

export const updateUser=(userData)=>{
    return async(dispatch)=>{
        API.patch(`/${_id}`,userData)
        dispatch(userData)
    }
}