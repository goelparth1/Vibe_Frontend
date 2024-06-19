import React, { useEffect } from 'react'
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from "@/components/ui/button.tsx"
import { signInSchema } from '@/Utils/Zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {Link,useNavigate} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useUserContext } from '../../context/userContext/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useSignInMutation } from '@/lib/tanstackquery/mutations';
export  type TSignInForm = z.infer<typeof signInSchema>



function SignInForms() {
  const {getUserDetailsandAuthStatus,isLoading: isUserLoading } = useUserContext();
  const {toast} = useToast();
  //  getUserDetailsandAuthStatus().then((data) => ;
const navigate = useNavigate();
  // const isLoading = false;

  const { mutateAsync: signInAccount, isPending : isLoading } = useSignInMutation();

  const onSubmit = async (data : TSignInForm) => {
        const accessToken =  await signInAccount(data);
        console.log("This is  " , accessToken);

        //now we have AccessToken
        localStorage.setItem("accessToken", accessToken);
        const isUserLoggedIn = await getUserDetailsandAuthStatus();
         console.log( isUserLoggedIn, "isUserLoggedIn")
        if(isUserLoggedIn){
          signInForm.reset();
          console.log("I am inside login user context checker")
          toast({
            title : "User Successfully Logged In! Redirecting to Home Page",
          })
          // setTimeout(()=>{},1000)
          navigate("/");
          
        
        }else{
          signInForm.reset();
         
        }

  }
  const signInForm = useForm<TSignInForm>( {
    resolver : zodResolver(signInSchema),
    defaultValues : {
      email : "",
      password : ""
    },
    mode : "onBlur"
  });

 
  // useEffect(() => {
  // if(isUserLoggedIn){
  //   console.log("User is Logged In");
  //   navigate("/");
  // }},[])
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
            isLoading || isUserLoading ? (
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