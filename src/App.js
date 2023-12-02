import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes/web";
import PageLoader from "./modules/shared/components/PageLoader";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "toastr/build/toastr.min.css";
import axiosConfiguration from "./axiosConfig";

axiosConfiguration();

let routers = [...routes];

const router = createBrowserRouter(routers);
export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
