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
import DashboardHome from "./DashboardHome";
import AllCreatedDonor from "../Pages/AllCreatedDonor";
import UserDetails from "../Pages/UserDetails";
import UpdateDonationRequest from "../Pages/UpdateDonationRequest";
import MyDonationRequest from "../Pages/MyDonationRequest";
import MyDonationRequestDetails from "../Pages/MyDonationRequestDetails";
import AllDonationRequest from "../Pages/Adminpage/AllDonationRequest";
import ContentManagement from "../Pages/ContentManagement ";
import AddBlog from "../Pages/AddBlog";
import BlogPublic from "../Pages/BlogPublic";
import Contact from "../Pages/Contact";
import BlogDetails from "../Pages/BlogDetails";
import BloodDonationRequestPending from "../Pages/BloodDonationRequestPending";
import BloodDonationRequestPendingDetails from "../Pages/BloodDonationRequestPendingDetails";
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
        },
        // for requested data;
        {
            path:'/allcreateddonor',
            element:<AllCreatedDonor></AllCreatedDonor>
        },
        {
            path:'/blogpublic',
            element:<BlogPublic></BlogPublic>
        },
        {
            path:'/blogdetails/:id',
            element:<BlogDetails></BlogDetails>

        },

        {
            path:'/contact',
            element:<Contact></Contact>
        },
        {
            path:'/BloodDonationRequestPending',
            element:<BloodDonationRequestPending></BloodDonationRequestPending>
        },
        {
            path:'/BloodDonationRequestPending/:id',
            element:<PrivateRoute><BloodDonationRequestPendingDetails></BloodDonationRequestPendingDetails></PrivateRoute>

        }

      ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'/dashboard/ex',
                element:<Ex></Ex>
               
            },
            {
                path:"/dashboard",
                element:<DashboardHome></DashboardHome>


            },

            {
                path:'/dashboard/profile',
                element:<Profile></Profile>

            },
            {
                path:'/dashboard/donationrequest',
                element:<PrivateRoute><DonationRequest></DonationRequest></PrivateRoute>
            },
            {
                path:'/dashboard/updatedonationrequest/:id',
                element:<UpdateDonationRequest></UpdateDonationRequest>

            },

            {
                path: '/dashboard/usersDetails/:id', // Add leading slash
                element: <UserDetails></UserDetails>
            },
            {
                path:'/dashboard/my-donation-requests',
                element:<MyDonationRequest></MyDonationRequest>
            },
            {
                path:'/dashboard/mydonationrequestdetails/:id',
                element:<MyDonationRequestDetails></MyDonationRequestDetails>
            },
            {
                path:'/dashboard/content-management',
                element:<ContentManagement></ContentManagement>,

            },
            {
                path:'/dashboard/add-blog',
                element:<AddBlog></AddBlog>

            }
            






            // admin
            ,
            {
                path:'/dashboard/allusers',
                element:<AllUsers></AllUsers>
            },
            {
                path:'/dashboard/all-blood-donation-request',
                element:<AllDonationRequest></AllDonationRequest>
            },
        ]
    }
  ]);
  