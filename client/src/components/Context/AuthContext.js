import axios from "axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import jwtInterceptor from "./jwtInterceptor";

const AuthContext = createContext();
const API = axios.create({ baseURL: process.env.REACT_APP_API + "/user" });

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("token")) {
      return jwt_decode(JSON.parse(localStorage.getItem("token")).accessToken);
    }
    return null;
  });

  const signup = async (payload, navigate) => {
    try {
      const apiResponse = await API.post("/signup", payload, {
        withCredentials: true,
      });
      /*localStorage.setItem("token", JSON.stringify(apiResponse.data));
      setUser(jwt_decode(apiResponse.data.accessToken));*/
      navigate(`/sentactivate/${apiResponse.data.email}`);
    } catch (error) {
      return error.response.data.message;
    }
  };

  const verifyAccount = async (payload, operation) => {
    try {
      const apiResponse = await API.post(
        `/verify/${payload.id}/${payload.token}`,{operation:operation},
        { withCredentials: true }
      );
      if(operation==="verify"){
        localStorage.setItem("token", JSON.stringify(apiResponse.data));
      setUser(jwt_decode(apiResponse.data.accessToken));
      }
    } catch (error) {
      return error.response.data.message;
    }
  };

  const login = async (payload) => {
    try {
      const apiResponse = await API.post("/signin", payload, {
        withCredentials: true,
      });
      localStorage.setItem("token", JSON.stringify(apiResponse.data));
      setUser(jwt_decode(apiResponse.data.accessToken));
    } catch (error) {
      return error.response.data.message;
    }
  };

  const updateUser = async (payload, id) => {
    try {
      const apiResponse = await jwtInterceptor.patch(`/user/${id}`, payload, {
        withCredentials: true,
      });
      localStorage.setItem("token", JSON.stringify(apiResponse.data));
      setUser(jwt_decode(apiResponse.data.accessToken));
    } catch (error) {
      return error.response.data.message;
    }
  };

  const logout = async () => {
    API.post("/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  const forgotPassword = async(payload) => {
    try {
     const res=await API.post("/forgot", payload);
     return res.data.message
    } catch (error) {
      return error.response.data.message;
    }
  };

  const resetPassword=async(payload,id)=>{
    try {
      const response=await API.patch(`/reset/${id}`, payload);
      console.log(response.data)
      return response.data
     } catch (error) {
       return error.response.data;
     }
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateUser, verifyAccount, forgotPassword,resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
