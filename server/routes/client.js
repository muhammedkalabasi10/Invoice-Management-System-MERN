import express from 'express'
import { getClient, getClients, addClient, updateClient, deleteClient } from '../controllers/client.js'
import auth from '../middleware/auth.js'
const router=express.Router()

router.get('/',auth,getClients)
router.get('/:id',auth,getClient)
router.post('/',auth,addClient)
router.patch('/:id',auth,updateClient)
router.delete('/:id',auth,deleteClient)

export default router