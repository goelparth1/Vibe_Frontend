
import { z } from "zod";


const signUpSchema = z.object(
    {
        email : z.string()
        .email(
          {
            message : "Invalid Email Address"
          }
        ),


        password : z.string()
        .regex(
            /^(?=.*[A-Z])/,
            {
                message : "Password must contain atleast one uppercase letter"
            }
        )
        .regex(
            /^(?=.*\d)/,
            {
                message : "Password must contain atleast one digit"
            }
        )
        .regex(
            /^(?=.*[!@#$%^&*])/,
            {
                message : "Password must contain atleast one special character"
            }
        )
        .min(6, "Password must be atleast 6 characters long")
        .max(20, "Password must not exceed 20 characters"),

        name : z.string()
        
    }
);




export {
    signUpSchema
}