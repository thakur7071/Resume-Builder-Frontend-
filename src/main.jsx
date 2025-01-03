import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'

const PUBLISHABLE_KEY = "pk_test_d29ya2FibGUtbWFuYXRlZS05OS5jbGVyay5hY2NvdW50cy5kZXYk";
const router = createBrowserRouter([
  {
    

   element:<App/>,
   children:[
  {
      path:'/dashboard',
      element:<Dashboard/>
    },{
      path:'/dashboard/resume/:resumeId/edit',
      element:<EditResume/>
    }
   ]
  },
  {
    path:'/',
    element:<Home/>
  },
{
  path:'/auth/sign-in',
  element:<SignInPage/>
},{
  path:'/my-resume/:resumeId/view',
  element:<ViewResume/>
}
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
