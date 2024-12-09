import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import MoodIcon from "@mui/icons-material/Mood"; // Example icon
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

const MoodTrackerSection = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: "20px", backgroundColor: "#f7f7f7" }}>
      {/* Mood Icons on the Left */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", mr: 3 }}>
        <Avatar sx={{ width: 80, height: 80, backgroundColor: "#E0F7FA" }}>
          <MoodIcon sx={{ color: "#388E3C", fontSize: 50 }} />
        </Avatar>
        <Avatar sx={{ width: 80, height: 80, backgroundColor: "#FFF9C4" }}>
          <SentimentSatisfiedIcon sx={{ color: "#FBC02D", fontSize: 50 }} />
        </Avatar>
        <Avatar sx={{ width: 80, height: 80, backgroundColor: "#FFE0B2" }}>
          <MoodBadIcon sx={{ color: "#D32F2F", fontSize: 50 }} />
        </Avatar>
        <Avatar sx={{ width: 80, height: 80, backgroundColor: "#E1BEE7" }}>
          <SentimentVeryDissatisfiedIcon sx={{ color: "#8E24AA", fontSize: 50 }} />
        </Avatar>
      </Box>

      {/* Text Content on the Right */}
      <Box>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#FFA726", mb: 1 }}>
          Mood Tracker Apps
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          It's important to be aware of how we're feeling and understand what makes us feel certain emotions.
          Often, we experience different moods throughout the day. Using mood trackers can help keep you
          aware of your moods, identify triggers, and make positive changes in your life.
        </Typography>
      </Box>
    </Box>
  );
};

export default MoodTrackerSection;
