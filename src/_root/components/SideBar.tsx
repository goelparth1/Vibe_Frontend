import { Link, NavLink, useNavigate } from "react-router-dom";
import { INavLink } from "../../types/index.js";
import { sidebarLinks } from "../../constants/index.ts";
import { Button } from "@/components/ui/button";
import { useSignOutMutation } from "../../lib/tanstackquery/mutations.ts";
import { useUserContext, initialContext } from "../../context/userContext/UserContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsSignedIn, isLoading } = useUserContext();

  const { mutateAsync: signOut } = useSignOutMutation();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsSignedIn(false);
    setUser(initialContext.user);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center justify-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            className="h-14 w-14 rounded-lg"
          />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <img
               src = "/assets/images/Loading.svg"
               alt = 'loading' 
               className = ' h-full object-cover ml-1 '/>
          </div>
        ) : (
          <Link to={`/profile/${user._id}`} className="flex gap-3 items-center">
            <img
              src={user.avatar || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}
{/* is Active isn't available to navlink childs so ak className add kar sakte and based on it conditionally apply kar sakte styles */}
        <ul className="flex flex-col ">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group`}>
                <NavLink
                  to={link.route}
                  className = {({isActive}) =>
                  `flex items-center  ${isActive ? "bg-primary-500 rounded-lg active":""} `
              }
>
                  <img
                    src={link.imgUrl}
                    alt={link.label}
                    className= {
                    `group-hover:invert-white flex  items-center p-4  `
                }
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium pl-2">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
