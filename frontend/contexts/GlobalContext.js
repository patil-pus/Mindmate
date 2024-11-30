// contexts/GlobalContext.js
import React, { createContext, useEffect, useReducer, useContext } from "react";

// Initial state
const initialState = {
  user: null,
  clientData: null,
  therapists: null,
  loading: false,
  error: null,
  username: null,
};

// Reducer function
const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_CLIENT_DATA":
      return {
        ...state,
        clientData: action.payload,
        loading: false,
        error: null,
      };
    case "SET_THERAPISTS":
      return {
        ...state,
        therapists: action.payload,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setUsername = (username) => {
    dispatch({ type: "SET_USERNAME", payload: username });
  };

  const setClientData = (clientData) => {
    dispatch({ type: "SET_CLIENT_DATA", payload: clientData });
  };

  const setTherapists = (therapists) => {
    dispatch({ type: "SET_THERAPISTS", payload: therapists });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const setError = (error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const fetchUser = async () => {
    const clientId = sessionStorage.getItem("clientId");
    if (!clientId) {
      console.error("No clientId found in sessionStorage");
      setError("No clientId found in sessionStorage");
      setLoading(false);
      return null;
    }

    // Fetch user data
    try {
      setLoading();
      const res = await fetch(`http://localhost:8080/api/clients/${clientId}`, {
        method: "GET",
        credentials: "include",
      });

      console.log("res", res);
      if (res.ok) {
        const user = await res.json();

        setUser(user);
        return user; // Return the user object for further actions
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      setError("Error fetching user");
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Fetch journal data for the current user
  const fetchUserJournal = async (clientId) => {
    console.log("Fetching journal data for clientId:", clientId);
    try {
      setLoading();
      const res = await fetch(
        `http://localhost:8080/api/clients/${clientId}/getJournal`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        const journalData = await res;
        console.log("Fetched journal data:", journalData);
        setClientData(journalData);
        return journalData;
      } else {
        setError("Failed to fetch journal data");
        console.error("Failed to fetch journal data");
        setClientData(null);
      }
    } catch (error) {
      setError("Error fetching journal data");
      console.error("Error fetching journal data:", error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Fetch all therapists
  const fetchTherapists = async () => {
    try {
      setLoading();
      const res = await fetch(
        `http://localhost:8080/api/therapists/getAllTherapists`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        const therapists = await res.json();
        console.log("Fetched therapsists data:", therapists);
        setTherapists(therapists);
        return therapists; // Return therapists if needed
      } else {
        setError("Failed to fetch therapists");
        console.error("Failed to fetch therapists");
        setTherapists(null);
      }
    } catch (error) {
      setError("Error fetching therapists");
      console.error("Error fetching therapists:", error);
    } finally {
      setLoading(false);
    }
    return null;
  };
  const fetchUsername = async () => {
    const userId = sessionStorage.getItem("clientId");
    try {
      let response = await fetch(
        `http://localhost:8080/api/clients/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        response = await fetch(
          `http://localhost:8080/api/therapists/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
      }

      if (response.ok) {
        const resData = await response.json();
        console.log("response data", resData);
        const { name } = resData;
        console.log("client name",name, response );

        setUsername(name);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  useEffect(() => {
    const clientId = sessionStorage.getItem("clientId");
    if (clientId) {
      fetchUserJournal(clientId);
    }
    fetchUsername();
    fetchTherapists();
  }, [state.user]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setUser,
        setClientData,
        setTherapists,
        setLoading,
        setError,
        logout,
        fetchUser,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//custom hook for using the context
export const useGlobal = () => useContext(GlobalContext);
