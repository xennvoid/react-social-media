import React, { useContext, useEffect } from 'react'
import './App.scss'
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Leftbar from './components/leftbar/Leftbar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import { AuthContext } from './context/authContext'
import { QueryClient, QueryClientProvider } from "react-query";
import Subscriptions from './pages/subscriptions/Subscriptions'
import UserUpdate from './pages/userUpdate/UserUpdate'
import Funds from './pages/funds/Funds'
import Chat from './pages/chat/Chat'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

function App() {

  const { currentUser } = useContext(AuthContext)

  const Layout = ({ children }) => {

    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return (
      <>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Leftbar />
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "profile/:id",
          element: <Profile />
        },
        {
          path: "profile/:id/subscriptions",
          element: <Subscriptions />
        },
        {
          path: "profile/:id/subscribers",
          element: <Subscriptions />
        },
        {
          path: "profile/:id/update",
          element: <UserUpdate />
        },
        {
          path: "/charity",
          element: <Funds />
        },
        {
          path: "/chat",
          element: <Chat />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ])

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}

export default App
