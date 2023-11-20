import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes/web";
import PageLoader from "./modules/shared/components/PageLoader";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "toastr/build/toastr.min.css";
import axiosConfiguration from "./axiosConfig";
// import {AuthProvider} from 'react-auth-kit';

axiosConfiguration();

let routers = [...routes];

const router = createBrowserRouter(routers);
export default function App() {
  return (
    // <AuthProvider
    //   authType={'cookie'}
    //   authName={process.env.REACT_APP_NAME}
    //   cookieDomain={window.location.hostname}
    //   cookieSecure={window.location.protocol === "https:"}
    //   >
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    // </AuthProvider>
  );
}
