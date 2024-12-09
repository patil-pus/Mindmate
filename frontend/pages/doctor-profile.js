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
    { comment: "I felt so supported and validated during my sessions with {name}. They truly care about their clients.", stars: 5 },
    { comment: "The tools and techniques {name} shared have greatly improved my mental health. Thank you!", stars: 4 },
    { comment: "{name} has a calming presence that makes therapy feel comfortable and effective.", stars: 5 },
    { comment: "I’ve made so much progress with {name} in just a few sessions. Highly recommended!", stars: 5 },
    { comment: "{name} has a unique way of understanding and addressing my concerns. It’s been transformative.", stars: 5 },
    { comment: "I was hesitant about therapy, but {name} made the process seamless and welcoming.", stars: 4 },
    { comment: "{name} provided me with practical steps to manage my anxiety. I’m feeling so much better now.", stars: 5 },
    { comment: "Therapy with {name} has been a breath of fresh air. Their insight is unmatched.", stars: 4 },
    { comment: "I appreciate how {name} never rushes through a session. Their patience is commendable.", stars: 5 },
    { comment: "{name} has given me tools to handle difficult emotions. It’s been a game-changer.", stars: 5 },
    { comment: "I’ve learned so much about myself thanks to {name}. I feel empowered and confident.", stars: 4 },
    { comment: "The compassion and care shown by {name} are extraordinary. I’m so grateful for their help.", stars: 5 },
    { comment: "The guidance from {name} has brought clarity to areas of my life I struggled with for years.", stars: 5 },
    { comment: "{name}'s approach to therapy is practical and effective. I can’t thank them enough.", stars: 4 },
    { comment: "Sessions with {name} are the highlight of my week. They’ve helped me immensely.", stars: 5 },
    { comment: "{name} helped me set and achieve realistic goals for my mental health. I feel hopeful again.", stars: 4 },
    { comment: "I never thought therapy could be so impactful until I met {name}. They are incredible.", stars: 5 },
    { comment: "{name} is a gem. Their ability to listen and provide thoughtful feedback is remarkable.", stars: 5 },
    { comment: "With {name}'s help, I’ve been able to rebuild my confidence and find balance in life.", stars: 5 },
    { comment: "I’ve recommended {name} to my friends and family. They are truly the best.", stars: 5 },
    { comment: "I didn’t feel like my concerns were fully understood by {name}. I hoped for more engagement.", stars: 3 },
    { comment: "{name} encouraged me to see things from a new perspective. It’s been incredibly helpful.", stars: 4 },
    { comment: "Every session with {name} feels like a step forward. They’ve made a huge difference in my life.", stars: 5 },
    { comment: "I appreciate how {name} balances empathy with actionable advice. Therapy has been so beneficial.", stars: 4 },
    { comment: "{name} is not only professional but also deeply compassionate. I always feel supported.", stars: 5 },
    { comment: "I struggled to connect with {name} initially, but over time their approach won me over.", stars: 4 },
    { comment: "{name}'s thoughtful suggestions have helped me navigate tough decisions with confidence.", stars: 4 },
    { comment: "The journey with {name} has been eye-opening. I’ve gained so much self-awareness.", stars: 5 },
    { comment: "{name} challenges me to grow while creating a safe space. I couldn’t ask for a better therapist.", stars: 5 }
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
                            src={doctor.imageUrl || "/R.png"} 
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
