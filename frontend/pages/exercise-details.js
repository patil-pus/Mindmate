import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const exerciseDetails = {
  1: {
    title: "8 Body Weight Exercises",
    content:
      "This set of exercises includes push-ups, squats, lunges, and more to improve your physical and mental well-being.",
  },
  2: {
    title: "Breathing Techniques",
    content:
      "Practice deep breathing, box breathing, and diaphragmatic breathing to reduce stress and increase focus.",
  },
  3: {
    title: "Yoga for Mental Clarity",
    content:
      "A series of yoga poses such as Downward Dog and Child's Pose to help you stay calm and focused.",
  },
  4: {
    title: "Mindful Meditation",
    content:
      "Learn mindfulness techniques that can be done anywhere to bring peace and reduce anxiety.",
  },
};

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage: "url('/side-view-fit-people-training-outdoors.jpg')", // Add your background image path here
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(4),
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  textAlign: "center",
  padding: theme.spacing(4),
  backgroundColor: "#f9f9f9", // Slightly off-white for contrast
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ExerciseDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const exercise = exerciseDetails[id];

  if (!exercise) {
    return (
      <PageContainer>
        <DetailsContainer>
          <Typography variant="h5" color="error" sx={{ mb: 2 }}>
            Exercise not found.
          </Typography>
          <StyledButton
            variant="contained"
            onClick={() => router.push("/MentalHealthExercises")}
          >
            Go Back
          </StyledButton>
        </DetailsContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DetailsContainer>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3, color: "#333" }}
        >
          {exercise.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#555" }}>
          {exercise.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <StyledButton
            variant="contained"
            onClick={() => router.push("/MentalHealthExercises")}
          >
            Back to Exercises
          </StyledButton>
          <StyledButton
            variant="contained"
            sx={{
              backgroundColor: "#FFA726", 
              "&:hover": {
                backgroundColor: "#FF8C00",
              },
            }}
            onClick={() => alert("Subscription Added!")} 
          >
            Add Subscription
          </StyledButton>
        </Box>
      </DetailsContainer>
    </PageContainer>
  );
};

export default ExerciseDetails;
