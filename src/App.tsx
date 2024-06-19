import { Routes, Route } from "react-router-dom";
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignInForm from './_auth/forms/SignInForm.tsx'
import SignUpForm from './_auth/forms/SignUpForm.tsx'
import AuthLandingLayout from './_auth/AuthLandingLayout.tsx'
import RootLayout from './_root/RootLayout.tsx'
import { Home } from "./_root/pages"
import './globals.css'
import { Toaster } from './components/ui/toaster.tsx'

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLandingLayout />}>
          <Route path="/signIn" element={<SignInForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
