import React, { createContext, useState } from "react";
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
  const { user }: { user?: UserData } = useAuth0();
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    surname: "",
    level: "",
  });

  // Checks if user exists in database
  const handleGetUser = async () => {
    const email = user?.email;
    const receivedUser = await ApiService.getUser(email);

    if (receivedUser) {
      setCurrentUser({
        ...currentUser,
        email: receivedUser.email,
        name: receivedUser.name,
        surname: receivedUser.surname,
        level: receivedUser.level,
      });
    }
  };

  // Creates user in database
  const handleCreateUser = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const receivedUser = await ApiService.createUser({
      email: user?.email,
      name: currentUser.name,
      surname: currentUser.surname,
      level: currentUser.level,
    });

    if (receivedUser) {
      setCurrentUser({
        ...currentUser,
        email: receivedUser.email,
        name: receivedUser.name,
        surname: receivedUser.surname,
        level: receivedUser.level,
      });
    }
  };
  return (
    <Context.Provider
      value={{
        currentUser,
        isAuthenticated,
        setCurrentUser,
        handleGetUser,
        handleCreateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
