import { lazy } from "react";

const Login = lazy(() => import("../modules/auth/Login"));
const Register = lazy(() => import("../modules/auth/Register"));
const ResetPassword = lazy(() => import("../modules/auth/ResetPassword"));
const NewPassword = lazy(() => import("../modules/auth/NewPassword"));

/*** Portal Pages ***/
const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));
const Cameras = lazy(() => import("../modules/cameras/Cameras"));
const AddCamera = lazy(() => import("../modules/add-camera/AddCamera"));
const Profile = lazy(() => import("../modules/profile/Profile"));
const AllUsers = lazy(() => import("../modules/all-users/AllUsers"));
const UpgradeToPro = lazy(() => import("../modules/upgrade/UpgradeToPro"));

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/update-password/:id/:resetToken",
    element: <NewPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/cameras",
    element: <Cameras />,
  },
  {
    path: "/add-camera",
    element: <AddCamera />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/all-users",
    element: <AllUsers />,
  },
  {
    path: "/upgrade-to-pro",
    element: <UpgradeToPro />,
  },
];
