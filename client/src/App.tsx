import "./App.css";
import { useEffect } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticationGuard } from "./Components/AuthenticationGuard";

import FirstVisit from "./Components/FirstVisit";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";
import Error from "./Components/Error";
import Coding from "./Routes/Coding";
import Interview from "./Routes/Interview";
import PastInterviews from "./Routes/PastInterviews";
import Profile from "./Routes/Profile";
import Settings from "./Routes/Settings";
import Insights from "./Routes/Insights";
import { useContext } from "react";
import { Context } from "./Context";
import Navbar from "./Components/Navbar";

function App() {
  const { currentUser, isAuthenticated, isLoading, handleGetUser } = useContext(
    Context
  ) as any;

  useEffect(() => {
    if (isAuthenticated) {
      handleGetUser();
    }
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticationGuard component={Dashboard} />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard",
      element: <AuthenticationGuard component={Dashboard} />,
      errorElement: <Error />,
    },
    {
      path: "/codingtest",
      element: <AuthenticationGuard component={Coding} />,
      errorElement: <Error />,
    },
    {
      path: "/interview",
      element: <AuthenticationGuard component={Interview} />,
      errorElement: <Error />,
    },
    {
      path: "/pastinterviews",
      element: <AuthenticationGuard component={PastInterviews} />,
      errorElement: <Error />,
    },
    {
      path: "/profile",
      element: <AuthenticationGuard component={Profile} />,
      errorElement: <Error />,
    },
    {
      path: "/settings",
      element: <AuthenticationGuard component={Settings} />,
      errorElement: <Error />,
    },
    {
      path: "/insights",
      element: <AuthenticationGuard component={Insights} />,
      errorElement: <Error />,
    },
  ]);

  return (
    <div className="App">
      {isLoading ? (
        <div>Page is loading</div>
      ) : !isAuthenticated ? (
        <Login />
      ) : currentUser.name === "" ? (
        <FirstVisit />
      ) : (
        <>
          <Navbar />
          <RouterProvider router={router} />
        </>
      )}
    </div>
  );
}

export default App;
