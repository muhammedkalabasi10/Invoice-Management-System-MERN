import jwtInterceoptor from "../components/Context/jwtInterceptor";
import { invoiceActions } from "../slices/InvoiceSlice";

export const getInvoice=(invoiceId)=>{
    return async(dispatch)=>{
        const invoice=await jwtInterceoptor.get(`/invoices/${invoiceId}`)
        dispatch(invoiceActions.getInvoice(invoice.data))
    }
}

export const getInvoices=()=>{
    return async(dispatch)=>{
        const invoices=await jwtInterceoptor.get('/invoices')
        dispatch(invoiceActions.getInvoices(invoices.data))
    }
}



export const addInvoice=(invoiceData,navigate)=>{
    
    return async(dispatch)=>{
        const invoice=await jwtInterceoptor.post('/invoices',invoiceData)
        await dispatch(invoiceActions.addInvoice(invoice.data))
        navigate(`/invoices/${invoice.data._id}`)     
    }
}

export const updateInvoice=(invoiceData)=>{
    return async(dispatch)=>{
        await jwtInterceoptor.patch(`/invoices/${invoiceData._id}`,invoiceData)
        dispatch(invoiceActions.updateInvoice(invoiceData))
    }
}

export const deleteInvoice=(invoiceId)=>{
    return async(dispatch)=>{
        await jwtInterceoptor.delete(`/invoices/${invoiceId}`)
        dispatch(invoiceActions.deleteInvoice({_id:invoiceId}))
    }
}