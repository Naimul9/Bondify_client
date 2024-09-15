import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import { Router } from './Components/Routes/Router';
import AuthProvider from './Components/Provider/AuthProvider';
import { Toaster } from 'react-hot-toast';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={Router} />
    <Toaster/>
    </AuthProvider>
  </StrictMode>,
)
