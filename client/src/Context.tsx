import React, { createContext, useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as ApiService from "./Util/ApiService";

interface UserData<A = AppMetadata, U = UserMetadata> {
  email?: string | undefined;
  username?: string | undefined;
  email_verified?: boolean | undefined;
  verify_email?: boolean | undefined;
  user_id?: string | undefined;
  blocked?: boolean | undefined;
  nickname?: string | undefined;
  picture?: string | undefined;
  password?: string | undefined;
  phone_number?: string | undefined;
  phone_verified?: boolean | undefined;
  given_name?: string | undefined;
  family_name?: string | undefined;
  name?: string | undefined;
  user_metadata?: U | undefined;
  app_metadata?: A | undefined;
}

const Context = createContext();

const ContextProvider = ({ children }) => {
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
  const handleCreateUser = async (event) => {
    event.preventDefault();

    const receivedUser = await ApiService.createUser({
      email: user.email,
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
