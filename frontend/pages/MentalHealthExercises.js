import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import Header from "../components/Header/Header";

const exercises = [
  {
    id: 1,
    title: "8 Body Weight Exercises",
    description: "Improve your mental and physical health with these 8 simple bodyweight exercises.",
    image: "/bodyweight.jpeg",
  },
  {
    id: 2,
    title: "Breathing Techniques",
    description: "Calm your mind with these easy-to-follow breathing techniques.",
    image: "/breathing.jpeg",
  },
  {
    id: 3,
    title: "Yoga for Mental Clarity",
    description: "Enhance your focus and clarity with yoga poses designed for mental health.",
    image: "/yoga.jpg",
  },
  {
    id: 4,
    title: "Mindful Meditation",
    description: "Practice mindfulness and meditation to reduce stress and anxiety.",
    image: "/meditation.jpg",
  },
];

const ExercisesContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  padding: "20px",
  marginTop: "80px",
});

const StyledCard = styled(Card)({
  maxWidth: 300,
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "scale(1.05)",
    transition: "0.3s",
  },
});

const ExerciseImage = styled(CardMedia)({
  height: 140,
});

const MentalHealthExercises = () => {
  const router = useRouter();

  const handleViewDetails = (id) => {
    router.push(`/exercise-details?id=${id}`);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "140px" }}>
      <Header/>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "#333" }}>
        Mental Health Exercises
      </Typography>
      <ExercisesContainer>
        {exercises.map((exercise) => (
          <StyledCard key={exercise.id}>
            <ExerciseImage image={exercise.image} alt={exercise.title} />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
                {exercise.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                {exercise.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewDetails(exercise.id)}
              >
                View Details
              </Button>
            </CardContent>
          </StyledCard>
        ))}
      </ExercisesContainer>
    </Box>
  );
};

export default MentalHealthExercises;
