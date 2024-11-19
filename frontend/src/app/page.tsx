'use client';

import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, TextField, Button,
  Select, MenuItem, FormControl, InputLabel, Box, Card, CardContent, Avatar
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  content: string;
}

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

export default function JournalPage() {
  const [mood, setMood] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  return (
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
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

        ))}
      </Container>
  );
}