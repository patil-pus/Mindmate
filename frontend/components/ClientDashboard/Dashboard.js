import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useGlobal } from "../../contexts/GlobalContext";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpertSection from "./ExpertSection";
import FeatureCard from "./FeatureCard";
import DoctorCard from "./DoctorCard";
import Header from "../Header/Header";

const ScrollContainer = styled(Box)({
  display: "flex",
  gap: "20px",
  padding: "20px",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const ContentContainer = styled(Box)({
  position: "relative",
  zIndex: 1,
  color: "#FFFFFF",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "120px 20px 40px",
  minHeight: "100vh",
});

const HeaderText = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "black",
  textAlign: "center",
  marginTop: "20px",
  "@media (min-width:600px)": {
    fontSize: "2.5rem",
  },
});

const NotificationContainer = styled(Box)({
  position: "fixed",
  right: "20px",
  top: "80px",
  width: "250px",
  backgroundColor: "#FFFFFF",
  color: "#333",
  borderRadius: "8px",
  padding: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 10000,
  "@media (max-width:600px)": {
    width: "90%", 
    right: "5%",
    top: "60px",
  },
});

const MessageBox = styled(Box)({
  textAlign: "center",
  width: "100%",
  marginBottom: "20px",
});

const Dashboard = () => {
  const router = useRouter();
  const isInitialLoad = useRef(true);
  const { user, clientData, therapists, loading, error } = useGlobal();
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [loadSpinner, setLoadSpinner] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      setFilteredTherapists([]);
      console.log("Query is empty, no therapists returned.");
      return;
    }
    if (!therapists || therapists.length === 0) return;

    setLoadSpinner(true);

    setTimeout(() => {
      const results = therapists.filter(
        (therapist) =>
          therapist.name.toLowerCase().includes(query.toLowerCase()) ||
          therapist.specialization
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          therapist.language.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTherapists(results);
      setLoadSpinner(false);
      console.log("filtered therapists", results);
    }, 1000);
  }
  useEffect(() => {
    if (!isInitialLoad.current) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setdashboardUser(JSON.parse(storedUser));
        console.log("User set from sessionStorage after navigation.");
      } else {
        console.log("No user found in sessionStorage. Redirecting to SignIn.");
        router.push("/SignIn");
      }
    }
  }, [router]);
  
    useEffect(() => {
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        return;
      }
      if (!loading && !user) {
        console.log("No user found. Redirecting to SignIn.");
        router.push("/SignIn");
      }
    }, [loading, user, router]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setShowNotification(true);
    const hideNotification = setTimeout(() => setShowNotification(false), 5000);
    return () => clearTimeout(hideNotification);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex w-screen flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-teal-400 text-white">
      <h1 className="text-8xl font-bold font-sans mb-4 animate-fade-in">MindMate</h1>
      
      <div className="flex items-center justify-center">
        {/* Animated Dots */}
        <div className="dot bg-white w-4 h-4 rounded-full mx-1 animate-bounce delay-0"></div>
        <div className="dot bg-white w-4 h-4 rounded-full mx-1 animate-bounce delay-150"></div>
        <div className="dot bg-white w-4 h-4 rounded-full mx-1 animate-bounce delay-300"></div>
      </div>
      <footer className="absolute bottom-4 text-sm opacity-75">
        &copy; 2024 MindMate. All rights reserved.
      </footer>
    </div>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "auto",
        paddingBottom: "40px",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Header */}
      <Header />
      {/* Notifications */}
      {showNotification && (
        <NotificationContainer>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            New Notification
          </Typography>
          <Typography variant="body2">
            You have a new message from your doctor.
          </Typography>
        </NotificationContainer>
      )}
      {/* Content */}
      <Box
        sx={{
          position: "absolute", // Use absolute positioning
          right: "-5.2%", // Position the box on the right side
          width: "800px", // Set a width for the box
          //height: "30vh",        // Set height
          //top: "59%",             // Position the box at the center of the screen
          //padding: "20px",       // Add inner padding for content
          backgroundColor: "#FFFFFF", // White background
          borderRadius: "20px", // Rounded corners for better visuals
          zIndex: "3",
          // margin:'10px'
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Other UI elements... */}
      </Box>
      <ContentContainer>
        <HeaderText>Your Home for Health</HeaderText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ScrollContainer>
            <FeatureCard
              icon="E"
              title="Do-anywhere exercises"
              description="Reach your mental health goals with proven courses and expert-led guidance."
              image="/exer.jpeg"
              buttonText={
                <Link
                  href="/MentalHealthExercises"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Learn More
                </Link>
              }
            />
            <FeatureCard
              icon="C"
              title="Always-there Support"
              description="Unpack what’s on your mind with Ebb, our empathetic AI companion, talk it out!"
              image="/chat.jpg"
              buttonText={<Link
                href="/ComingSoon"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Chat with Ebb
              </Link>}
            />
            <FeatureCard
              icon="J"
              title="Journal Your Thoughts"
              description="Reflect on your day, your feelings, and keep a private journal that helps you understand yourself better."
              image="/journal.jpg"
              buttonText={
                <Link
                  href="/Journal"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Start Journaling
                </Link>
              }
            />
            <FeatureCard
              icon="M"
              title="Meet your Therapist!"
              description="Find peace and clarity with personalized, in-person therapy — guided by experts, designed for you."
              image="/inperson.webp"
              buttonText={
                <Link
                  href="/InPersonSession"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Schedule Session
                </Link>
              }
            />
          </ScrollContainer>

          <MessageBox>
            <Typography
              variant="h5"
              color="textPrimary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Find the Support you need
            </Typography>
          </MessageBox>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              mt: 2,
            }}
          >
            {/* Main Search Field */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search doctors, clinics, therapists..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                color: "#333",
                "& .MuiInputBase-root": {
                  color: "#333",
                },
              }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              ml: 3,
              marginTop: 2,
              backgroundColor: "#007BFF",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Search
          </Button>
        </Box>
        {/* Loading State */}
        {loadSpinner && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        )}
        {query && filteredTherapists.length === 0 && (
          <Typography sx={{ mt: 2 }}>
            No therapists found matching your query.
          </Typography>
        )}
        {/* Display Results */}
        {filteredTherapists.length > 0 && (
          <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
            {filteredTherapists.map((therapist) => (
              <FeatureCard
                key={therapist.id}
                icon="D"
                title={therapist.name}
                description={`Specialization: ${therapist.specialization} - Language: ${therapist.language}`}
                image={therapist.imageUrl || "/R.png"}
                buttonText="Learn More"
              />
            ))}
          </Box>
        )}
        <div>
          <ExpertSection />
        </div>
        <DoctorCard />
      </ContentContainer>

      {/* Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#FFFFFF",
          zIndex: 4,
        }}
      >
        <Typography variant="body2">
          © 2024 MindMate. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
