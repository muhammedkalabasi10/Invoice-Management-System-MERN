import jwtInterceoptor from "../components/Context/jwtInterceptor"
import { clientActions } from "../slices/ClientSlice"


export const getClients=()=>{
    return async(dispatch)=>{
        const clients=await jwtInterceoptor.get('/clients')
        dispatch(clientActions.getClients(clients.data))
    }
}

export const addClient=(clientData)=>{
    return async(dispatch)=>{
        await jwtInterceoptor.post('/clients',clientData)
        dispatch(clientActions.addClient(clientData))
    }
}

export const updateClient=(clientData)=>{
    return async(dispatch)=>{
        jwtInterceoptor.patch(`/clients/${clientData._id}`,clientData)
        dispatch(clientActions.updateClient(clientData))
    }
}

export const deleteClient=(clientId)=>{
    return async(dispatch)=>{
        jwtInterceoptor.delete(`/clients/${clientId}`)
        dispatch({_id:clientId})
    }
}