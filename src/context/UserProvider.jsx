import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { decode } from "jsonwebtoken";
import AgilityApi from "../AgilityApi";
import UseLocalStorage from "../hooks/UseLocalStorage";
import Spinner from "react-bootstrap/Spinner";

const UserProvider = ({ children }) => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = UseLocalStorage(
    process.env.REACT_APP_TOKEN_STORAGE_ID
  );

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let loggedInUser = await AgilityApi.getCurrentUser(username);
        setCurrentUser(loggedInUser);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (!infoLoaded) {
    return <Spinner variant='success' animation='border' size={150} />;
  }
  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, handleLogOut, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;