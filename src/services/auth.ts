import axios from "axios";
import { signUpSchema } from "../Utils/Zod.ts";
import z from "zod";
import type { TUser } from "../type.d.ts";

// const axiosConfig = {
//     withCredentials : false,
//   };
type TSignUpFormData = z.infer< typeof signUpSchema >

export const signUp = async (data : TSignUpFormData) => {
  try {
    const response : any = await axios.post(`${import.meta.env.VITE_USER_URL}/register`, data);
    const resData =  await response.data;
    console.log(resData);
    return resData.data.accessToken;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const signIn = async (data : {
    email : string,
    password : string 
}) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_USER_URL}/login`, data);

        console.log("this is responsedata " ,response.data);
        return await response.data.data.accessToken;
    }catch(err){
        throw err;
    }
}

export const getUser = async () : Promise<TUser>=> {
   try{
          console.log("I am here inside getUser")
         const response = await axios.get(`${import.meta.env.VITE_USER_URL}/getUser`,{
          withCredentials : true,
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
          }
         })
         console.log(response);
         if(response.status === 403){
            //i will make a another request to get new accesstoken
            const res = await axios.post(`${import.meta.env.VITE_USER_URL}/getNewAccessToken`,{
              headers:{
                "Authorization" : `Bearer ${localStorage.getItem("refreshToken")}`
              }
            });
            if(res.status === 200){
                return await axios.get(`${import.meta.env.VITE_USER_URL}/getUser`);
            }else{
                throw new Error("Unauthorized");
            }
         }
         return await response.data;
   }catch(err){
         throw err;
   }
}

export const signOut = async () => {
  try{
    console.log("I am here inside signOut")
   const response = await axios.get(`${import.meta.env.VITE_USER_URL}/logout`,{
    withCredentials : true,
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
    }
   })
   console.log(response);
}catch(err){
   console.log(err,"this is error");
}finally{
  localStorage.removeItem("accessToken");
}
}