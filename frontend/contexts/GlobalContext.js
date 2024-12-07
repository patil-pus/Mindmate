import React, { createContext, useEffect, useReducer, useContext } from "react";

// Initial state
const initialState = {
  user: null,
  userType: null,
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
    case "SET_USER_TYPE":
      return { ...state, userType: action.payload };
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

  const setUser = (user) => dispatch({ type: "SET_USER", payload: user });
  const setUserType = (userType) => dispatch({ type: "SET_USER_TYPE", payload: userType });
  const setUsername = (username) => dispatch({ type: "SET_USERNAME", payload: username });
  const setClientData = (clientData) => dispatch({ type: "SET_CLIENT_DATA", payload: clientData });
  const setTherapists = (therapists) => dispatch({ type: "SET_THERAPISTS", payload: therapists });
  const setLoading = () => dispatch({ type: "SET_LOADING" });
  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });

  const logout = () => {
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("therapistId");
    dispatch({ type: "LOGOUT" });
  };

  const fetchUserJournal = async () => {
    const clientId = sessionStorage.getItem("clientId");
    console.log("Fetching journal for clientId:", clientId);

    if (!clientId) {
      setError("No clientId found in sessionStorage");
      return null;
    }

    try {
      setLoading();
      const res = await fetch(`http://localhost:8080/api/clients/${clientId}/getJournal`, {
        method: "GET",
        credentials: "include",
      });

      console.log("Journal fetch response status:", res.status);
      console.log("Journal fetch response content-type:", res.headers.get('content-type'));

      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          // Parse as JSON
          const journalData = await res.json();
          console.log("Fetched journal data:", journalData);
          if (journalData) {
            setClientData(journalData);
            return journalData;
          } else {
            // If journalData is null or empty
            console.warn("No journal entries returned, setting empty array");
            setClientData([]);
            return [];
          }
        } else {
          // Non-JSON or empty response handling
          const text = await res.text();
          console.warn("Non-JSON or empty response for journal data:", text);
          // Assume no journal data if empty
          setClientData([]);
          return [];
        }
      } else {
        const errorText = await res.text();
        console.error("Failed to fetch journal data:", errorText);
       // throw new Error("Failed to fetch journal data");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching journal data:", error);
      return null;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Other fetch functions (fetchUser, fetchUsername, fetchTherapists) would remain as before
  // Make sure to add similar checks for them if you expect non-JSON or empty responses.

  const fetchUser = async () => {
    const clientId = sessionStorage.getItem("clientId");
    const therapistId = sessionStorage.getItem("therapistId");
    console.log("Fetching user. clientId:", clientId, "therapistId:", therapistId);

    if (!clientId && !therapistId) {
      console.log("No clientId or therapistId, not fetching user.");
      return null;
    }

    try {
      setLoading();
      if (clientId) {
        const res = await fetch(`http://localhost:8080/api/clients/${clientId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to fetch client user data:", errorText);
          setError("Failed to fetch client user data");
          return null;
        }

        const user = await res.json();
        console.log("Fetched client user data:", user);
        if (user && user.id) {
          setUser(user);
          setUserType("client");
          return user;
        } else {
          setError("Received invalid or null user data");
        }
      }
      return null;
    } catch (error) {
      setError("Error fetching user");
      console.error("Error fetching user:", error);
      return null;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchTherapists = async () => {
    try {
      setLoading();
      console.log("Fetching therapists...");
      const res = await fetch("http://localhost:8080/api/therapists/getAllTherapists", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch therapists:", errorText);
        setError("Failed to fetch therapists");
        setTherapists(null);
        return null;
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.warn("Therapists response is not JSON:", text);
        setError("Therapists data is not in expected JSON format");
        setTherapists([]);
        return [];
      }

      const therapists = await res.json();
      console.log("Fetched therapists data:", therapists);
      if (!therapists || !Array.isArray(therapists)) {
        setError("Therapists data is not in expected format");
        setTherapists([]);
        return [];
      }

      setTherapists(therapists);

      const therapistId = sessionStorage.getItem("therapistId");
      console.log("therapistId from session:", therapistId);
      if (therapistId) {
        const loggedInTherapist = therapists.find(
            (t) => t.id === parseInt(therapistId, 10)
        );
        if (loggedInTherapist) {
          setUser(loggedInTherapist);
          setUserType("therapist");
        } else {
          console.warn("No matching therapist found for therapistId:", therapistId);
        }
      }
      return therapists;
    } catch (error) {
      console.error("Error fetching therapists:", error);
      setError("Error fetching therapists");
      return null;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchUsername = async () => {
    const clientId = sessionStorage.getItem("clientId");
    const therapistId = sessionStorage.getItem("therapistId");
    console.log("Fetching username. clientId:", clientId, "therapistId:", therapistId);

    try {
      let url = null;
      if (clientId) {
        url = `http://localhost:8080/api/clients/${clientId}`;
      } else if (therapistId) {
        url = `http://localhost:8080/api/therapists/${therapistId}`;
      }

      if (!url) {
        console.warn("No clientId or therapistId found for fetchUsername.");
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch username:", errorText);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.warn("Username response not JSON:", text);
        return;
      }

      const resData = await response.json();
      console.log("Fetched username data:", resData);
      if (resData && resData.name) {
        setUsername(resData.name);
      } else {
        console.warn("No name field in response data");
        setUsername(null);
      }
    } catch (error) {
      setError("Error fetching username");
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    const clientId = sessionStorage.getItem("clientId");
    const therapistId = sessionStorage.getItem("therapistId");
    console.log("useEffect startup: clientId:", clientId, "therapistId:", therapistId);

    if (clientId || therapistId) {
      fetchUser()
          .then((user) => {
            if (user || therapistId) return fetchUsername();
          })
          .then(() => fetchTherapists())
          .then((therapists) => {
            if (clientId) return fetchUserJournal();
          })
          .catch((error) => {
            console.error("Error in chained data fetch:", error);
          });
    } else {
      console.log("No clientId or therapistId in session. Not fetching data.");
    }
  }, []);

  return (
      <GlobalContext.Provider
          value={{
            ...state,
            setUser,
            setUserType,
            setUsername,
            setClientData,
            setTherapists,
            setLoading,
            setError,
            logout,
            fetchUser,
            fetchUserJournal,
            fetchTherapists,
          }}
      >
        {children}
      </GlobalContext.Provider>
  );
};

// Custom hook for using the context
export const useGlobal = () => useContext(GlobalContext);