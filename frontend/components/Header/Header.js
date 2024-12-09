import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
  IconButton,
  Badge,
  Card,
  CardContent,
  Avatar,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import { useGlobal } from "../../contexts/GlobalContext";

const Header = () => {
  const router = useRouter();
  const { userType } = useGlobal();
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <Toolbar>
        <motion.img
          src={"/logo.png"}
          alt="MindMate Logo"
          whileHover={{ scale: 1.1 }}
          style={{
            width: 90,
            height: 80,
            marginBottom: 20,
            marginTop: 20,
            margin: 20,
            borderRadius: "50%",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.4)",
            padding: 10,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "white",
            flexGrow: 1,
          }}
        >
          MindMate
        </Typography>
        <Button
          color="inherit"
          onClick={() =>
            router.push(
              userType === "client" ? "/Dashboard" : "/TherapistDashboard"
            )
          }
          sx={{
            fontSize: "1.1rem", // Slightly larger font size
            fontWeight: "bold",
            padding: "10px 16px", // Slightly larger padding
            textTransform: "capitalize",
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          onClick={() => router.push("/Chat")}
          sx={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            padding: "10px 16px",
            textTransform: "capitalize",
          }}
        >
          Chat
        </Button>
        <Button
          onClick={() =>
            router.push(
              userType === "client" ? "/PatientProfile" : "TherapistProfile"
            )
          }
          color="inherit"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            padding: "10px 16px",
            textTransform: "capitalize",
          }}
        >
          Profile
        </Button>
        <Button
          color="inherit"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            padding: "10px 16px",
            textTransform: "capitalize",
          }}
        >
          Settings
        </Button>
        <Button
          href="/LogoutPage"
          color="inherit"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            padding: "10px 16px",
            textTransform: "capitalize",
          }}
        >
          Logout
        </Button>
        <IconButton
          color="inherit"
          sx={{
            fontSize: "1.1rem",
          }}
        >
          <Badge color="error" variant="dot">
            <NotificationsIcon sx={{ fontSize: "1.6rem" }} />{" "}
            {/* Slightly larger icon */}
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
