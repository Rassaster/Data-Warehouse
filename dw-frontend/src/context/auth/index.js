import React, { createContext, useState } from 'react';

const INITIAL_AUTH_STATE = {
  isLoggedIn: false,
  token: "",
  isAdmin: "",
}

const UserAuthContext = createContext(INITIAL_AUTH_STATE)

function UserAuth_ContextProvider ({ children }) {
  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE)

  return (
    <UserAuthContext.Provider value={{authState, setAuthState}}>
      {children}
    </UserAuthContext.Provider>
  )
}

export { UserAuth_ContextProvider };
export default UserAuthContext;