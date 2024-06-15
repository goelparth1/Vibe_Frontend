import SignInForm from './_auth/forms/SignInForm.jsx'
import SignUpForm from './_auth/forms/SignUpForm.jsx'
import AuthLandingLayout from './_auth/AuthLandingLayout.jsx'
import RootLayout from './_root/RootLayout.jsx'
import ReactDOM from 'react-dom/client'
import { Home } from "./_root/pages"
import './global.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


// https://stackoverflow.com/questions/78255009/react-router-v6-route-without-a-path  great article to refer to

//we can make parent routes without path to give them outlet property and make multiple layouts 

const browserRouter = createBrowserRouter([
    {  //public routes
        element : < AuthLandingLayout />,
        children :[ 
            {
             path : '/signIn',
             element : < SignInForm />
            },
            {
                path : '/signUp',
                element : < SignUpForm />
            }
    ]
    },
    { //secure Routes 
        element : < RootLayout />,
        children : [
            {
            index : true,
            element : < Home />
            }
        ]

    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <RouterProvider router={browserRouter} />
        
    </>
);
