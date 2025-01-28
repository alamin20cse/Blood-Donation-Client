import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Home/Login";
import Secret from "../Pages/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Ex from "../Pages/Ex";
import Profile from "../Pages/Profile";
import DonationRequest from "../Pages/DonationRequest";
import AllUsers from "../Pages/Adminpage/AllUsers";
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
            
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/secret',
            element:<PrivateRoute><Secret></Secret></PrivateRoute>
        }

      ]
    },
    {
        path:"/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'/dashboard/ex',
                element:<Ex></Ex>
               
            },
            {
                path:'/dashboard/profile',
                element:<Profile></Profile>

            },
            {
                path:'/dashboard/donationrequest',
                element:<PrivateRoute><DonationRequest></DonationRequest></PrivateRoute>
            },






            // admin
            {
                path:'/dashboard/allusers',
                element:<AllUsers></AllUsers>
            }
        ]
    }
  ]);
  