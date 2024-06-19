import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

function Header() {
  return (
      <section className="fixed top-0 z-100 md:hidden w-full ">
        <div className="flex-between py-3 px-4">
          <Link to="/" className="flex gap-3 items-center">
            <div
            className = "">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              className = "h-1/12 w-1/12 rounded-lg"
            />
            </div>
          </Link>
  
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="shad-button_ghost"
              onClick={() => signOut()}>
              <img src="/assets/icons/logout.svg" alt="logout" />
            </Button>
            {/* <Link to={`/profile/${user.username}`} className="flex items-center justify-center gap-3"> */}
              <img
                src={import.meta.env.VITE_CLOUDINARY_DEFAULT_AVATAR }
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            {/* </Link> */}
          </div>
        </div>
      </section>
    );
  };
  

export default Header