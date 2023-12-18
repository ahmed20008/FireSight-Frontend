import {lazy} from "react";
import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = lazy(() => import("../modules/auth/Login"));
const Register = lazy(() => import("../modules/auth/Register"));
const ResetPassword = lazy(() => import("../modules/auth/ResetPassword"));
const NewPassword = lazy(() => import("../modules/auth/NewPassword"));

/*** Portal Pages ***/
const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));
const Cameras = lazy(() => import("../modules/cameras/Cameras"));
const MyCameras = lazy(() => import("../modules/cameras/MyCameras"));
const AddCamera = lazy(() => import("../modules/add-camera/AddCamera"));
const Profile = lazy(() => import("../modules/profile/Profile"));
const AllUsers = lazy(() => import("../modules/all-users/AllUsers"));
const AllRequest = lazy(() => import("../modules/all-request/AllRequest"));
const UpgradeToPro = lazy(() => import("../modules/upgrade/UpgradeToPro"));
const Error404 = lazy(() => import("../modules/shared/components/Error404"));
const Thankyou = lazy(() => import("../modules/auth/Thankyou"))

const ProtectedRoute = ({component}) => {
  const [cookies] = useCookies(["auth_token"]);

  if (!cookies.auth_token) {
    return <Navigate to="/" />;
  }

  return component;
};

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
    path: "/thank-you",
    element: <Thankyou />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute component={<Dashboard />} />,
  },
  {
    path: "/cameras",
    element: <ProtectedRoute component={<Cameras />} />,
  },
  {
    path: "/my-cameras",
    element: <ProtectedRoute component={<MyCameras />} />,
  },
  {
    path: "/add-camera",
    element: <ProtectedRoute component={<AddCamera />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute component={<Profile />} />,
  },
  {
    path: "/all-users",
    element: <ProtectedRoute component={<AllUsers />} />,
  },
  {
    path: "/all-request",
    element: <ProtectedRoute component={<AllRequest />} />,
  },
  {
    path: "/upgrade-to-pro",
    element: <ProtectedRoute component={<UpgradeToPro />} />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
