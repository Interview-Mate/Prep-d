import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useContext } from 'react';
import { Context } from '../Context';
import Login3D from './Login3D';
import Button from '../Components/Button';

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  const { isAuthenticated, handleGetUser } = useContext(Context) as any;

  useEffect(() => {
    if (isAuthenticated) {
      handleGetUser();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className='flex z-0 login-container overflow-hidden justify-end'>
        <div className='w-full h-full z-10 flex justify-center items-center'>
          <Login3D />
          {!isAuthenticated && (
            <div className='mr-20 flex flex-col justify-center items-center h-full rounded-lg w-1/4'>
              <div className='py-10  px-10 rounded-lg z-50 bg-white'>
                <div className='pb-10 mt-6 text-center text-eerie-black'>
                  <p className='mb-6'>
                    Are you ready to crush your next interview and show HR who's
                    the boss?
                  </p>
                  <h2 className='text-center text-xl font-bold'>
                    Let's get you Prep'd!
                  </h2>
                </div>
                <div className='flex items-center justify-center'>
                  <div onClick={() => loginWithRedirect()}>
                    <Button>Log in/Sign up</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
