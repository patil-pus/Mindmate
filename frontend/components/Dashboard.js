import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
// import UserContext from "../contexts/UserContext";
import { useGlobal } from "../contexts/GlobalContext";
import { AppBar, Toolbar, Box,CircularProgress, Typography, Button, TextField, IconButton, Badge, Card, CardContent, Avatar, Link } from "@mui/material";
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
  const { user, clientData, therapists,loading , error } = useGlobal();
  // const { user } = useContext(UserContext);
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
    const results = therapists.filter((therapist) =>
      therapist.name.toLowerCase().includes(query.toLowerCase()) ||
      therapist.specialization.toLowerCase().includes(query.toLowerCase()) ||
      therapist.language.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTherapists(results);
    setLoadSpinner(false); 
    console.log("filtered therapists",results);
  },1000);
    }

    useEffect(() => {
    if (!loading && !user) {
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

    console.log("clinet data",clientData);
    console.log("therapists",therapists);

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
                    <Button color="inherit" href="/Chat">Chat</Button>
                    <Button href="/PatientProfile" color="inherit">Profile</Button>
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
            <Box  sx={{ 
                        position: "absolute",  // Use absolute positioning
                        right: "-5.2%",            // Position the box on the right side
                        width: "800px",          // Set a width for the box
                        //height: "30vh",        // Set height
                        //top: "59%",             // Position the box at the center of the screen
                        //padding: "20px",       // Add inner padding for content
                        backgroundColor: "#FFFFFF", // White background
                        borderRadius: "20px",   // Rounded corners for better visuals
                        zIndex:'3',
                       // margin:'10px'
                    }}>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div>
                  <h1>Welcome, {user || "Guest"}!</h1>
                  <p>Client Data:</p>

                  {/* Render client data here */}
                  {clientData && clientData.length > 0 ? (
                  (() => {
                          const lastEntry = clientData[clientData.length - 1]; // Get the last entry
                          return (
                        <Box
                          key={lastEntry.id || "last-entry"}
                          sx={{
                          padding: "20px",
                          position: "absolute",
                          right: "32%",
                          top: "1570%",
                          borderRadius: "12px",
                          backgroundColor: "#f0f4ff",
                          border: "1px solid #e0e0e0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          color: "black",
                          margin: "20px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          maxWidth: "400px",
                          mx: "auto"
                        }}
                      >
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#3f51b5", mb: 1 }}>
                Welcome Back {lastEntry.client.name}! 
                <br></br>Let's Reflect on Your Day...
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "#7b7b7b", mb: 2 }}>
                  Last Entry: {new Date(lastEntry.entryDate).toLocaleDateString()}
                </Typography>

             <Box 
                sx={{
                    position: "relative", 
                    width: "150px", 
                    height: "150px", 
                    borderRadius: "50%", 
                    background: `conic-gradient(
                    #4CAF50 0% 40%, 
                    #FFC107 40% 70%, 
                    #F44336 70% 90%, 
                    #2196F3 90% 100%
                    )`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                }}
                >
                    {/* Inner Circle for total and label */}
                    <Box 
                      sx={{
                        position: "absolute",
                        width: "90px", 
                        height: "90px", 
                        borderRadius: "50%", 
                        backgroundColor: "#1E1E2F", 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
                      >
                        Mood
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ color: "white", fontSize: "12px" }}
                      >
                      </Typography>
                    </Box>

                  </Box>
                      <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "white", 
                        fontSize: "12px", 
                        mt: "auto", // Push it to the bottom using flexbox spacing
                        textAlign: "center" // Center-align the text
                      }}
                    >
                      <a      
                        href="/Journal" 
                        style={{
                          margin: "20px",
                          color: "#1976D2", 
                          textDecoration: "none", 
                          fontWeight: "bold",
                          cursor: "pointer"
                        }}
                      >
                        View Journal
                      </a>
                    </Typography>
                    </Box>
                          );
                        })()         
                      ) : (
                        <Typography variant="body1">No client data available.</Typography>
                      )}
                    </div>
                    {/* Other UI elements... */}
                  </Box>
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
                  buttonText={<Link href="/Journal" style={{ textDecoration: 'none', color: 'inherit' }}>Start Journaling</Link>}
                
              />
              <FeatureCard
                  icon="M"
                  title="Meet your Therapist!"
                  description="Find peace and clarity with personalized, in-person therapy — guided by experts, designed for you."
                  image="/inperson.webp"
                 buttonText={<Link href="/InpersonAppointment" style={{ textDecoration: 'none', color: 'inherit' }}>Schedule Session</Link>}
              />
            </ScrollContainer>   

         
            <MessageBox>
                <Typography variant="h5" color="textPrimary" sx={{mt:2, textAlign: "center" }}>
                    Find the Support you need
                </Typography>
            </MessageBox>
                         

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
                        <Button
                          variant="contained"
                          onClick={handleSearch}
                          sx={{
                            ml: 3,
                            marginTop : 2,
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
              { query && filteredTherapists.length === 0 && (
              <Typography sx={{ mt: 2 }}>No therapists found matching your query.</Typography>
            )}
                  {/* Display Results */}
            { filteredTherapists.length > 0 && (
              <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
                {filteredTherapists.map((therapist) => (
                  <FeatureCard
                    key={therapist.id}
                    icon="D"
                    title={therapist.name}
                    description={`Specialization: ${therapist.specialization} - Language: ${therapist.language}`}
                    image={therapist.imageUrl}
                    buttonText="Learn More"
                  />
                ))}
              </Box>
            )}
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
                    zIndex: 4,
                }}
            >
                <Typography variant="body2">© 2023 MindMate. All Rights Reserved.</Typography>
            </Box>
        </Box>
    );
}

export default Dashboard;


