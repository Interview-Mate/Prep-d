import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as ApiService from "./Util/ApiService";

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
    email: "",
    name: "",
    surname: "",
    level: "",
    id: "",
  });
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated && authenticated !== true) setAuthenticated(true);
  // }, [isAuthenticated]);

  // Checks if user exists in database
  const handleGetUser = async () => {
    if (user) {
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
    });

    if (receivedUser) {
      setCurrentUser({
        ...currentUser,
        email: receivedUser.email,
        name: receivedUser.name,
        surname: receivedUser.surname,
        level: receivedUser.level,
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
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
