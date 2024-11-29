'use client';

import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, TextField, Button,
    Select, MenuItem, FormControl, InputLabel, Box, Card, CardContent, Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

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

export default function Journal() {
    const [mood, setMood] = useState('');
    const [content, setContent] = useState('');
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        fetchJournalEntries();
    }, []);

    const fetchJournalEntries = async () => {
        // TODO: Replace with actual API call
        const mockEntries = [
            { id: 1, date: '2024-11-18 14:30', mood: 'Happy', content: 'Had a great therapy session today. Feeling optimistic!' },
            { id: 2, date: '2024-11-17 20:15', mood: 'Anxious', content: 'Worried about tomorrow\'s presentation, but trying to stay calm.' },
            { id: 3, date: '2024-11-16 09:45', mood: 'Calm', content: 'Morning meditation really helped set a positive tone for the day.' },
        ];
        setJournalEntries(mockEntries);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Replace with actual API call to save journal entry
        console.log('Saving journal entry:', { mood, content });
        // Reset form
        setMood('');
        setContent('');
        // Refresh journal entries
        await fetchJournalEntries();
    };

    const handleMoodChange = (event) => {
        setMood(event.target.value);
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

    return (
        <div style={{color:'white'}}>
            <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                MindMate Journal
            </Typography>
            <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4, color: '#1976d2' }}>
                Reflect, Express, and Grow with Every Entry
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 4 }}>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="mood-label">How are you feeling?</InputLabel>
                        <Select
                            labelId="mood-label"
                            value={mood}
                            label="How are you feeling?"
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

                    <TextField
                        fullWidth
                        margin="normal"
                        label="What's on your mind?"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 8 }}
                    >
                        Save Entry
                    </Button>
                </form>
            </Paper>

            <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 3, fontWeight: 'medium' }}>
                Your Journal Entries
            </Typography>
            {journalEntries.map((entry) => (
                <StyledCard key={entry.id}>
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            <MoodAvatar sx={{ bgcolor: getMoodColor(entry.mood) }}>
                                {entry.mood[0]}
                            </MoodAvatar>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {entry.mood}
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 'auto', color: '#1976d2' }}>
                                {entry.date}
                            </Typography>
                        </Box>
                        <Typography variant="body1">
                            {entry.content}
                        </Typography>
                    </CardContent>
                </StyledCard>
            ))}
        </div>
    );
}
