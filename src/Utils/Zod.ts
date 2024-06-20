
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

const signInSchema = z.object({
    email : z.string().email(),
    password : z.string()
                .regex( 
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    {
                        message : "Password is incorrect"
                    }
                )
})

const PostSchema = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters required for a caption." }).max(2200, { message: "Maximum 2,200 caracters are allowed for a caption" }),
    file: z.custom<File[]>(),//File[] is not a primitive type so we have to use custom and File[] is from Headers gloabally declared by node
    location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
  });
  

export {
    signUpSchema,
    signInSchema,
    PostSchema
}