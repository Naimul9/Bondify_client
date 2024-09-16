import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import AddFriend from "../Pages/AddFriend/AddFriend";
import PrivateRoute from "./PrivateRoute";

export const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {index: true , element: <Home/> },
        {path:'/add-friend', element:  <PrivateRoute><AddFriend/></PrivateRoute>  },
        {path:'/login', element: <Login/>},
        {path: '/register', element: <Register/>},


      ]
    },
  ]);