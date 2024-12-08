import React, { useRef, useEffect, useState } from "react";
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


const fadeInOutAnimation = keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
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
  backgroundColor: "#1e2a45", // Slightly softer dark blue
  zIndex: 10,
  // animation: `${fadeInOutAnimation} 1.5s ease-in-out infinite`, // Adjusted duration for smoother looping
  textAlign: "center",
  flexDirection: "column",
});
const DotAnimation = styled(Box)({
  display: "flex",
  marginTop: "15px",
  "& div": {
      width: "10px",
      height: "10px",
      margin: "0 5px",
      backgroundColor: "#FFA726",
      borderRadius: "50%",
      animation: `${fadeInOutAnimation} 1.5s ease-in-out infinite`,
      "&:nth-of-type(1)": {
          animationDelay: "0s",
      },
      "&:nth-of-type(2)": {
          animationDelay: "0.3s",
      },
      "&:nth-of-type(3)": {
          animationDelay: "0.6s",
      },
  },
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
  const isInitialLoad = useRef(true);
  const [dashboard, setDashboard] = useState(null);
   const [isLoading, setIsLoading] = useState(true); 
  const [query, setQuery] = useState("");
  const [dashboardUser, setdashboardUser] = useState(null);
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

    console.log("user data",user)
    console.log("clinet data",clientData);
    console.log("therapists",therapists);

    if (isLoading) {
        return (
            <LoadingScreen>
                <Typography variant="h2" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    Welcome to MindMate
                </Typography>
                <CircularProgress color="secondary" sx={{ mt: 2 }} />
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
                    <Button href="/LogoutPage" color="inherit">Logout</Button>
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
                  buttonText={<Link href="/MentalHealthExercises" style={{ textDecoration: 'none', color: 'inherit' }}>"Learn More"</Link>}
              />
              <FeatureCard
                icon="C"
                title="Always-there Support"
                description="Unpack what’s on your mind with Ebb, our empathetic AI companion, talk it out!"
                image="/chat.jpg"
                href="/Chat"
                buttonText={<Link href="/Chat" style={{ textDecoration: 'none', color: 'inherit' }}>"Chat Now"</Link>}
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
                 buttonText={<Link href="/InPersonSession" style={{ textDecoration: 'none', color: 'inherit' }}>Schedule Session</Link>}
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
                    image={therapist.imageUrl || "/R.png"}
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


