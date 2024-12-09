import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
} from "@mui/material";
import { styled } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useGlobal } from "../../contexts/GlobalContext";
import { useRouter } from "next/router";
import Header from "../Header/Header";
const useAnimatedNumber = (targetValue) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // Total animation duration
    const stepTime = Math.abs(Math.floor(duration / targetValue)); // Step time
    const timer = setInterval(() => {
      start += 1;
      if (start >= targetValue) {
        clearInterval(timer);
        start = targetValue;
      }
      setValue(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [targetValue]);

  return value;
};

const MainContent = styled(Box)({
  flex: 1,
  padding: "20px",
  width: "100%",
  backgroundColor: "#FFFFFF",
});

const StyledCard = styled(Paper)({
  backgroundColor: "#FFFFFF",
  color: "#333333",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
});

const StatBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "linear-gradient(135deg, #2196F3, #42A5F5)", // Blue gradient
  borderRadius: "12px",
  padding: "20px",
  color: "#FFFFFF",
  height: "150px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
});

const TherapistDashboard = () => {
  const router = useRouter();
  const { user, error, fetchUser } = useGlobal();
  const [userType, setUserType] = useState(null);
  const patients = useAnimatedNumber(1032); // Animated number for Patients Today
  const consultations = useAnimatedNumber(207); // Animated number for Consultations Completed

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserType = sessionStorage.getItem("userType");
      setUserType(storedUserType);
    }
  }, []);

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
     <Header/>
      {user ? (
        <MainContent sx={{ mt: 15 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledCard>
                <Typography variant="h3" fontWeight="bold" textAlign="center" >
                  Welcome, Dr. {user.name || "Therapist"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color="textSecondary"
                  mt={1}
                >
                  Have a productive day!
                </Typography>
              </StyledCard>
            </Grid>

            {/* Stats */}
            <Grid item xs={12} md={6}>
              <StatBox>
                <Typography variant="h3" fontWeight="bold">
                  {patients}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Patients Today
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <StatBox>
                <Typography variant="h3" fontWeight="bold">
                  {consultations}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Consultations Completed
                </Typography>
              </StatBox>
            </Grid>

            {/* Profile Card */}
            <Grid item xs={12}>
              <StyledCard>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3} textAlign="center">
                    <Avatar
                      sx={{
                        width: 300,
                        height: 300,
                        margin: "auto",
                        bgcolor: "#3A3A3A",
                      }}
                      src={user.imageUrl}
                    >
                      {user.name?.charAt(0).toUpperCase() || "D"}
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="h3" fontWeight="bold">
                      Dr. {user.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {user.specialization || "Specialist"}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      “Helping patients achieve mental clarity.”
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      href="/TherapistProfile"
                    >
                      View Profile
                    </Button>
                  </Grid>
                </Grid>
              </StyledCard>
            </Grid>
          </Grid>
        </MainContent>
      ) : (
        <Box sx={{ textAlign: "center", padding: "20px", mt: 10 }}>
          <Typography variant="h6">Loading therapist data...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TherapistDashboard;
