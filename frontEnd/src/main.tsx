import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
// import ErrorPage from './pages/ErrorPage.tsx'
// import Dashboard from './pages/Dashboard.tsx'
// import Login from './pages/Login.tsx'
// import SignUp from './pages/SignUp.tsx'

// const router = createBrowserRouter([{
//   path: '/',
//   element: <App />,
//   errorElement: <ErrorPage />
// },
// {
//   path: '/signup',
//   element: <SignUp />
// },
// {
//   path: '/dashboard',
//   element: <Dashboard />
// },
// {
//   path: '/login',
//   element: <Login />
// }
// ])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </StrictMode>,
)
