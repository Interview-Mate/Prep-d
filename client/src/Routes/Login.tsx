import { LockClosedIcon } from "@heroicons/react/20/solid";
import Interview from "../Assets/InterviewMock.JPG";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext } from "react";
import { Context } from "../Context";
import Login3D from "./Login3D";


export default function Login() {



  const { loginWithRedirect } = useAuth0();

  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  useEffect(() => {
    if (isAuthenticated) {
      handleGetUser();
    }
  }, [isAuthenticated]);

  return (
    <>
    <div className="flex login-container ">
      <div className=" m-10 w-full h-full z-0 ">
        <Login3D />
      </div>
      {!isAuthenticated && (
    <div className="login-button z-10">
      <button className="login-span" onClick={() => loginWithRedirect()}>
        <div className="z-20">
          <LockClosedIcon
            // className="h-5 text-african-violet-400 "
            aria-hidden="true"
          />
          Sign in
        </div>
      </button>
    </div>
  )}

    </div>
    </>
  );
}

// <h1 className="app-title text-gray-900">Prep'd</h1>
// <div className="flex login-container">

// <div className= 'w-96 h-auto'>
//     {/* <img className="login-image" src={Interview}></img> */}
//     <Login3D  />
//   </div>


//   {!isAuthenticated && (
//     <div className="login-button">
//       <button className="login-span" onClick={() => loginWithRedirect()}>
//         <div>
//           <LockClosedIcon
//             // className="h-5 text-african-violet-400 "
//             aria-hidden="true"
//           />
//           Sign in
//         </div>
//       </button>
//     </div>
//   )}
// </div>


// {!isAuthenticated && (
//   <div className="login-button">
//     <button className="login-span" onClick={() => loginWithRedirect()}>
//       <div>
//         <LockClosedIcon
//           // className="h-5 text-african-violet-400 "
//           aria-hidden="true"
//         />
//         Sign in
//       </div>
//     </button>
//   </div>
// )}