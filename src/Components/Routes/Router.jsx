import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

export const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
    },
  ]);