import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ErrorPage from "./Components/ErrorPage";
import UserDashboard from "./Components/Dashboard";
import LoanForm from "./Components/ApplyLoan";
import LoanList from "./Components/LoanList";
import AdminPanel from "./Components/Admin";
import AdminViewApplications from "./Components/ViewApplication";
import ManageUsers from "./Components/ManageUsers";
import RoutesLayout from "./Routes/RouterLayout";
import LoanHistory from "./Components/LoanPayment";
import DocumentUpload from "./Components/UserDetails";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import About from "./Components/About";
import Contact from "./Components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutesLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute  allowedRoles={["user"]}  />, 
        children: [{ index: true, element: <UserDashboard /> }],
      },
      {
        path: "/applyLoan",
        element: <ProtectedRoute  allowedRoles={["user"]}  />, 
        children: [{ index: true, element: <LoanForm /> }],
      },
      {
        path: "/loanList",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ index: true, element: <LoanList /> }],
      },
      {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ index: true, element: <AdminPanel /> }],
      },
      {
        path: "/viewApplication",
        element: <ProtectedRoute allowedRoles={["admin"]}  />,
        children: [{ index: true, element: <AdminViewApplications /> }],
      },
      {
        path: "/users",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ index: true, element: <ManageUsers /> }],
      },
      {
        path: "/payments",
        element: <ProtectedRoute allowedRoles={["user"]}  />,
        children: [{ index: true, element: <LoanHistory /> }],
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      // {
      //   path: "/upload",
      //   element: <ProtectedRoute  />,
      //   children: [{ index: true, element: <DocumentUpload /> }],
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
