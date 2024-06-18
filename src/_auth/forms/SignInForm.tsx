import React from 'react'
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from "@/components/ui/button.tsx"
import { signInSchema } from '@/Utils/Zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {Link} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

export  type TSignInForm = z.infer<typeof signInSchema>
function SignInForms() {
  const isLoading = false;

  const onSubmit = (data : TSignInForm) => {
    console.log(data);
  }
  const signInForm = useForm<TSignInForm>( {
    resolver : zodResolver(signInSchema),
    defaultValues : {
      email : "",
      password : ""
    },
    mode : "onBlur"
  });
  return (
    <Form {...signInForm} >
        <div 
        className = "flex flex-col items-center justify-center px-4">
        <img 
        src =  "/assets/images/logo.svg"
        alt = "logo"
        className = "h-24 rounded-3xl" />
        <h2 
        className = "text-center leading-[140%] py-4 text-vibeForm "> Login to enjoy the community with 
        <br/><strong className = "font-bold">Positive Vibes</strong> </h2>
        
        
        <form 
        onSubmit = {signInForm.handleSubmit(onSubmit)}
        className = " text-vibeForm flex flex-col w-full">
            <FormField
              control = {signInForm.control}
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
              control = {signInForm.control}
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
            
         <Button
          type = "submit"
          className = "bg-purple-700 my-4">{
            isLoading ? (
              <div 
              className = "flex justify-center items-center h-full w-full">
              <img
               src = "/assets/images/Loading.svg"
               alt = 'loading' 
               className = ' h-full object-cover ml-1 '/>  Loading...
              </div>  
            ) : (
                <div>
                    Login
                </div>
            )}
          </Button>
          <p
            className = " text-center text-vibeForm "> Don't have an account? <Link
            to = "/signUP"
            className = "text-purple-300" >Sign Up</Link> 
          </p>
        </form>
    </div>
  </Form>


  )
}

export default SignInForms;