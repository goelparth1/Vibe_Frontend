import axios from "axios";
import { signUpSchema } from "../Utils/Zod.ts";
import z from "zod";

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

