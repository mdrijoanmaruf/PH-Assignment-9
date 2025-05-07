import { createBrowserRouter } from "react-router-dom";
import Root from '../Components/Root/Root'
import Home from '../Components/Home/Home'
import PageNotFound from "../Components/ErrorPage/PageNotFound";
import SignUpUser from "../Components/Login/SignUpUser";
import LogInUser from "../Components/Login/LogInUser";
import Blog from "../Components/Blog/Blog";
import BlogDetail from "../Components/Blog/BlogDetail";
import TermsAndConditions from "../Pages/TermsAndConditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import SubscriptionDetail from "../Pages/SubscriptionDetail";
import MySubscriptions from "../Pages/MySubscriptions";
import Profile from "../Pages/Profile";
import ForgotPassword from "../Pages/ForgotPassword";
import PrivateRoute from "./PrivateRoute";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <PageNotFound></PageNotFound>,
      children : [
          { index: true, Component: Home },
          { path: "/login", Component: LogInUser },
          { path: "/signup", Component: SignUpUser },
          { path: "/forgot-password", Component: ForgotPassword },
          { path: "/blog", Component: Blog },
          { path: "/blog/:id", Component: BlogDetail },
          { path: "/terms-and-conditions", Component: TermsAndConditions },
          { path: "/privacy-policy", Component: PrivacyPolicy },
          { 
            path: "/subscription/:id", 
            element: <PrivateRoute><SubscriptionDetail /></PrivateRoute>
          },
          { 
            path: "/subscriptions", 
            element: <PrivateRoute><MySubscriptions /></PrivateRoute>
          },
          {
            path: "/profile",
            element: <PrivateRoute><Profile /></PrivateRoute>
          },
      ]
    },
]);