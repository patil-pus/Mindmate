// contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from sessionStorage after the component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem('clientId');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to update the user data and save it to sessionStorage
  const updateUser = (newUserData) => {
    setUser(newUserData);
    sessionStorage.setItem('clientId', newUserData); // Save to sessionStorage
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
