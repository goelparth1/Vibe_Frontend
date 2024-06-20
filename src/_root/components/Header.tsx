import React ,{useEffect}from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../../context/userContext/UserContext"
import { useSignOutMutation } from '@/lib/tanstackquery/mutations'

function Header() {

  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutateAsync: signOut, isSuccess } = useSignOutMutation();

  useEffect(() => {
    console.log(user, "user");
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
      <section className="fixed top-0 z-100 md:hidden w-full ">
        <div className="flex-between py-0 px-4 my-0 w-full">
          <Link to="/" className="flex gap-3 items-center">
            <div
            className = "flex flex-1 flex-start">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              className = "h-1/6 w-1/6 rounded-lg"
            />
            <img
            src = "/assets/images/loggoSupport.png" 
            alt = "supportLogo" 
            className = "h-1/3 w-1/3 rounded-lg"/>
            </div>
          </Link>
  
          <div className="flex h-full w-half ">
          <Button
            variant="ghost"
            className="z-10"
            onClick={() => signOut()}>
            <img src="/assets/icons/logout.png" alt="logout"
            className=' z-200 h-full w-full' />
          </Button>
          <Link to={`/profile/${user._id}`} className="flex-center gap-3">
            <img
              src= "/assets/images/siteLogo.svg"
              alt="profile"
              className="h-full w- rounded-full"
            />
          </Link>
        </div>
        </div>
      </section>
    );
  };
  

export default Header