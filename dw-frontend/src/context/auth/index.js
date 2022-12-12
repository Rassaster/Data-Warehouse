import React, { createContext, useState, useEffect } from 'react';

const INITIAL_AUTH_STATE = {
  isLoggedIn: false,
  token: "",
  isAdmin: "",
}

const UserAuthContext = createContext(INITIAL_AUTH_STATE)

function UserAuth_ContextProvider ({ children }) {
  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE)

  /**
    @method useEffect
    @description Checks LocalStorage to determine if any active logged session is stored.
    */
  useEffect(() => {
    const localStorageAuthInfoString = localStorage.AuthInfo;
    if (localStorageAuthInfoString !== undefined) {
      const localStorageAuthInfoJSON = JSON.parse(localStorageAuthInfoString);
      if (localStorageAuthInfoJSON.isLoggedIn) setAuthState(localStorageAuthInfoJSON);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("AuthInfo", JSON.stringify(authState))
  }, [authState])

  return (
    <UserAuthContext.Provider value={{authState, setAuthState}}>
      {children}
    </UserAuthContext.Provider>
  )
}

export { UserAuth_ContextProvider };
export default UserAuthContext;