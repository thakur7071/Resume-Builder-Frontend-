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

// Retrieve the publishable key from the environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log('VITE_CLERK_PUBLISHABLE_KEY:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);



// If the publishable key is missing, log an error and stop rendering
if (!PUBLISHABLE_KEY) {
  console.error('Clerk publishable key is missing. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.')
}

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/dashboard/resume/:resumeId/edit', element: <EditResume /> },
    ]
  },
  { path: '/', element: <Home /> },
  { path: '/auth/sign-in', element: <SignInPage /> },
  { path: '/my-resume/:resumeId/view', element: <ViewResume /> },
])

// Render the application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
)
