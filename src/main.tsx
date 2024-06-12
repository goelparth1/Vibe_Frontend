import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


// https://stackoverflow.com/questions/78255009/react-router-v6-route-without-a-path  great article to refer to

//we can make parent routes without path to give them outlet property and make multiple layouts 

const router = createBrowserRouter([
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

            }
        ]

    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(

    <App />
  
)
