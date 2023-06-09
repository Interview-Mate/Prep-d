import "./App.css";
import { useEffect } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticationGuard } from "./Components/AuthenticationGuard";
import { useContext } from "react";
import { Context } from "./Context";

import FirstVisit from './Components/FirstVisit';
import Login from './Routes/Login';
import Dashboard from './Routes/Dashboard';
import Error from './Components/Error';
import CodingDashboard from './Routes/CodingDashboard';
import Coding from './Routes/Coding';
import Interview from './Routes/Interview';
import PastInterviews from './Routes/PastInterviews';
import Profile from './Routes/Profile';
import Settings from './Routes/Settings';
import Insights from './Routes/Insights';
import Spinner from './Components/Spinner';
import CoverLetterBuilder from './Routes/CoverLetterBuilder';
import CoverLetterReviewer from './Routes/CoverLetterReviewer';
import ResumeBuilder from './Routes/ResumeBuilder';

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
      path: "/home",
      element: <AuthenticationGuard component={Dashboard} />,
      errorElement: <Error />,
    },
    {
      path: "/codingdashboard",
      element: <AuthenticationGuard component={CodingDashboard} />,
      errorElement: <Error />,
    },
    {
      path: "/codingtest",
      element: <AuthenticationGuard component={Coding} />,
      children: [
        {
          path: "level/:levelId",
          element: <AuthenticationGuard component={Coding} />,
        },
        {
          path: ":problemId",
          element: <AuthenticationGuard component={Coding} />,
        },
      ],
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
    {
      path: "/coverletterbuilder",
      element: <AuthenticationGuard component={CoverLetterBuilder} />,
      errorElement: <Error />,
    },
    {
      path: "/coverletterreviewer",
      element: <AuthenticationGuard component={CoverLetterReviewer} />,
      errorElement: <Error />,
    },
    {
      path: '/resumebuilder',
      element: <AuthenticationGuard component={ResumeBuilder} />,
      errorElement: <Error />,
    },
  ]);

  return (
    <div className="App">
      {isLoading ? (
        <div className="mt-96">
          <Spinner />
        </div>
      ) : !isAuthenticated ? (
        <Login />
      ) : currentUser.name === "" ? (
        <FirstVisit />
      ) : (
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      )}
    </div>
  );
}

export default App;
