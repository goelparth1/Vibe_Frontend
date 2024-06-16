import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignInForm from './_auth/forms/SignInForm.tsx'
import SignUpForm from './_auth/forms/SignUpForm.tsx'
import AuthLandingLayout from './_auth/AuthLandingLayout.tsx'
import RootLayout from './_root/RootLayout.tsx'
import { Home } from "./_root/pages"
import './globals.css'





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



function App() {
  

  return (
   
    <main 
    className = " h-screen flex " >
    <RouterProvider router={browserRouter} />
    </main>
  )
}

export default App
