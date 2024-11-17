import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
// import UserContext from "../contexts/UserContext";
import { useGlobal } from "../contexts/GlobalContext";
import { AppBar, Toolbar, Box, Typography, Button, TextField, IconButton, Badge, Card, CardContent, Avatar } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion } from 'framer-motion';
import CardMedia from '@mui/material/CardMedia';
import ExpertSection from "./ExpertSection";
import FeatureCard from "./FeatureCard";
import DoctorCard from "./DoctorCard";


const inhaleAnimation = keyframes`
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
`;

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

const LoadingScreen = styled(Box)({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2a2f55",
    zIndex: 10,
    animation: `${inhaleAnimation} 2s ease-in-out infinite`,
});

const HeaderText = styled(Typography)({
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: "20px",
    '@media (min-width:600px)': {
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
    zIndex: 10,
    '@media (max-width:600px)': {
        width: "90%", // Full width on small screens
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
  const { user, clientData, loading, error } = useGlobal();
  // const { user } = useContext(UserContext);
  const [dashboard, setDashboard] = useState(null);
   const [isLoading, setIsLoading] = useState(true); 
  const [query, setQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
    if (!loading && !user) {
      router.push("/SignIn");
    }
  }, [loading, user, router]);

  // useEffect(() => {

    //   const clientId = sessionStorage.getItem('clientId');
    //   console.log("client id",clientId);
    //    if (!clientId) {
    //   //router.push('/SignIn');
    //   console.log("invalid client id"); 
    //   return;
    // }

  //   const fetchDashboard = async() => {
    
  //     try{
  //     const res = await fetch(`http://localhost:8080/api/clients/${user}/getJournal`, {
  //       method: 'GET',
  //       credentials: 'include'
  //     });

  //     if(res.ok){
  //       const data = await res.json();
  //       setDashboard(data);
  //       console.log("dahsboard data - ",data);
  //   }else{
  //     console.error('Failed to fetch dashboard data');
  //   }
  //         //router.push('/SignIn');
  //   }
  //   catch(error){
  //     console.error('Error fetching dashboard data:', error);
  //   }
  // };
  // fetchDashboard();
  // },[router]);
    // const { user } = useContext(UserContext);
    // console.log("Current user in Dashboard component:", user); // Debug log

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setShowNotification(true);
        const hideNotification = setTimeout(() => setShowNotification(false), 5000);
        return () => clearTimeout(hideNotification);
    }, [isLoading]);

    console.log("clinet data",clientData);

    if (isLoading) {
        return (
            <LoadingScreen>
                <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    Welcome to MindMate
                </Typography>
            </LoadingScreen>
        );
    }

    return (
        <Box sx={{ position: "relative", height: "100vh", overflow: "auto" , paddingBottom: "40px", backgroundColor: "#FFFFFF" }}>
                     
        
            {/* Header */}
            <AppBar position="fixed" sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                <Toolbar>
                     <motion.img
                        src={'/logo.png'}
                        alt="MindMate Logo"
                        style={{
                        width: 90,
                        height: 80,
                        marginBottom: 20,
                        marginTop: 20,
                        margin:20,
                        borderRadius: '50%',
                        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
                        padding: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }}
                    />
                    <Typography variant="h4" sx={{ flexGrow: 9 }}>
                        MindMate
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Chat</Button>
                    <Button color="inherit">Profile</Button>
                    <Button color="inherit">Settings</Button>
                    <IconButton color="inherit">
                        <Badge color="secondary" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Notifications */}
            {showNotification && (
                <NotificationContainer>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>New Notification</Typography>
                    <Typography variant="body2">You have a new message from your doctor.</Typography>
                </NotificationContainer>
            )}

       
            {/* Content */}
            <ContentContainer>
                <HeaderText>Your Home for Health</HeaderText>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              
              <ScrollContainer>
              <FeatureCard
                  icon="E"
                  title="Do-anywhere exercises"
                  description="Reach your mental health goals with proven courses and expert-led guidance."
                  image="/exer.jpeg"
                  buttonText="Learn More"
              />
              <FeatureCard
                icon="C"
                title="Always-there Support"
                description="Unpack what’s on your mind with Ebb, our empathetic AI companion, talk it out!"
                image="/chat.jpg"
                buttonText="Chat with Ebb"
            />
              <FeatureCard
                  icon="J"
                  title="Journal Your Thoughts"
                  description="Reflect on your day, your feelings, and keep a private journal that helps you understand yourself better."
                  image="/journal.jpg"
                  buttonText="Start Writing"
              />
              <FeatureCard
                  icon="M"
                  title="Meet your Therapist!"
                  description="Find peace and clarity with personalized, in-person therapy — guided by experts, designed for you."
                  image="/inperson.webp"
                  buttonText="Learn More"
              />
            </ScrollContainer>

 
            
            <MessageBox>
                <Typography variant="h5" color="textPrimary" sx={{mt:2, textAlign: "center" }}>
                    Find the Support you need
                </Typography>
            </MessageBox>
                         <Box sx={{ position: "relative", height: "100vh", overflow: "auto", paddingBottom: "40px", backgroundColor: "#FFFFFF" }}>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div>
                  <h1>Welcome, {user || "Guest"}!</h1>
                  <p>Client Data:</p>

                  {/* Render client data here */}
                  {clientData && clientData.length > 0 ? (
                    clientData.map((entry, index) => (
                      <Box 
                        key={index} 
                        sx={{
                          padding: "20px",
                          borderRadius: "12px",
                          backgroundColor: "#f0f4ff",
                          border: "1px solid #e0e0e0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          color: "black",
                          margin: "20px 0",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          maxWidth: "400px",
                          mx: "auto"
                        }}
                      >
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#3f51b5", mb: 1 }}>
                Welcome Back {entry.client.name}! Let's Reflect on Your Day...
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "#7b7b7b", mb: 2 }}>
                  Last Entry: {new Date(entry.entryDate).toLocaleDateString()}
                </Typography>

                <Box 
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "green",
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    mb: 2,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  <Typography variant="h4" sx={{ color: "red" }}>
                    {entry.mood}
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                  Age: <strong>{entry.client.age}</strong> | Sex: <strong>{entry.client.sex}</strong>
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", mb: 2 }}>
                  <strong>Content:</strong> {entry.content}
                </Typography>
              </Box>
                        ))
                      ) : (
                        <Typography variant="body1">No client data available.</Typography>
                      )}
                    </div>

                    {/* Other UI elements... */}
                  </Box>

            {/* Wrapper for Search Bar with Relative Positioning */}
            <Box sx={{ position: "relative", width: "100%", maxWidth: "600px", mt: 2 }}>
                
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
                    </Box>      
                <div>
                        <ExpertSection />
                </div>
        <DoctorCard/>
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
                    zIndex: 1,
                }}
            >
                <Typography variant="body2">© 2023 MindMate. All Rights Reserved.</Typography>
            </Box>
        </Box>
    );
}

export default Dashboard;


