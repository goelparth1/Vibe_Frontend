import { Button } from "@/components/ui/button.tsx"
import { signUpSchema } from '@/Utils/Zod.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
// import { signUp } from "../../services/auth.ts";
import { useToast } from "../../components/ui/use-toast.ts"
import { useSignUpMutation } from "../../lib/tanstackquery/mutations.ts"
import { useNavigate } from "react-router-dom"
import {useUserContext} from "../../context/userContext/UserContext.tsx"
import { useEffect } from "react"

 export type ISignUpForm = z.infer< typeof signUpSchema >


function SignUpForm() {
    const navigate = useNavigate();
    const { getUserDetailsandAuthStatus, isLoading : isUserLoading } = useUserContext();
    const { toast } = useToast();
    const signUpForm = useForm< ISignUpForm >({
        resolver : zodResolver(signUpSchema),
        defaultValues : {
            email : "",
            password : "",
            name : "",
            username : "",
            confirmPassword : ""
        },
        mode : "onBlur"
    })
    const { mutateAsync : createUser , isPending : isCreatingUser } = useSignUpMutation(); 
    const onSubmit = async (data : ISignUpForm) => {
         try{
          const accessToken = await createUser(data);
          // if(!user){
          //   toast({
          //     title : "Sign Up Failed",
          //   })
          // }

          console.log("This is User " , accessToken);
          localStorage.setItem("accessToken", accessToken);
         }catch(err:any){
          if(err.response.status === 489){
            toast({
              title : "User Already Exists",
            })
            setTimeout(()=>{
            //  isLoading = false;
             navigate("/signIn");
            
            },1000)
         } }
         //accessToken
        
        //  console.log("I am here", "isUserLoggedIn")
         //now we have cookies from the backend 
         //so we can redirect the user to the home page and set user context
        const isUserLoggedIn = await getUserDetailsandAuthStatus();
         console.log( isUserLoggedIn, "isUserLoggedIn")
        if(isUserLoggedIn){
          signUpForm.reset();
          console.log("I am here")
          toast({
            title : "User Successfully created! Redirecting to Home Page",
          })
          // setTimeout(()=>{},1000)
          navigate("/");
          
        
        }else{
          signUpForm.reset();
         
        }

         
    
  }


   //abhi ke liye we won't check about malicious cookies
    //will check for that later


    
  return (
    <Form {...signUpForm} >
        <div 
        className = "flex flex-col items-center justify-center px-4">
        <img 
        src =  "/assets/images/logo.svg"
        alt = "logo"
        className = "h-24 rounded-3xl" />
        <h2 
        className = "text-center leading-[140%] py-4 text-vibeForm "> Please register yourself to join the community with 
        <br/><strong className = "font-bold">Positive Vibes</strong> </h2>
        
        
        <form 
        onSubmit = {signUpForm.handleSubmit(onSubmit)}
        className = " text-vibeForm flex flex-col w-full">
            <FormField
              control = {signUpForm.control}
              name = "name"
              render = {({ field }) => (
                <FormItem
                className = "space-y-1">
                  <FormLabel  className = "">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                    className = 'text-vibeForm border-none bg-shadInput'
                    type = "text" 
                    {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control = {signUpForm.control}
              name = "username"
              render = {({ field }) => (
                <FormItem 
                className = "space-y-1">
                  <FormLabel 
                  className = "">Username</FormLabel>
                  <FormControl>
                    <Input 
                    className='text-vibeForm border-none bg-shadInput' 
                    type = "text"
                    {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control = {signUpForm.control}
              name = "email"
              render = {({ field }) => (
                <FormItem
                className = "space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    className='text-vibeForm border-none bg-shadInput'
                    type = "text" 
                    {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control = {signUpForm.control}
              name = "password"
              render = {({ field }) => (
                <FormItem
                className = "space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                    className ='text-vibeForm border-none bg-shadInput'
                    type = "password" 
                    {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control = {signUpForm.control}
              name = "confirmPassword"
              render = {({ field }) => (
                <FormItem
                className = "space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                    className='text-vibeForm border-none bg-shadInput'
                    type = "password" 
                    {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         <Button
          type = "submit"
          className = "bg-purple-700 my-4">{
            isCreatingUser || isUserLoading? (
              <div 
              className = "flex justify-center items-center h-full w-full">
              <img
               src = "/assets/images/Loading.svg"
               alt = 'loading' 
               className = ' h-full object-cover ml-1 '/>  Loading...
              </div>  
            ) : (
                <div>
                    Sign Up
                </div>
            )}
          </Button>
          <p
            className = " text-center text-vibeForm "> Already have an account? <Link
            to = "/signIN"
            className = "text-purple-300" >Log In</Link> 
          </p>
        </form>
    </div>
  </Form>


  )
}

export default SignUpForm;
