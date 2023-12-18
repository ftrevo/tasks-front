import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { CreateUser } from './pages/CreateUser'
import { Login } from './pages/Login'
import { ResetPassword } from './pages/ResetPassword'
import { ChangePassword } from './pages/ChangePassword'
import Board from './pages/Board'
import Task from './pages/Task'

import { ToastContainer } from 'react-toastify'

import { SocketProvider } from './context/socket'
import { isAuthenticated } from './infra/sessionService'
import { Shell } from './components'

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const isAuth = isAuthenticated()
  if (isAuth) {
    return <Shell>{children}</Shell>
  }

  return <Navigate to="/login" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to="/login" replace />,
  },
  {
    path: 'user',
    element: <CreateUser />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'change-password',
    element: <ChangePassword />,
  },
  {
    path: 'board',
    element: (
      <PrivateRoute>
        <Board />
      </PrivateRoute>
    ),
  },
  {
    path: 'task/:id',
    element: (
      <PrivateRoute>
        <Task />
      </PrivateRoute>
    ),
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
