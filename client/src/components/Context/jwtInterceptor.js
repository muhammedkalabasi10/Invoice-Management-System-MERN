import axios from "axios"

const jwtInterceoptor=axios.create({baseURL:process.env.REACT_APP_API})

jwtInterceoptor.interceptors.request.use((config)=>{
    let tokenData=JSON.parse(localStorage.getItem("token"))
    config.headers.Authorization=`Bearer ${tokenData.accessToken}`
    return config
},(error)=>{
    return Promise.reject(error)
})

jwtInterceoptor.interceptors.response.use((response)=>{
    return response
}, async(error)=>{
    if(error.response.status===401){
        const apiResponse=await axios.get(`${process.env.REACT_APP_API}/user/refresh`,{withCredentials: true})
        console.log(apiResponse)
        localStorage.setItem("token",JSON.stringify(apiResponse.data))
        error.config.headers.Authorization=`Bearer ${apiResponse.data.accessToken}`
        return axios(error.config)
    }else{
        return Promise.reject(error)
    }
})

export default jwtInterceoptor