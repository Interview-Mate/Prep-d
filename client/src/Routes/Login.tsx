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
  <div className="flex z-0 login-container overflow-hidden justify-end">
    <div className="w-full h-full z-10 flex justify-center items-center">
      <Login3D />
      {!isAuthenticated && (
        <div className='flex flex-col justify-center items-center h-full rounded-lg w-1/4 bg-seasalt z-50'>
          <div className='px-8 rounded-lg drop-shadow-xl my-'>
          <div className='py-10 underline-offset-8 text-2xl font-bold mt-4 text-eerie-black text-center'>
            <p> Let's get Prep'd </p>
          </div>
          <div className='pb-20 mt-6 text-center text-eerie-black'>
            <p> Are you ready to crush your next interview and show those HR folks who's boss </p>       
          </div>
          <div className='flex justify-center hover:text-african-violet-400 w-full border-2 border-white bg-african-violet-900 rounded-lg drop-shadow-xl'> 
            <button className="font-bold py-2 px-4 rounded mt-4" onClick={() => loginWithRedirect()}>
              <div className="z-20">
                <LockClosedIcon
                  aria-hidden="true"
                />
                Sign in
              </div>
            </button>
          </div>
          </div>
        </div>
      )}

    </div>

  
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