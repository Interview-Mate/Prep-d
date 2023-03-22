import React, { createContext, useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    surname: "",
    level: "",
  });

  // Checks if user exists in database
  const handleGetUser = async () => {
    const receivedUser = await getUser({ user });

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

    const receivedUser = await createUser({
      // username: currentUser.username,
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
};
