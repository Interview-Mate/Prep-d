import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import * as ApiService from './Util/ApiService';

// type IMovie = {
//   original_title: string;
//   poster_path: string;
//   id: number;
// };

// type IMovieContext = [IMovie[], React.Dispatch<React.SetStateAction<IMovie[]>>];

// export const MovieContext = createContext<IMovieContext>([[], () => null]);

const Context = createContext<any>([[], () => null]);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuth0();
  const { isLoading }: { isLoading: boolean } = useAuth0();
  const { user }: { user?: UserData } = useAuth0();
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
    surname: '',
    level: '',
    image: '',
    id: '',
  });
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated && authenticated !== true) setAuthenticated(true);
  // }, [isAuthenticated]);

  // Checks if user exists in database
  const handleGetUser = async () => {
    if (user) {
      console.log(user);
      // setAuthenticated(true);
      const email = user?.email;
      const receivedUser = await ApiService.getUser(email);

      if (receivedUser) {
        setCurrentUser({
          ...currentUser,
          email: receivedUser[0].email,
          name: receivedUser[0].name,
          surname: receivedUser[0].surname,
          level: receivedUser[0].level,
          image: receivedUser[0].image ? receivedUser[0].image : user?.picture,
          id: receivedUser[0]._id,
        });
      }
    }
  };

  // Creates user in database
  const handleCreateUser = async (newUser: User) => {
    const receivedUser = await ApiService.createUser({
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      level: newUser.level,
      image: user?.picture,
    });

    if (receivedUser) {
      setCurrentUser({
        ...currentUser,
        email: receivedUser.email,
        name: receivedUser.name,
        surname: receivedUser.surname,
        level: receivedUser.level,
        image: receivedUser.image,
        id: receivedUser._id,
      });
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    console.log(updatedUser)
    const receivedUser = await ApiService.updateUser({
      id: currentUser.id,
      email: updatedUser.email === '' ? currentUser.email : updatedUser.email,
      name: updatedUser.name === '' ? currentUser.name : updatedUser.name,
      surname: updatedUser.surname === '' ? currentUser.surname : updatedUser.surname,
      level: updatedUser.level !== currentUser.level ? updatedUser.level : currentUser.level,
      image: updatedUser.image === '' || undefined ? currentUser.image : updatedUser.image,
    });
    
    
    if (receivedUser) {
      setCurrentUser({
        ...currentUser,
        email: receivedUser.email,
        name: receivedUser.name,
        surname: receivedUser.surname,
        level: receivedUser.level,
        image: receivedUser.image,
        id: receivedUser._id,
      });
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        currentUser,
        isAuthenticated,
        setCurrentUser,
        handleGetUser,
        handleCreateUser,
        handleUpdateUser,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
