import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Card, Avatar, Divider, Chip, Rating, List, ListItem, ListItemText, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useGlobal } from "../contexts/GlobalContext";

const SplitScreenContainer = styled(Box)({
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#ffffff", // White background
});

const ImageSection = styled(Box)({
    flex: 1,
    backgroundImage: "url('/medium-shot-adults-meeting.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
});



const ProfileContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: "700px",
    textAlign: "center",
    backgroundColor: "#ffffff", // White card background
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: "20px",
    backgroundColor: "#D4D4D8", // Black inner panel
    color: "#000000", // White text for contrast
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: "150px",
    height: "150px",
    margin: "auto",
    border: `4px solid ${theme.palette.primary.main}`,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
}));

const ButtonContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
});

const ListContainer = styled(List)({
    maxWidth: "90%", // Expands the list width
    margin: "auto",
    textAlign: "left",
});


const staticReviews = [
    { comment: "{name} is very professional and kind. They always take the time to understand their patients and provide meaningful support.", stars: 5 },
    { comment: "Helped me immensely with my mental health, thank you {name}. I feel like a completely new person.", stars: 4 },
    { comment: "{name} is a great listener and provides actionable advice. I’ve never felt more cared for.", stars: 5 },
    { comment: "I felt really comfortable sharing my issues with {name}. They made the process so easy.", stars: 4 },
    { comment: "Highly recommended for anyone seeking therapy with {name}. They go above and beyond.", stars: 5 },
    { comment: "Very insightful and empathetic, {name} was fantastic and made me feel truly heard.", stars: 5 },
    { comment: "I expected more personalized care from {name}. The experience didn’t meet my expectations.", stars: 3 },
    { comment: "Excellent therapist, {name} always makes me feel heard and understood.", stars: 4 },
    { comment: "{name} helped me navigate a tough phase in my life. I’m forever grateful.", stars: 5 },
    { comment: "Thanks to {name}, I feel more confident and less anxious. They are truly amazing.", stars: 4 },
    { comment: "Working with {name} has been a life-changing experience. I cannot recommend them enough.", stars: 5 },
    { comment: "I look forward to my sessions with {name} every week. They always provide the best advice.", stars: 4 },
    { comment: "{name}'s advice has made a real difference in my life. I’m so glad I found them.", stars: 5 },
    { comment: "I appreciated {name}'s honest and compassionate approach. They are incredibly kind.", stars: 5 },
    { comment: "{name} created a safe space for me to talk about my struggles. I’ve grown so much since.", stars: 4 },
];
const DoctorProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const { therapists } = useGlobal();

    const [randomReviews, setRandomReviews] = useState([]);

    useEffect(() => {
        // Fetch 3 random reviews
        const shuffledReviews = staticReviews
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        setRandomReviews(shuffledReviews);
    }, []);

    if (!therapists || !id) {
        return <Typography>Loading...</Typography>;
    }

    const doctor = therapists.find((therapist) => therapist.id === parseInt(id));

    if (!doctor) {
        return (
            <SplitScreenContainer>
                <Typography variant="h4">Doctor not found</Typography>
            </SplitScreenContainer>
        );
    }

    return (
        <SplitScreenContainer>
            <ImageSection />
            
                <ProfileContainer>
                    <ProfileCard>
                        <StyledAvatar
                            src={doctor.image_url || "/R.png"} // Use a default image if `image_url` is NULL
                            alt={doctor.name}
                        />
                        <Typography variant="h4" sx={{ mt: 3, fontWeight: "bold", color: "#000000" }}>
                            {doctor.name}
                        </Typography>
                        <Chip
                            label={doctor.specialization || "Specialization not specified"}
                            sx={{
                                mt: 2,
                                color: "#E6FAFE", // Black text for chip
                                backgroundColor: "#FFA726", // Orange chip background
                                fontWeight: "bold",
                            }}
                        />
                        <Divider sx={{ my: 3, backgroundColor: "#ffffff" }} />
                        <Typography variant="body1" sx={{ fontSize: "16px", color: "#000000", mb: 1 }}>
                            <strong>Language:</strong> {doctor.language || "Not specified"}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "16px", color: "#000000", mb: 1 }}>
                            <strong>Location:</strong> {doctor.location || "Not specified"}
                        </Typography>
                        <Divider sx={{ my: 3, backgroundColor: "#ffffff" }} />
                        <Typography variant="h5" sx={{ mb: 2, color: "#FFA726" }}>
                            Reviews & Ratings
                        </Typography>
                        <ListContainer>
                            {randomReviews.map((review, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={review.comment.replace("{name}", doctor.name)} // Replace placeholder with therapist's name
                                        secondary={<Rating value={review.stars} readOnly />}
                                    />
                                </ListItem>
                            ))}
                        </ListContainer>
                        <ButtonContainer>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => router.push("/Chat")}
                            >
                                Chat with {doctor.name}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => router.push("/InPersonSession")}
                            >
                                Book In-Person Session
                            </Button>
                        </ButtonContainer>
                    </ProfileCard>
                </ProfileContainer>
            
        </SplitScreenContainer>
    );
};

export default DoctorProfile;
