
'use client';

import React, { useState } from 'react';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Select,
    Badge,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Grid,
    IconButton,
    Card,
    CardContent,
    CircularProgress,
    AppBar,
    Toolbar,
    Avatar,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useGlobal } from '../../contexts/GlobalContext'; // Import Global Context
import axios from 'axios';
import { motion } from 'framer-motion';
import NotificationsIcon from "@mui/icons-material/Notifications";
axios.defaults.withCredentials = true;

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const MoodAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
}));

const Journal = () => {
    const { user, clientData, setUser } = useGlobal(); // Get clientData and global state update function
    
    const [mood, setMood] = useState('');
    const [content, setContent] = useState('');

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mood || !content) return;

        try {
            const BASE_URL = 'http://localhost:8080'; // Replace with your backend URL
            const response = await axios.post(`${BASE_URL}/api/clients/${user.id}/journal`, {
                mood,
                content,
            });

            if (response.status === 200) {

                const newJournal = {
                    id: response.data.id, // Assuming backend returns the new journal ID
                    mood,
                    content,
                    entryDate: new Date().toISOString(), // Use current date
                };

                setUser({
                    ...user,
                    journals: [...(clientData || []), newJournal],
                });
                
                
                // Reset form fields
                setMood('');
                setContent('');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error adding journal entry:', error);
        }
    };
  
    
    const getMoodColor = (mood) => {
        const moodColors = {
            Happy: '#4CAF50',
            Sad: '#2196F3',
            Anxious: '#FFC107',
            Calm: '#9C27B0',
            Angry: '#F44336',
        };
        return moodColors[mood] || '#757575';
    };

    // if (!clientData || clientData.length === 0) {
    //     return   <Box
    //             sx={{
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 minHeight: "200px",
    //             }}
    //         >
    //             <CircularProgress />
    //         </Box>
    // }

    return (
        <div style={{ backgroundColor: 'white', padding: '2rem' }} >
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
                    <Button color="inherit" href="/Dashboard">  Home</Button>
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
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                align="center"
                sx={{ fontWeight: 'bold', color: '#1976d2', margin:'150px' }}
            >
                MindMate Journal
            </Typography>

            {/* Image Section */}
            <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" mb={4}>
                        <img
                            src="/journal.jpg"
                            alt="MindMate Journal"
                            style={{
                                width: '90%',
                                margin: '-150px',
                                maxWidth: '1200px',
                                height: 'auto',
                                borderRadius: '12px',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Form Section */}
            <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', mt: 4 }}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                        <Grid container spacing={4}>
                            {/* Mood Selector */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    How are you feeling?
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="mood-label">Select Mood</InputLabel>
                                    <Select
                                        labelId="mood-label"
                                        value={mood}
                                        label="Select Mood"
                                        onChange={handleMoodChange}
                                        required
                                    >
                                        <MenuItem value="Happy">😊 Happy</MenuItem>
                                        <MenuItem value="Sad">😢 Sad</MenuItem>
                                        <MenuItem value="Anxious">😰 Anxious</MenuItem>
                                        <MenuItem value="Calm">😌 Calm</MenuItem>
                                        <MenuItem value="Angry">😠 Angry</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Thought Input */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    What's on your mind?
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Write your thoughts"
                                    multiline
                                    rows={4}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    sx={{ mt: 2, borderRadius: 8 }}
                                    onClick={handleSubmit}
                                >
                                    Save Entry
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                
                { clientData && 
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            Previous Entries
                        </Typography>
                        <Grid container spacing={4}>
                            {clientData?.map((entry) => (
                                <Grid item xs={12} sm={6} md={4} key={entry.id}>
                                    <StyledCard>
                                        <CardContent>
                                            <Box display="flex" alignItems="center" mb={1}>
                                                <MoodAvatar sx={{ bgcolor: getMoodColor(entry.mood) }}>
                                                    {entry.mood[0]}
                                                </MoodAvatar>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                    {entry.mood}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ color: '#1976d2' }}>
                                                {new Date(entry.entryDate).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2">{entry.content}</Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>}
            </Grid>
        </div>
    );
};

export default Journal;
