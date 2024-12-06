import React, { createContext, useEffect, useReducer, useContext } from "react";

// Initial state
const initialState = {
  user: null,
  clientData: null,
  therapists: [],
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
      return { ...state, clientData: action.payload, loading: false };
    case "SET_THERAPISTS":
      return { ...state, therapists: action.payload, loading: false };
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

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setLoading = () => dispatch({ type: "SET_LOADING" });
  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });

  // Helper function to handle API requests
  const fetchAPI = async (url, options = {}) => {
    try {
      const res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken") || ""}`,
          ...options.headers, // Merge any additional headers
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Error response from ${url}: ${res.status} - ${errorText}`);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await res.json();
      } else {
        console.warn(`Expected JSON but got ${contentType} from ${url}`);
        return null; // Gracefully handle non-JSON responses
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  };

  const fetchUser = async () => {
    const clientId = sessionStorage.getItem("clientId");
    if (!clientId) {
      setError("Client ID not found");
      return;
    }
    setLoading();
    try {
      const user = await fetchAPI(`/clients/${clientId}`);
      dispatch({ type: "SET_USER", payload: user });
    } catch (error) {
      setError("Error fetching user");
    }
  };

  const fetchUserJournal = async () => {
    const clientId = sessionStorage.getItem("clientId");
    if (!clientId) {
      setError("Client ID not found");
      return;
    }
    setLoading();
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
            const text = await res.text(); // Read response as plain text
            const journalData = text ? JSON.parse(text) : {}; // Parse JSON only if the response is not empty
            console.log("Fetched journal data:", journalData);
            setClientData(journalData);
            return journalData;

      } else {
        setError("Failed to fetch journal data");
       console.error("Failed to fetch journal data. Status:", res.status);
       setClientData(null);
    return {}; 
        
      }

      const journalData = await fetchAPI(`/clients/${clientId}/getJournal`);
      dispatch({ type: "SET_CLIENT_DATA", payload: journalData });

    } catch (error) {
      setError("Error fetching journal data");
    }
  };

  const fetchTherapists = async () => {
    setLoading();
    try {
      const therapists = await fetchAPI(`/therapists/getAllTherapists`);
      dispatch({ type: "SET_THERAPISTS", payload: therapists });
    } catch (error) {
      setError("Error fetching therapists");
    }
  };

  const fetchUsername = async () => {
    const userId = sessionStorage.getItem("clientId");
    if (!userId) {
      setError("User ID not found");
      return;
    }
    setLoading();
    try {
      let user = await fetchAPI(`/clients/${userId}`);
      if (!user) user = await fetchAPI(`/therapists/${userId}`);
      dispatch({ type: "SET_USERNAME", payload: user?.name });
    } catch (error) {
      setError("Error fetching username");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("clientId");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    fetchUser();
    fetchUserJournal();
    fetchTherapists();
    fetchUsername();
  }, []);

  return (
      <GlobalContext.Provider
          value={{
            ...state,
            fetchUser,
            fetchUserJournal,
            fetchTherapists,
            fetchUsername,
            logout,
          }}
      >
        {children}
      </GlobalContext.Provider>
  );
};

// Custom hook for using the context
export const useGlobal = () => useContext(GlobalContext);
