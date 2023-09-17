import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/shared/index.css'
const appRouter = createBrowserRouter(router)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
)
