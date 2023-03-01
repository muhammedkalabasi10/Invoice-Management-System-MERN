import jwtInterceoptor from "../components/Context/jwtInterceptor"
import { productActions } from "../slices/ProductSlice"

export const getProducts=()=>{
    return async(dispatch)=>{
        const products=await jwtInterceoptor.get('/products')
        dispatch(productActions.getProducts(products.data))
    }
}

export const addProduct=(productData)=>{
    return async(dispatch)=>{
        await jwtInterceoptor.post('/products',productData)
        dispatch(productActions.addProduct(productData))
    }
}

export const updateProduct=(productData)=>{
    return async(dispatch)=>{
        console.log(productData)
        await jwtInterceoptor.patch(`/products/${productData._id}`,productData)
        dispatch(productActions.updateProduct(productData))
    }
}

export const deleteProduct=(productId)=>{
    return async(dispatch)=>{
        await jwtInterceoptor.delete(`/products/${productId}`)
        dispatch(productActions.deleteProduct({_id:productId}))
    }
}