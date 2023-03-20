import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Dashboard from "./Routes/Dashboard";
import Error from "./Components/Error";
import Coding from "./Routes/Coding";
import Interview from "./Routes/Interview";
import PastInterviews from "./Routes/PastInterviews";
import Profile from "./Routes/Profile";
import Settings from "./Routes/Settings";
import Insights from "./Routes/Insights";

// type createBrowserRouter(
//   routes: RouteObject[],
//   opts?: {
//     basename?: string;
//     window?: Window;
//   }
// ): RemixRouter;

// interface RouteObject {
//   path?: string;
//   index?: boolean;
//   children?: React.ReactNode;
//   caseSensitive?: boolean;
//   id?: string;
//   loader?: LoaderFunction;
//   action?: ActionFunction;
//   element?: React.ReactNode | null;
//   Component?: React.ComponentType | null;
//   errorElement?: React.ReactNode | null;
//   ErrorBoundary?: React.ComponentType | null;
//   handle?: RouteObject["handle"];
//   shouldRevalidate?: ShouldRevalidateFunction;
//   lazy?: LazyRouteFunction<RouteObject>;
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: "/codingtest",
    element: <Coding />,
    errorElement: <Error />,
  },
  {
    path: "/interview",
    element: <Interview />,
    errorElement: <Error />,
  },
  {
    path: "/pastinterviews",
    element: <PastInterviews />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <Error />,
  },
  {
    path: "/insights",
    element: <Insights />,
    errorElement: <Error />,
  },
  {
    path: "/codingtest",
    element: <Coding />,
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
