import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState();

  const updateUser = (user) => {
    setUser(user);
  };
  const clearUser = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
