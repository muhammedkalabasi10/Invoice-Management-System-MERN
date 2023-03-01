import ClientModel from '../models/ClientModel.js'

export const getClient=async(req,res)=>{
    const { id } = req.params
    try{
        const client=await ClientModel.findById(id)
        res.status(200).json(client)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getClients=async(req,res)=>{
    try{
        const clients=await ClientModel.find()
        res.status(200).json(clients)
    }catch(err){
        res.json({message: err.message})
    }
}

export const addClient=async(req,res)=>{
    const client = req.body
    const newClient=new ClientModel({...client})
    try{
        await newClient.save()
        res.status(201).json(newClient)
    }catch(err){
        res.status(409).json({message: err.message})
    }
}

export const updateClient=async(req,res)=>{
    const { id:_id } = req.params
    const client=req.body
    try{
        const updatedClient=await ClientModel.findByIdAndUpdate(_id, {...client, _id},{new:true})
        res.status(200).json(updatedClient)
    }catch(err){
        res.json({message: err.message})
    }
}

export const deleteClient=async(req,res)=>{
    const { id } = req.params
    try{
        await ClientModel.findByIdAndRemove(id)
        res.json({message: "Client deleted successfully"})
    }catch(err){
        res.json({message:err.message})
    }
}