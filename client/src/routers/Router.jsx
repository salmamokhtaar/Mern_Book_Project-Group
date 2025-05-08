import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBooks from "../dashboard/UploadBooks";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AdminRoute from "../privateRoute/AdminRoute";
import Users from "../dashboard/Users";
import EditUser from "../dashboard/EditUser";
import UserProfile from "../components/UserProfile";
import axios from "axios";

// API base URL
const API_URL = 'http://localhost:3000';

// Create custom loaders that include auth token if available
const createAuthLoader = (url) => async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response.data;
  } catch (error) {
    console.error("Loader error:", error);
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) => createAuthLoader(`${API_URL}/book/${params.id}`)()
      },
      {
        path: "/profile",
        element: <PrivateRoute><UserProfile /></PrivateRoute>
      }
    ]
  },
  {
    path: "/admin/dashboard",
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBooks />
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />
      },
      {
        path: "/admin/dashboard/users",
        element: <Users />
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: ({ params }) => createAuthLoader(`${API_URL}/book/${params.id}`)()
      },
      {
        path: "/admin/dashboard/users/:id",
        element: <EditUser />,
        loader: ({ params }) => createAuthLoader(`${API_URL}/users/${params.id}`)()
      },
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

  export default router;