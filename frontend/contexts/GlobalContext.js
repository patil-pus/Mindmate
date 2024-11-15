// contexts/GlobalContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  user: null,
  clientData: null,
  loading: false,
  error: null,
};

// Reducer function
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CLIENT_DATA':
      return { ...state, clientData: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

// Create context
const GlobalContext = createContext();

// Context provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setClientData = (clientData) => {
    dispatch({ type: 'SET_CLIENT_DATA', payload: clientData });
  };

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <GlobalContext.Provider value={{ state, setUser, setClientData, setLoading, setError, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

// custom hook for using the context
export const useGlobal = () => useContext(GlobalContext);
