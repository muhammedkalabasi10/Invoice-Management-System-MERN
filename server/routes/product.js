import express from 'express'
import auth from '../middleware/auth.js'
import { getProduct, getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/product.js'

const router=express.Router()

router.get('/',auth,getProducts)
router.get('/:id',auth,getProduct)
router.post('/',auth,addProduct)
router.patch('/:id',auth,updateProduct)
router.delete('/:id',auth,deleteProduct)

export default router