import axios from "axios";
import { signUpSchema } from "../Utils/Zod.ts";
import z from "zod";
import type { TUser } from "../type.d.ts";


type TSignUpFormData = z.infer< typeof signUpSchema >

export const signUp = async (data : TSignUpFormData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_USER_URL}/register`, data);
    return await response.data;
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
        return await response.data;
    }catch(err){
        throw err;
    }
}

export const getUser = async () : Promise<TUser>=> {
   try{
         const response = await axios.get(`${import.meta.env.VITE_USER_URL}/getUser`);
         if(response.status === 403){
            //i will make a another request to get new accesstoken
            const res = await axios.post(`${import.meta.env.VITE_USER_URL}/getNewAccessToken`);
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
