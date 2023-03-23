import { useContext } from 'react';
import { Context } from '../Context';
import Navbar from '../Components/Navbar';

export default function Settings() {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  return (
    <>
      <div className='h-screen w-screen bg-seasalt'>
        <Navbar />
        Here you'll find user info, such as email and password
      </div>
    </>
  );
}
