import { useContext,createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Types } from "mongoose";
import type {TUser as IUser} from "../../type.d.ts";    
import { getUser } from "@/services/auth.ts";

export const initialContext = {
    user : {
        _id : undefined,
        name : "",
        username : "",
        email : "",
        avatar : import.meta.env.VITE_DEFAULT_AVATAR as string,
        bio : "Hey there! I am using Vibe.",
    },
    isLoading : false,
    isSignedIn : false,
    setUser : ()=>{},
    setIsSignedIn : ()=>{},
    setIsLoading : ()=>{},
    getUserDetailsandAuthStatus: async () => false as boolean,

}

interface IuserContext  {
    user : IUser,
    isLoading : boolean,
    isSignedIn : boolean,
    setUser : React.Dispatch<React.SetStateAction<IUser>>,
    setIsSignedIn : React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading : React.Dispatch<React.SetStateAction<boolean>>,
    getUserDetailsandAuthStatus:  () => Promise<boolean>,
}
export const UserContext = createContext<IuserContext>(initialContext);

 export function UserContextProvider({children} : {children : React.ReactNode}){
    const [user, setUser] = useState<IUser>(initialContext.user);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(initialContext.isSignedIn);
    const [isLoading, setIsLoading] = useState<boolean>(initialContext.isLoading);
    const getUserDetailsandAuthStatus = async () : Promise<boolean> => {
        console.log("I am here")
        setIsLoading(true);
        // getUser().then((data) => {
        //     //data type do not match isliye nhi kar rha setuser(data)
        //     console.log(data)
        //    const toSetData = {
        //        name : data.name,
        //        username : data.username,
        //        email : data.email,
        //        avatar : data.avatar,
        //        bio : data.bio,
        //        _id : data._id, 
        //     }
        //     setUser(toSetData);
        //     setIsSignedIn(true);
        //     return (true);
        // }).catch((err)=>{
        //     setIsSignedIn(false);
        //     return false;
        // }).finally(()=>{
        //     setIsLoading(false);
        // })
        try{
            const data : any = await getUser();
            console.log(data,"data inside getUserDetailsandAuthStatus")
            const toSetData = {
                name : data.data.name,
                username : data.data.username,
                email : data.data.email,
                avatar : data.data.avatar,
                bio : data.data.bio,
                _id : data.data._id, 
             }
             console.log(toSetData,"toSetData");
             setUser(toSetData);
             setIsSignedIn(true);
             return (true);
        }catch(err){
            console.log(err);
            setIsSignedIn(false)
            return false;
        }finally{
            setIsLoading(false);
        }
        
    }
      const navigate = useNavigate();
    useEffect(()=>{

        if(localStorage.getItem("accessToken") === undefined||null){
            navigate("/signIn");
         }
         //now since accessToken there will update user at every referesh
      getUserDetailsandAuthStatus();
       //will throw error if cookies are not set or expired
      

    },[])
    return (
       < UserContext.Provider value = {{user, setUser, isSignedIn, setIsSignedIn, isLoading, setIsLoading,getUserDetailsandAuthStatus }}>
       {children}
       </UserContext.Provider>
    )
 }


 export const useUserContext = () => useContext(UserContext);