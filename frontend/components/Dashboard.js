import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import UserContext from "../contexts/UserContext";
import { AppBar, Toolbar, Box, Typography, Button, TextField, IconButton, Badge, Card, CardContent, Avatar } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion } from 'framer-motion';
import CardMedia from '@mui/material/CardMedia';
import ExpertSection from "./ExpertSection";

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

const FeatureCard = styled(Card)(({ theme }) => ({
    minWidth: 500,
    maxWidth: 300,
    borderRadius: "15px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ccc",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    scrollSnapAlign: "center",
}));

const ImageCard = styled(Card)(({ theme }) => ({
    minWidth: 500,
    maxWidth: 300,
    borderRadius: "15px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ccc",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    scrollSnapAlign: "center",
}));

const BackgroundImageLayer = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
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

const scrollAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const DoctorCardContainer = styled(Box)({
    display: "flex",
    gap: "15px",
    padding: "20px",
    margin: "40px 0",
    width: "100%",
    overflow: "hidden",
    animation: `${scrollAnimation} 60s linear infinite`,
    '@media (max-width:600px)': {
        animation: `${scrollAnimation} 3s linear infinite`, // Faster scrolling on smaller screens
    },
});

const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: 200,
    maxWidth: 250,
    borderRadius: "15px",
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    scrollSnapAlign: "center",
    position: "relative",
      overflow: "hidden",
    '@media (max-width:600px)': {
        minWidth: 150, // Adjust card size for smaller screens
    },
}));

const ImageBackground = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 1, // Adjust opacity as needed to see text clearly
    zIndex: 1,
});

const TextContainer = styled(Box)({
    position: "relative",
    zIndex: 2, // Ensures text is above the image background
    paddingTop: "160px", // Push text below the image
    color: "#FFFFFF",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
});

const Dashboard = () => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [query, setQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {

      const clientId = sessionStorage.getItem('clientId');
      console.log("client id",clientId);
       if (!clientId) {
      //router.push('/SignIn');
      console.log("invalid client id"); 
      return;
    }

    const fetchDashboard = async() => {
    
      try{
      const res = await fetch(`http://localhost:8080/api/clients/${clientId}/getJournal`, {
        method: 'GET',
        credentials: 'include'
      });

      if(res.ok){
        const data = await res.json();
        setDashboard(data);
        console.log("dahsboard data - ",data);
    }else{
      console.error('Failed to fetch dashboard data');
    }
          //router.push('/SignIn');
    }
    catch(error){
      console.error('Error fetching dashboard data:', error);
    }
  };
  fetchDashboard();
  },[router]);
    const { user } = useContext(UserContext);
    console.log("Current user in Dashboard component:", user); // Debug log

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
                  {/* Image Feature Card */}
                 <ImageCard>
                    <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>E</Avatar>
                    <Typography variant="h6">Do-anywhere exercises</Typography>
                    <CardContent>
                        <Typography variant="body2">
                            Reach your mental health goals with proven courses and expert-led guidance. Check out a preview here.
                        </Typography>
                    </CardContent>
                        <CardMedia
                            component="img"
                            image="/exer.jpeg"
                            alt="Exercise preview"
                            sx={{ marginTop: "10px", height: "300px" }} // Adjust the height and spacing as needed
                        />
                    <Button variant="contained" sx={{ marginTop: "10px" }}>Learn More</Button>
                </ImageCard>
                {/* Chat Feature Card */}
                <FeatureCard>
                    <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>E</Avatar>
                    <Typography variant="h6">Always-there Support</Typography>
                    <CardContent>
                        <Typography variant="body2">
                            Unpack what’s on your mind with Ebb, our empathetic AI companion, and get personalized recommendations based on how you’re feeling.
                        </Typography>
                    </CardContent>
                    <CardMedia
                            component="img"
                            image="/chat.jpg"
                            alt="Exercise preview"
                            sx={{ marginTop: "10px", height: "300px" }} // Adjust the height and spacing as needed
                        />
                    <Button variant="contained" sx={{ marginTop: "10px" }}>Chat with Ebb</Button>
                </FeatureCard>

                {/* Journal Entry Card */}
                <FeatureCard>
                    <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>J</Avatar>
                    <Typography variant="h6">Journal Your Thoughts</Typography>
                    <CardContent>
                        <Typography variant="body2">
                            Reflect on your day, your feelings, and keep a private journal that helps you understand yourself better.
                        </Typography>
                    </CardContent>
                      <CardMedia
                            component="img"
                            image="/journal.jpg"
                            alt="journal preview"
                            sx={{ marginTop: "10px", height: "300px" }} // Adjust the height and spacing as needed
                        />
                    <Button variant="contained" sx={{ marginTop: "10px" }}>Start Writing</Button>
                </FeatureCard>

                {/* Meditation Practice Card */}
                <FeatureCard>
                    <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>M</Avatar>
                    <Typography variant="h6">Meet your Therapist!</Typography>
                    <CardContent>
                        <Typography variant="body2">
                           Find peace and clarity with personalized, in-person therapy — guided by experts, designed for you.
                        </Typography>
                    </CardContent>
                      <CardMedia
                            component="img"
                            image="/inperson.webp"
                            alt="journal preview"
                            sx={{ marginTop: "10px", height: "300px" }} // Adjust the height and spacing as needed
                        />
                    <Button variant="contained" sx={{ marginTop: "10px" }}>Learn More</Button>
                </FeatureCard>
            </ScrollContainer>
            <MessageBox>
                <Typography variant="h5" color="textPrimary" sx={{mt:2, textAlign: "center" }}>
                    Find the Support you need
                </Typography>
            </MessageBox>

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
         {/* Scrolling Doctor Cards */}
                <DoctorCardContainer>
                    {[1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14].map((i, index) => (
                       <StyledCard key={i}>
                            {/* Background Image */}
                            <ImageBackground
                                component="img"
                                src={`/doc.png`} 
                                alt={`Therapist ${i}`}
                            />

                            
                            {/* Text Content */}
                            <TextContainer>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Therapist Name {i}</Typography>
                                <Typography variant="body2">Specialization</Typography>
                                <Typography variant="body2">City, Country</Typography>
                            </TextContainer>
                        </StyledCard>
                    ))}
                </DoctorCardContainer>
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
};

export default Dashboard;


