import { Routes, Route } from "react-router-dom";
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignInForm from './_auth/forms/SignInForm.tsx'
import SignUpForm from './_auth/forms/SignUpForm.tsx'
import AuthLandingLayout from './_auth/AuthLandingLayout.tsx'
import RootLayout from './_root/RootLayout.tsx'
import { Home ,Explore,Messanger,CreatePost ,PostDetails,Profile,UpdateProfile,Saved} from "./_root/pages"
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/messanger" element={<Messanger />} />
          <Route path="/create-post" element={<CreatePost />} />
          {/* <Route path="/update-post/:id" element={<EditPost />} /> */}
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
