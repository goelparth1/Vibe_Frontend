
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
        ).regex(
            /^(?=.*\d)/,
            {
                message : "Password must contain atleast one digit"
            }
        ).regex(
            /^(?=.*[!@#$%^&*])/,
            {
                message : "Password must contain atleast one special character"
            }
        ).min(6, { message :  "Password must be atleast 6 characters long" })
        .max(20, { message : "Password must not exceed 20 characters" }),

        name : z.string()
        .min(3,{ message : "Name must be atleast 3 characters long" }),
        username : z.string()
        .min(3,{ message : "Username must be atleast 3 characters long" })
        .regex(
            /^(?=.*[A-Z])/,
            {
                message : "Username must contain atleast one uppercase letter"
            }
        ).regex(
            /^(?=.*\d)/,
            {
                message : "Username must contain atleast one digit"
            }
        ).max(20,{ message : "Username must not exceed 20 characters" }),
        confirmPassword : z.string(),  
    }
).refine(
    (data) => (data.password === data.confirmPassword),
    {
    path : ["confirmPassword"],
    message : "Passwords do not match",
    }
);



export {
    signUpSchema
}