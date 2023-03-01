import express from 'express'
import auth from '../middleware/auth.js'
import { getInvoice, getInvoices, getInvoicesByUser, addInvoice, updateInvoice, deleteInvoice, sendEmail } from '../controllers/invoice.js'
const router=express.Router()

router.get('/',auth,getInvoices)
router.get('/:id',auth,getInvoice)
router.post('/',auth,addInvoice)
router.patch('/:id',auth,updateInvoice)
router.delete('/:id',auth,deleteInvoice)
router.post('/sendmail',auth,sendEmail)

export default router